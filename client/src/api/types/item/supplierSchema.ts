import z from "zod";

export const SupplierSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export type SupplierSchema = z.infer<typeof SupplierSchema>