import z from "zod";
import { NegativeItemList } from "../../components/negativeInventory/types/negativeTypes";

export const NegativeInventorySchema = z.object({
    page: z.coerce.number().min(1),
    limit: z.coerce.number().min(1),
    total: z.coerce.number(),
    totalPages: z.coerce.number().min(1),
    previousPage: z.boolean().optional(),
    nextPage: z.boolean().optional(),
    items: z.array(NegativeItemList)
})
export type NegativeInventorySchema = z.infer<typeof NegativeInventorySchema>