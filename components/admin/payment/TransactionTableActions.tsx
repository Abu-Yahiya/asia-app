'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import InvoiceFormDialog from './InvoiceFormDialog';
import InvoiceDetailsDialog from './InvoiceDetailsDialog';
import toast from 'react-hot-toast';

interface Transaction {
	_id: string;
	amount: number;
}

interface TransactionTableActionsProps {
	transaction: Transaction;
	clientId: string;
	onInvoiceCreated?: () => void;
}

export default function TransactionTableActions({
	transaction,
	clientId,
	onInvoiceCreated,
}: TransactionTableActionsProps) {
	const [invoiceFormOpen, setInvoiceFormOpen] = useState(false);
	const [invoiceDetailsOpen, setInvoiceDetailsOpen] = useState(false);
	const [currentInvoice, setCurrentInvoice] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	// Check if invoice already exists for this transaction
	const checkInvoice = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`/api/payment/invoices?dailyServiceId=${transaction._id}`
			);
			const data = await response.json();

			if (data.success && data.data.length > 0) {
				setCurrentInvoice(data.data[0]);
				setInvoiceDetailsOpen(true);
			} else {
				setInvoiceFormOpen(true);
			}
		} catch (error) {
			console.error('Error checking invoice:', error);
			toast.error('Failed to check invoice status');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button
				size='sm'
				variant='outline'
				onClick={checkInvoice}
				disabled={loading}
				className='gap-2'
			>
				{currentInvoice ? (
					<>
						<FileText className='w-4 h-4' />
						Show Invoice
					</>
				) : (
					<>
						<Plus className='w-4 h-4' />
						Generate Invoice
					</>
				)}
			</Button>

			{/* Invoice Form Dialog */}
			<InvoiceFormDialog
				open={invoiceFormOpen}
				onOpenChange={setInvoiceFormOpen}
				clientId={clientId}
				dailyServiceId={transaction._id}
				subTotal={transaction.amount}
				onSuccess={(invoice) => {
					setCurrentInvoice(invoice);
					setInvoiceFormOpen(false);
					if (onInvoiceCreated) {
						onInvoiceCreated();
					}
					toast.success('Invoice created successfully');
				}}
			/>

			{/* Invoice Details Dialog */}
			{currentInvoice && (
				<InvoiceDetailsDialog
					open={invoiceDetailsOpen}
					onOpenChange={setInvoiceDetailsOpen}
					invoice={currentInvoice}
					onPaymentSuccess={(transaction) => {
						// Refresh invoice details
						checkInvoice();
						if (onInvoiceCreated) {
							onInvoiceCreated();
						}
					}}
				/>
			)}
		</>
	);
}
