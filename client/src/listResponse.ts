import z from "zod";
import { NegativeItemList } from "./components/negativeInventory/types/negativeTypes";

export const NegativeInventoryDataObject = z.object({
    page: z.coerce.number().min(1),
    limit: z.coerce.number().min(1),
    total: z.coerce.number(),
    totalPages: z.coerce.number().min(1),
    previousPage: z.boolean().optional(),
    nextPage: z.boolean().optional(),
    items: z.array(NegativeItemList)
})
export type NegativeInventoryDataObject = z.infer<typeof NegativeInventoryDataObject>

export const ListResponseObject = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string(),
    data: NegativeInventoryDataObject
})
export type ListResponseObject = z.infer<typeof ListResponseObject>

