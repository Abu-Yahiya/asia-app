import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { Transaction } from '@/lib/models/Transaction';
import { Invoice } from '@/lib/models/Invoice';
import { Client } from '@/lib/models/Client';
import { ClientActivity } from '@/lib/models/ClientActivity';
import { transactionSchema } from '@/lib/validations/crm';

export async function GET(request: NextRequest) {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const invoiceId = searchParams.get('invoiceId');
		const clientId = searchParams.get('clientId');
		const method = searchParams.get('method');
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '20');
		const skip = (page - 1) * limit;

		const query: any = {};

		if (invoiceId) query.invoiceId = invoiceId;
		if (clientId) query.clientId = clientId;
		if (method) query.method = method;

		const [transactions, total] = await Promise.all([
			Transaction.find(query)
				.populate('invoiceId')
				.populate('clientId', 'name email')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit),
			Transaction.countDocuments(query),
		]);

		return NextResponse.json({
			success: true,
			data: transactions,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		console.error('Error fetching transactions:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch transactions' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const body = await request.json();

		// Validate with Zod
		const validationResult = transactionSchema.safeParse(body);
		if (!validationResult.success) {
			return NextResponse.json(
				{
					success: false,
					error: 'Validation failed',
					details: validationResult.error.flatten().fieldErrors,
				},
				{ status: 400 }
			);
		}

		const { invoiceId, clientId, transactionType, amount, method } =
			validationResult.data;

		// Check if invoice exists
		const invoice = await Invoice.findById(invoiceId);
		if (!invoice) {
			return NextResponse.json(
				{ success: false, error: 'Invoice not found' },
				{ status: 404 }
			);
		}

		// Check if client exists
		const client = await Client.findById(clientId);
		if (!client) {
			return NextResponse.json(
				{ success: false, error: 'Client not found' },
				{ status: 404 }
			);
		}

		// Generate transaction ID
		const transactionCount = await Transaction.countDocuments();
		const transactionId = `TRX-${String(transactionCount + 1).padStart(6, '0')}`;

		// Create transaction
		const transaction = await Transaction.create({
			...validationResult.data,
			transactionId,
			date: new Date(),
		});

		// Update invoice based on transaction type
		let newPaidAmount = invoice.paidAmount;
		let newStatus = invoice.status;

		if (transactionType === 'Payment') {
			newPaidAmount += amount;
		} else if (transactionType === 'Refund') {
			newPaidAmount = Math.max(0, newPaidAmount - amount);
		}

		// Determine new status
		const newDueAmount = Math.max(0, invoice.grandTotal - newPaidAmount);
		if (newDueAmount === 0) {
			newStatus = 'Paid';
		} else if (newPaidAmount > 0) {
			newStatus = 'Partially Paid';
		}

		// Update invoice
		await Invoice.findByIdAndUpdate(invoiceId, {
			paidAmount: newPaidAmount,
			dueAmount: newDueAmount,
			status: newStatus,
		});

		// Update client balance
		if (transactionType === 'Payment') {
			await Client.findByIdAndUpdate(clientId, {
				$inc: { balance: -amount },
				lastActivityDate: new Date(),
			});
		} else if (transactionType === 'Refund') {
			await Client.findByIdAndUpdate(clientId, {
				$inc: { balance: amount },
				lastActivityDate: new Date(),
			});
		}

		// Create activity
		await ClientActivity.create({
			clientId,
			type: 'other',
			title: `${transactionType} Transaction`,
			description: `${transactionType} of ${amount} via ${method} for invoice ${invoice.invoiceNumber}`,
			metadata: {
				transactionId: transaction._id,
				invoiceId,
				transactionType,
				amount,
				method,
			},
		});

		return NextResponse.json({ success: true, data: transaction }, { status: 201 });
	} catch (error) {
		console.error('Error creating transaction:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to create transaction' },
			{ status: 500 }
		);
	}
}
