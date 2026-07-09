import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { Transaction } from '@/lib/models/Transaction';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB();

		const { id } = await params;

		const transaction = await Transaction.findById(id)
			.populate('invoiceId')
			.populate('clientId');

		if (!transaction) {
			return NextResponse.json(
				{ success: false, error: 'Transaction not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json({ success: true, data: transaction });
	} catch (error) {
		console.error('Error fetching transaction:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch transaction' },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB();

		const { id } = await params;
		const body = await request.json();

		const transaction = await Transaction.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});

		if (!transaction) {
			return NextResponse.json(
				{ success: false, error: 'Transaction not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json({ success: true, data: transaction });
	} catch (error) {
		console.error('Error updating transaction:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to update transaction' },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB();

		const { id } = await params;

		const transaction = await Transaction.findByIdAndDelete(id);

		if (!transaction) {
			return NextResponse.json(
				{ success: false, error: 'Transaction not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			message: 'Transaction deleted successfully',
		});
	} catch (error) {
		console.error('Error deleting transaction:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to delete transaction' },
			{ status: 500 }
		);
	}
}
