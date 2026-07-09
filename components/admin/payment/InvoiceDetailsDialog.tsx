'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, FileText } from 'lucide-react';
import PaymentFormDialog from './PaymentFormDialog';

interface Invoice {
	_id: string;
	invoiceNumber: string;
	date: string;
	subTotal: number;
	discount?: number;
	grandTotal: number;
	paidAmount: number;
	dueAmount: number;
	status: 'Paid' | 'Due' | 'Partially Paid' | 'Cancelled' | 'Refund';
	clientId: string;
}

interface InvoiceDetailsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	invoice: Invoice | null;
	onPaymentSuccess: (invoice: any) => void;
}

export default function InvoiceDetailsDialog({
	open,
	onOpenChange,
	invoice,
	onPaymentSuccess,
}: InvoiceDetailsDialogProps) {
	const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

	if (!invoice) {
		return null;
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Paid':
				return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
			case 'Due':
				return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
			case 'Partially Paid':
				return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
			case 'Cancelled':
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
			case 'Refund':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className='sm:max-w-[600px]'>
					<DialogHeader>
						<DialogTitle className='flex items-center gap-2'>
							<FileText className='w-5 h-5' />
							Invoice {invoice.invoiceNumber}
						</DialogTitle>
						<DialogDescription>
							Invoice details and payment information
						</DialogDescription>
					</DialogHeader>

					<div className='space-y-6'>
						{/* Header with Status */}
						<div className='flex items-center justify-between pb-4 border-b'>
							<div>
								<p className='text-sm text-muted-foreground'>Invoice Date</p>
								<p className='font-medium'>{formatDate(invoice.date)}</p>
							</div>
							<Badge className={getStatusColor(invoice.status)}>
								{invoice.status}
							</Badge>
						</div>

						{/* Financial Details */}
						<div className='space-y-3'>
							<div className='flex justify-between items-center'>
								<span className='text-muted-foreground'>Sub Total</span>
								<span className='font-medium'>{formatCurrency(invoice.subTotal)}</span>
							</div>

							{invoice.discount && invoice.discount > 0 && (
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Discount</span>
									<span className='font-medium text-green-600'>
										-{formatCurrency(invoice.discount)}
									</span>
								</div>
							)}

							<div className='flex justify-between items-center py-3 border-t border-b'>
								<span className='font-medium'>Grand Total</span>
								<span className='text-lg font-bold'>
									{formatCurrency(invoice.grandTotal)}
								</span>
							</div>

							<div className='flex justify-between items-center'>
								<span className='text-muted-foreground'>Paid Amount</span>
								<span className='font-medium text-green-600'>
									{formatCurrency(invoice.paidAmount)}
								</span>
							</div>

							<div className='flex justify-between items-center'>
								<span className='text-muted-foreground'>Due Amount</span>
								<span
									className={`text-lg font-bold ${
										invoice.dueAmount === 0
											? 'text-green-600'
											: 'text-red-600'
									}`}
								>
									{formatCurrency(invoice.dueAmount)}
								</span>
							</div>
						</div>

						{/* Progress Bar */}
						<div className='space-y-2'>
							<div className='flex justify-between text-sm'>
								<span className='text-muted-foreground'>Payment Progress</span>
								<span className='font-medium'>
									{invoice.dueAmount === 0
										? '100%'
										: `${Math.round(
												(invoice.paidAmount / invoice.grandTotal) * 100
										  )}%`}
								</span>
							</div>
							<div className='w-full bg-muted rounded-full h-2 overflow-hidden'>
								<div
									className='bg-primary h-full transition-all duration-300'
									style={{
										width: `${
											invoice.dueAmount === 0
												? 100
												: (invoice.paidAmount / invoice.grandTotal) * 100
										}%`,
									}}
								/>
							</div>
						</div>

						{/* Action Button */}
						{invoice.dueAmount > 0 && (
							<Button
								onClick={() => setPaymentDialogOpen(true)}
								className='w-full gap-2'
								size='lg'
							>
								<DollarSign className='w-4 h-4' />
								Record Payment
							</Button>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Payment Form Dialog */}
			<PaymentFormDialog
				open={paymentDialogOpen}
				onOpenChange={setPaymentDialogOpen}
				invoice={invoice}
				onPaymentSuccess={(transaction) => {
					onPaymentSuccess(transaction);
					setPaymentDialogOpen(false);
				}}
			/>
		</>
	);
}
