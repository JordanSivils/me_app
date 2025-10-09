import z from "zod";
import { ManufacturerSchema } from "./manufacturerSchema";
import { CategorySchema } from "./categorySchema";
import { BrandSchema } from "./brandSchema";
import { SupplierSchema } from "./supplierSchema";

export const ItemSchema = z.object({
    id: z.uuid(),
    sku: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(["negative", "standard"]),
    available: z.coerce.number().optional(),
    manufacturer: ManufacturerSchema.optional(),
    category: CategorySchema.optional(),
    brand: BrandSchema.optional(),
    suppliers: z.array(SupplierSchema)
})

export type ItemSchema = z.infer<typeof ItemSchema>