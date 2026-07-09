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
import { Spinner } from '@/components/ui/spinner';
import toast from 'react-hot-toast';

interface InvoiceFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess: (invoice: any) => void;
	clientId: string;
	dailyServiceId: string;
	subTotal: number;
}

export default function InvoiceFormDialog({
	open,
	onOpenChange,
	onSuccess,
	clientId,
	dailyServiceId,
	subTotal,
}: InvoiceFormDialogProps) {
	const [loading, setLoading] = useState(false);
	const [discount, setDiscount] = useState(0);

	const grandTotal = Math.max(0, subTotal - discount);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!clientId || !dailyServiceId) {
			toast.error('Missing required information');
			return;
		}

		try {
			setLoading(true);

			const response = await fetch('/api/payment/invoices', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					clientId,
					dailyServiceId,
					subTotal,
					discount,
					grandTotal,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.error || 'Failed to create invoice');
				return;
			}

			toast.success('Invoice created successfully');
			onSuccess(data.data);
			onOpenChange(false);
		} catch (error) {
			console.error('Error creating invoice:', error);
			toast.error('Failed to create invoice');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Generate Invoice</DialogTitle>
					<DialogDescription>
						Create a new invoice for this daily service
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Sub Total */}
					<div className='space-y-2'>
						<Label>Sub Total</Label>
						<div className='relative'>
							<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
								$
							</span>
							<Input
								type='number'
								value={subTotal}
								disabled
								className='pl-7'
							/>
						</div>
					</div>

					{/* Discount */}
					<div className='space-y-2'>
						<Label htmlFor='discount'>Discount</Label>
						<div className='relative'>
							<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
								$
							</span>
							<Input
								id='discount'
								type='number'
								min='0'
								step='0.01'
								value={discount}
								onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
								className='pl-7'
								placeholder='0.00'
							/>
						</div>
					</div>

					{/* Grand Total */}
					<div className='space-y-2'>
						<Label>Grand Total</Label>
						<div className='relative'>
							<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
								$
							</span>
							<Input
								type='number'
								value={grandTotal.toFixed(2)}
								disabled
								className='pl-7'
							/>
						</div>
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
							Generate Invoice
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
