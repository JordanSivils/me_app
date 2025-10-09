import z from "zod";

export const BrandSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    createAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export type BrandSchema = z.infer<typeof BrandSchema>