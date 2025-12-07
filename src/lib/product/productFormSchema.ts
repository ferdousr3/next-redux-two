import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be a valid positive number'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  image: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type ProductFormValues = z.infer<typeof productSchema>;
