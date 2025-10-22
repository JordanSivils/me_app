import z from "zod";

const Count = z.object({
    items: z.coerce.number()
})

const SupplierList = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    _count: Count
})
export type SupplierList = z.infer<typeof SupplierList>

const Data = z.object({
        page: z.coerce.number().min(1),
        limit: z.coerce.number().min(1),
        total: z.coerce.number(),
        totalPages: z.coerce.number().min(1),
        previousPage: z.boolean().optional(),
        nextPage: z.boolean().optional(),
        items: z.array(SupplierList)
})
type Data = z.infer<typeof Data>

export const ListResponseObject = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string(),
    data: Data
})

export type ListResponseObject = z.infer<typeof ListResponseObject>

