import { z } from "zod"

export const CreateSupplierInput = z.object({
    name: z.string().min(2).trim()
})