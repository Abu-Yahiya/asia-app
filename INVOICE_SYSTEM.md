# Invoice & Transaction Management System

## Overview

The Invoice and Transaction Management System is a comprehensive payment handling module integrated into the CRM platform. It enables users to generate invoices from daily services and track payments through an intuitive dialog-based interface.

## Features

### 1. Invoice Generation
- **Automatic Invoice Number Generation**: Invoices are automatically numbered (AT-0001, AT-0002, etc.)
- **Discount Support**: Apply discounts to invoices
- **Status Tracking**: Track invoice status (Due, Paid, Partially Paid, Cancelled, Refund)
- **Client Association**: Link invoices to clients and daily services

### 2. Transaction Management
- **Payment Recording**: Record payments, refunds, adjustments, and credits
- **Multiple Payment Methods**: Support for cash, card, bank transfer, and Bkash
- **Invoice Updates**: Automatic invoice status updates based on transactions
- **Client Balance Updates**: Client balance automatically adjusts with payment transactions

### 3. User Interface
- **Generate Invoice Button**: Quick access button in transaction tables
- **Invoice Details Dialog**: View complete invoice information with payment progress
- **Payment Form Dialog**: Simplified form for recording payments
- **Status Indicators**: Visual status badges for quick identification

## Database Schema

### Invoice Model
```typescript
{
  invoiceNumber: string;           // AT-0001 format
  date: Date;                      // Invoice creation date
  clientId: ObjectId;              // Reference to Client
  dailyServiceId: ObjectId;        // Reference to ClientTransaction (daily service)
  subTotal: number;                // Service amount before discount
  discount?: number;               // Optional discount amount
  grandTotal: number;              // Final amount due
  paidAmount: number;              // Amount paid so far
  dueAmount: number;               // Remaining amount due
  status: 'Paid' | 'Due' | 'Partially Paid' | 'Cancelled' | 'Refund';
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction Model
```typescript
{
  transactionId: string;           // TRX-000001 format
  invoiceId: ObjectId;             // Reference to Invoice
  clientId: ObjectId;              // Reference to Client
  transactionType: 'Payment' | 'Refund' | 'Adjustment' | 'Credit';
  amount: number;                  // Transaction amount
  method: 'cash' | 'card' | 'bank' | 'bkash';
  date: Date;                      // Transaction date
  notes?: string;                  // Optional notes
  createdBy: string;               // User who created the transaction
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Invoice CRUD Operations

#### GET /api/payment/invoices
Retrieve invoices with filtering and pagination.

**Query Parameters:**
- `clientId`: Filter by client ID (optional)
- `status`: Filter by status (optional)
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [...invoices],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

#### POST /api/payment/invoices
Create a new invoice.

**Request Body:**
```json
{
  "clientId": "client_id",
  "dailyServiceId": "transaction_id",
  "subTotal": 1000,
  "discount": 100,
  "grandTotal": 900
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "invoice_id",
    "invoiceNumber": "AT-0001",
    "date": "2024-07-09T...",
    "status": "Due",
    "grandTotal": 900,
    "paidAmount": 0,
    "dueAmount": 900
  }
}
```

#### GET /api/payment/invoices/[id]
Retrieve a specific invoice with all details.

#### PUT /api/payment/invoices/[id]
Update an invoice.

#### DELETE /api/payment/invoices/[id]
Delete an invoice.

### Transaction CRUD Operations

#### GET /api/payment/transactions
Retrieve transactions with filtering and pagination.

**Query Parameters:**
- `invoiceId`: Filter by invoice ID (optional)
- `clientId`: Filter by client ID (optional)
- `method`: Filter by payment method (optional)
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 20)

#### POST /api/payment/transactions
Create a new transaction.

**Request Body:**
```json
{
  "invoiceId": "invoice_id",
  "clientId": "client_id",
  "transactionType": "Payment",
  "amount": 500,
  "method": "bank",
  "date": "2024-07-09T...",
  "notes": "Partial payment",
  "createdBy": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "transaction_id",
    "transactionId": "TRX-000001",
    "invoiceId": "invoice_id",
    "transactionType": "Payment",
    "amount": 500,
    "method": "bank",
    "status": "completed"
  }
}
```

#### GET /api/payment/transactions/[id]
Retrieve a specific transaction.

#### PUT /api/payment/transactions/[id]
Update a transaction.

#### DELETE /api/payment/transactions/[id]
Delete a transaction.

## Components

### TransactionTableActions
Location: `/components/admin/payment/TransactionTableActions.tsx`

Adds invoice action buttons to transaction tables. Features:
- Checks if invoice already exists for a transaction
- Shows "Generate Invoice" or "Show Invoice" button
- Opens appropriate dialog based on invoice status

**Props:**
```typescript
interface TransactionTableActionsProps {
  transaction: Transaction;
  clientId: string;
  onInvoiceCreated?: () => void;
}
```

### InvoiceFormDialog
Location: `/components/admin/payment/InvoiceFormDialog.tsx`

Dialog for creating new invoices with discount support.

**Props:**
```typescript
interface InvoiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (invoice: any) => void;
  clientId: string;
  dailyServiceId: string;
  subTotal: number;
}
```

### InvoiceDetailsDialog
Location: `/components/admin/payment/InvoiceDetailsDialog.tsx`

