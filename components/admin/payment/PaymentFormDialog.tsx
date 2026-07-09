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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import toast from 'react-hot-toast';

interface Invoice {
	_id: string;
	invoiceNumber: string;
	dueAmount: number;
	clientId: string;
}

interface PaymentFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	invoice: Invoice;
	onPaymentSuccess: (transaction: any) => void;
}

export default function PaymentFormDialog({
	open,
	onOpenChange,
	invoice,
	onPaymentSuccess,
}: PaymentFormDialogProps) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		amount: invoice.dueAmount,
		method: 'cash' as 'cash' | 'card' | 'bank' | 'bkash',
		notes: '',
		transactionType: 'Payment' as 'Payment' | 'Refund' | 'Adjustment' | 'Credit',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.amount || formData.amount <= 0) {
			toast.error('Amount must be greater than 0');
			return;
		}

		try {
			setLoading(true);

			const response = await fetch('/api/payment/transactions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					invoiceId: invoice._id,
					clientId: invoice.clientId,
					transactionType: formData.transactionType,
					amount: formData.amount,
					method: formData.method,
					notes: formData.notes || undefined,
					createdBy: 'admin', // This should come from actual user context
					date: new Date().toISOString(),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.error || 'Failed to record payment');
				return;
			}

			toast.success('Payment recorded successfully');
			onPaymentSuccess(data.data);
			onOpenChange(false);
			setFormData({
				amount: invoice.dueAmount,
				method: 'cash',
				notes: '',
				transactionType: 'Payment',
			});
		} catch (error) {
			console.error('Error recording payment:', error);
			toast.error('Failed to record payment');
		} finally {
			setLoading(false);
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Record Payment</DialogTitle>
					<DialogDescription>
						Record payment for invoice {invoice.invoiceNumber}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Due Amount Info */}
					<div className='p-4 bg-muted rounded-lg'>
						<p className='text-sm text-muted-foreground mb-1'>Due Amount</p>
						<p className='text-2xl font-bold'>{formatCurrency(invoice.dueAmount)}</p>
					</div>

					{/* Transaction Type */}
					<div className='space-y-2'>
						<Label htmlFor='transactionType'>Transaction Type</Label>
						<Select
							value={formData.transactionType}
							onValueChange={(value: any) =>
								setFormData({ ...formData, transactionType: value })
							}
						>
							<SelectTrigger id='transactionType'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='Payment'>Payment</SelectItem>
								<SelectItem value='Refund'>Refund</SelectItem>
								<SelectItem value='Adjustment'>Adjustment</SelectItem>
								<SelectItem value='Credit'>Credit</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Amount */}
					<div className='space-y-2'>
						<Label htmlFor='amount'>Amount</Label>
						<div className='relative'>
							<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
								$
							</span>
							<Input
								id='amount'
								type='number'
								min='0'
								step='0.01'
								value={formData.amount}
								onChange={(e) =>
									setFormData({
										...formData,
										amount: parseFloat(e.target.value) || 0,
									})
								}
								className='pl-7'
								placeholder='0.00'
								required
							/>
						</div>
					</div>

					{/* Payment Method */}
					<div className='space-y-2'>
						<Label htmlFor='method'>Payment Method</Label>
						<Select
							value={formData.method}
							onValueChange={(value: any) =>
								setFormData({ ...formData, method: value })
							}
						>
							<SelectTrigger id='method'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='cash'>Cash</SelectItem>
								<SelectItem value='card'>Card</SelectItem>
								<SelectItem value='bank'>Bank Transfer</SelectItem>
								<SelectItem value='bkash'>Bkash</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Notes */}
					<div className='space-y-2'>
						<Label htmlFor='notes'>Notes (Optional)</Label>
						<Textarea
							id='notes'
							value={formData.notes}
							onChange={(e) =>
								setFormData({ ...formData, notes: e.target.value })
							}
							placeholder='Add any notes about this transaction...'
							className='min-h-24 resize-none'
						/>
					</div>

					<div className='flex gap-3 justify-end pt-4'>
						<Button
							type='button'
							variant='outline'
							onClick={() => onOpenChange(false)}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button type='submit' disabled={loading} className='gap-2'>
							{loading && <Spinner className='w-4 h-4' />}
							Record Payment
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
