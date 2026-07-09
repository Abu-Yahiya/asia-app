import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { Invoice } from '@/lib/models/Invoice';
import { Client } from '@/lib/models/Client';
import { ClientActivity } from '@/lib/models/ClientActivity';
import { invoiceSchema } from '@/lib/validations/crm';

export async function GET(request: NextRequest) {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const clientId = searchParams.get('clientId');
		const status = searchParams.get('status');
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '20');
		const skip = (page - 1) * limit;

		const query: any = {};

		if (clientId) query.clientId = clientId;
		if (status) query.status = status;

		const [invoices, total] = await Promise.all([
			Invoice.find(query)
				.populate('clientId', 'name email')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit),
			Invoice.countDocuments(query),
		]);

		return NextResponse.json({
			success: true,
			data: invoices,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		console.error('Error fetching invoices:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch invoices' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const body = await request.json();

		// Validate with Zod
		const validationResult = invoiceSchema.safeParse(body);
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

		const { clientId, dailyServiceId, subTotal, discount = 0, grandTotal } =
			validationResult.data;

		// Check if client exists
		const client = await Client.findById(clientId);
		if (!client) {
			return NextResponse.json(
				{ success: false, error: 'Client not found' },
				{ status: 404 }
			);
		}

		// Generate invoice number
		const invoiceCount = await Invoice.countDocuments();
		const invoiceNumber = `AT-${String(invoiceCount + 1).padStart(4, '0')}`;

		// Create invoice
		const invoice = await Invoice.create({
			...validationResult.data,
			invoiceNumber,
			date: new Date(),
			paidAmount: 0,
			dueAmount: grandTotal,
			status: 'Due',
		});

		// Create activity
		await ClientActivity.create({
			clientId,
			type: 'other',
			title: 'Invoice Created',
			description: `Invoice ${invoiceNumber} created for ${subTotal} - due amount: ${grandTotal}`,
			metadata: { invoiceId: invoice._id, invoiceNumber },
		});

		return NextResponse.json({ success: true, data: invoice }, { status: 201 });
	} catch (error) {
		console.error('Error creating invoice:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to create invoice' },
			{ status: 500 }
		);
	}
}
