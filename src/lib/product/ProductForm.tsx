'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormValues } from './productFormSchema';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { useEffect } from 'react';
import { CustomFormField } from '@/components/forms/CustomFormField';
import { Loader2 } from 'lucide-react';

interface ProductFormProps {
  initialData?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      price: 0,
      stock: 0,
      image: '',
      description: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
        form.reset({ name: '', price: 0, stock: 0, image: '', description: '' });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data as unknown as ProductFormValues))} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <CustomFormField<ProductFormValues>
            control={form.control}
            name="name"
            label="Name"
            placeholder="Product name"
          />
          <CustomFormField<ProductFormValues>
            control={form.control}
            name="price"
            label="Price"
            placeholder="0.00"
            type="number"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomFormField<ProductFormValues>
            control={form.control}
            name="stock"
            label="Stock"
            placeholder="0"
            type="number"
          />
          <CustomFormField<ProductFormValues>
            control={form.control}
            name="image"
            label="Image URL"
            placeholder="https://..."
          />
        </div>

        <CustomFormField<ProductFormValues>
          control={form.control}
          name="description"
          label="Description"
          placeholder="Product description"
          type="textarea"
          rows={4}
        />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
