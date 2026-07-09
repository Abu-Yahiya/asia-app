import { z } from 'zod';

export const clientSchema = z.object({
  name: z
    .string()
    .min(1, 'Client name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
  address: z.string().optional(),
  company: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(['active', 'inactive', 'prospect', 'vip']).default('prospect'),
  source: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
});

export const clientTransactionSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  type: z.enum(['service', 'package', 'payment', 'refund', 'adjustment']),
  serviceId: z.string().optional(),
  packageId: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  amount: z.number({ invalid_type_error: 'Amount must be a number' }),
  status: z.enum(['pending', 'completed', 'cancelled']).default('pending'),
  notes: z.string().optional(),
});

export const clientActivitySchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  type: z.enum(['note', 'call', 'meeting', 'email', 'other']),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export const invoiceSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  dailyServiceId: z.string().min(1, 'Daily Service ID is required'),
  subTotal: z.number().min(0, 'Sub total cannot be negative'),
  discount: z.number().min(0, 'Discount cannot be negative').optional().default(0),
  grandTotal: z.number().min(0, 'Grand total cannot be negative'),
  status: z.enum(['Paid', 'Due', 'Partially Paid', 'Cancelled', 'Refund']).default('Due'),
});

export const transactionSchema = z.object({
  invoiceId: z.string().min(1, 'Invoice ID is required'),
  clientId: z.string().min(1, 'Client ID is required'),
  transactionType: z.enum(['Payment', 'Refund', 'Adjustment', 'Credit']),
  amount: z.number().min(0, 'Amount cannot be negative'),
  method: z.enum(['cash', 'card', 'bank', 'bkash']),
  date: z.date().optional().default(() => new Date()),
  notes: z.string().optional(),
  createdBy: z.string().min(1, 'Created by is required'),
});

export type ClientFormData = z.infer<typeof clientSchema>;
export type ClientTransactionFormData = z.infer<typeof clientTransactionSchema>;
export type ClientActivityFormData = z.infer<typeof clientActivitySchema>;
export type InvoiceFormData = z.infer<typeof invoiceSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