Dialog displaying complete invoice information with payment progress bar and payment recording button.

**Props:**
```typescript
interface InvoiceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
  onPaymentSuccess: (invoice: any) => void;
}
```

### PaymentFormDialog
Location: `/components/admin/payment/PaymentFormDialog.tsx`

Form for recording payments, refunds, adjustments, and credits.

**Props:**
```typescript
interface PaymentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice;
  onPaymentSuccess: (transaction: any) => void;
}
```

## Workflow

### Invoice Generation Workflow

1. **User clicks "Generate Invoice"** on a transaction in the ClientDetail page
2. **System checks** if an invoice already exists for this transaction
3. **If no invoice exists:**
   - InvoiceFormDialog opens
   - User can apply optional discount
   - System calculates grandTotal (subTotal - discount)
   - System generates invoice with unique number (AT-XXXX)
   - System creates activity record for the client
4. **If invoice exists:**
   - InvoiceDetailsDialog opens showing invoice status

### Payment Recording Workflow

1. **User clicks "Record Payment"** in InvoiceDetailsDialog
2. **PaymentFormDialog opens** with:
   - Pre-filled due amount
   - Transaction type selector
   - Amount input field
   - Payment method selector
   - Optional notes field
3. **User fills payment details** and submits
4. **System:**
   - Creates transaction record with unique ID (TRX-XXXXXX)
   - Updates invoice with new paid/due amounts
   - Calculates and updates invoice status
   - Updates client balance
   - Creates activity record
   - Refreshes invoice display

## Invoice Status Logic

### Status Transitions

```
Due                  → Partially Paid (when: paidAmount > 0 AND dueAmount > 0)
Partially Paid       → Paid (when: dueAmount = 0)
Due/Partially Paid   → Paid (when: total payment equals grandTotal)
Any Status           → Cancelled (manual)
Paid                 → Refund (when: refund transaction recorded)
```

## Usage Example

### In ClientDetail Component

The TransactionTableActions component is automatically integrated:

```tsx
<TransactionTableActions
  transaction={transaction}
  clientId={clientId}
  onInvoiceCreated={() => fetchClientData()}
/>
```

### Manual API Usage

#### Create Invoice
```bash
curl -X POST http://localhost:3000/api/payment/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client_123",
    "dailyServiceId": "service_456",
    "subTotal": 1000,
    "discount": 100,
    "grandTotal": 900
  }'
```

#### Record Payment
```bash
curl -X POST http://localhost:3000/api/payment/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceId": "invoice_789",
    "clientId": "client_123",
    "transactionType": "Payment",
    "amount": 500,
    "method": "bank",
    "createdBy": "admin",
    "notes": "Partial payment received"
  }'
```

## Validation Rules

### Invoice Validation
- Client must exist
- Sub total must be positive
- Discount cannot be negative
- Grand total must match (subTotal - discount)
- Status must be one of: Paid, Due, Partially Paid, Cancelled, Refund

### Transaction Validation
- Invoice must exist
- Client must exist
- Amount must be positive
- Transaction type required
- Payment method required
- Created by user required

## Activity Tracking

All invoice and transaction operations create activity records:

### Invoice Creation Activity
```
Title: "Invoice Created"
Description: "Invoice AT-0001 created for 1000 - due amount: 900"
Type: "other"
```

### Payment Transaction Activity
```
Title: "Payment Transaction"
Description: "Payment of 500 via bank for invoice AT-0001"
Type: "other"
```

## Security Considerations

1. **Role-based Access**: Ensure admin role verification in API routes
2. **Input Validation**: All inputs validated with Zod schemas
3. **Client Verification**: Transactions can only be created for existing clients
4. **Amount Validation**: Negative amounts are prevented
5. **Activity Logging**: All operations logged in activity history

## Future Enhancements

- Invoice PDF generation and download
- Email notifications for payment reminders
- Recurring invoice templates
- Payment plans for installments
- Integration with external payment gateways
- Advanced reporting and analytics
- Invoice search and filtering enhancements
- Batch payment processing
- Multi-currency support

## Troubleshooting

### Invoice Not Showing
- Verify client exists in database
- Check dailyServiceId references valid transaction
- Ensure form submission completed without errors

### Payment Not Recording
- Verify invoice status is not "Paid"
- Check amount doesn't exceed due amount
- Verify createdBy field is provided
- Check browser console for validation errors

### Client Balance Not Updating
- Verify transaction type is "Payment"
- Check database indexes are created
- Ensure payment transaction is created successfully

## File Structure

```
/app/api/payment/
├── invoices/
│   ├── route.ts          # GET, POST invoices
│   └── [id]/
│       └── route.ts      # GET, PUT, DELETE single invoice
└── transactions/
    ├── route.ts          # GET, POST transactions
    └── [id]/
        └── route.ts      # GET, PUT, DELETE single transaction

/components/admin/payment/
├── InvoiceFormDialog.tsx
├── InvoiceDetailsDialog.tsx
├── PaymentFormDialog.tsx
└── TransactionTableActions.tsx

/lib/models/
├── Invoice.ts
└── Transaction.ts

/lib/validations/
└── crm.ts (includes invoiceSchema and transactionSchema)
```

## Contact & Support

For issues or questions about the invoice system, refer to the API logs or contact the development team.
