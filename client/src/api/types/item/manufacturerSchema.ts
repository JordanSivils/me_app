import z from "zod";

export const ManufacturerSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    createAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export type ManufacturerSchema = z.infer<typeof ManufacturerSchema>