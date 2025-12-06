import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title matches max length of 100'),
  content: z.string().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;
