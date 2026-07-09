import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface ITransaction extends Document {
	transactionId: string;
	invoiceId: Types.ObjectId;
	clientId: Types.ObjectId;
	transactionType: 'Payment' | 'Refund' | 'Adjustment' | 'Credit';
	amount: number;
	method: 'cash' | 'card' | 'bank' | 'bkash';
	date: Date;
	notes?: string;
	createdBy: string;
	createdAt: Date;
	updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
	{
		transactionId: {
			type: String,
			required: [true, 'Transaction ID is required'],
			unique: true,
			trim: true,
		},
		invoiceId: {
			type: Schema.Types.ObjectId,
			ref: 'Invoice',
			required: [true, 'Invoice ID is required'],
		},
		clientId: {
			type: Schema.Types.ObjectId,
			ref: 'Client',
			required: [true, 'Client ID is required'],
		},
		transactionType: {
			type: String,
			enum: ['Payment', 'Refund', 'Adjustment', 'Credit'],
			required: [true, 'Transaction type is required'],
		},
		amount: {
			type: Number,
			required: [true, 'Amount is required'],
			min: [0, 'Amount cannot be negative'],
		},
		method: {
			type: String,
			enum: ['cash', 'card', 'bank', 'bkash'],
			required: [true, 'Payment method is required'],
		},
		date: {
			type: Date,
			required: [true, 'Date is required'],
			default: Date.now,
		},
		notes: {
			type: String,
		},
		createdBy: {
			type: String,
			required: [true, 'Created by is required'],
		},
	},
	{
		timestamps: true,
	}
);

// Index for efficient queries
TransactionSchema.index({ invoiceId: 1, createdAt: -1 });
TransactionSchema.index({ clientId: 1, createdAt: -1 });
TransactionSchema.index({ transactionId: 1 });
TransactionSchema.index({ method: 1 });

export const Transaction: Model<ITransaction> =
	mongoose.models.Transaction ||
	mongoose.model<ITransaction>('Transaction', TransactionSchema);
