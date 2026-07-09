import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IInvoice extends Document {
	invoiceNumber: string;
	date: Date;
	clientId: Types.ObjectId;
	dailyServiceId: Types.ObjectId;
	subTotal: number;
	discount?: number;
	grandTotal: number;
	paidAmount: number;
	dueAmount: number;
	status: 'Paid' | 'Due' | 'Partially Paid' | 'Cancelled' | 'Refund';
	createdAt: Date;
	updatedAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>(
	{
		invoiceNumber: {
			type: String,
			required: [true, 'Invoice number is required'],
			unique: true,
			trim: true,
		},
		date: {
			type: Date,
			required: [true, 'Date is required'],
			default: Date.now,
		},
		clientId: {
			type: Schema.Types.ObjectId,
			ref: 'Client',
			required: [true, 'Client ID is required'],
		},
		dailyServiceId: {
			type: Schema.Types.ObjectId,
			ref: 'ClientTransaction',
			required: [true, 'Daily Service ID is required'],
		},
		subTotal: {
			type: Number,
			required: [true, 'Sub total is required'],
			min: [0, 'Sub total cannot be negative'],
		},
		discount: {
			type: Number,
			default: 0,
			min: [0, 'Discount cannot be negative'],
		},
		grandTotal: {
			type: Number,
			required: [true, 'Grand total is required'],
			min: [0, 'Grand total cannot be negative'],
		},
		paidAmount: {
			type: Number,
			default: 0,
			min: [0, 'Paid amount cannot be negative'],
		},
		dueAmount: {
			type: Number,
			required: [true, 'Due amount is required'],
			min: [0, 'Due amount cannot be negative'],
		},
		status: {
			type: String,
			enum: ['Paid', 'Due', 'Partially Paid', 'Cancelled', 'Refund'],
			default: 'Due',
		},
	},
	{
		timestamps: true,
	}
);

// Index for efficient queries
InvoiceSchema.index({ clientId: 1, createdAt: -1 });
InvoiceSchema.index({ invoiceNumber: 1 });
InvoiceSchema.index({ status: 1 });

export const Invoice: Model<IInvoice> =
	mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', InvoiceSchema);
