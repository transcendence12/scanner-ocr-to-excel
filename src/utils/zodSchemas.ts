import { z } from 'zod';

export const imageSchema = z.object({
  imageData: z.string().regex(/^data:image\/(jpeg|png|jpg);base64,/, "Invalid image format")
});
