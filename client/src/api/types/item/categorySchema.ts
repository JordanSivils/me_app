import z from "zod";

export const CategorySchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
})

export type CategorySchema = z.infer<typeof CategorySchema>