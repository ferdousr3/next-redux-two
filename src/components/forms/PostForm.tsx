'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, PostFormValues } from '@/schemas/post.schema';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { useEffect } from 'react';
import { CustomFormField } from './CustomFormField';

interface PostFormProps {
  initialData?: PostFormValues;
  onSubmit: (data: PostFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PostForm({ initialData, onSubmit, onCancel, isLoading }: PostFormProps) {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
    },
  });

  // Reset form when initialData changes (e.g. switching between create and edit)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
        form.reset({ title: '', content: '' });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data as unknown as PostFormValues))} className="space-y-4">
        <CustomFormField<PostFormValues>
          control={form.control}
          name="title"
          label="Title"
          placeholder="Enter post title"
        />
        <CustomFormField<PostFormValues>
          control={form.control}
          name="content"
          label="Content"
          placeholder="Enter post content"
          type="textarea"
          rows={5}
        />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
