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
// Single Response!


export const UserSchema = z.object({
    id: z.uuid(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1),
    phoneNumber: z.string().min(1)
})
export type User = z.infer<typeof UserSchema>

export const SupplierDetailsSchema = z.object({
    id: z.uuid(),
    orderDay: z.string().min(1).optional(),
    orderNotes: z.string().min(1).optional(),
    orderMinimum: z.string().min(1).optional(),
    user: UserSchema.optional()
})
export type SupplierDetails = z.infer<typeof SupplierDetailsSchema>

export const SupplierSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    supplierDetails: SupplierDetailsSchema.optional()
})
export type Supplier = z.infer<typeof SupplierSchema>

export const SingleResponseSchema = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string(),
    data: SupplierSchema
})

export type SingleResponse = z.infer<typeof SingleResponseSchema>