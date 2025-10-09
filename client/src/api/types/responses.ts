import z from "zod"
import { NegativeInventorySchema } from "./listResponse"
import { ItemSchema } from "./item/itemSchema"

export type ApiError = {
    ok: false
    status: number
    reason: string
    message?: string
    field?: string
}

export const ListResponseObject = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string(),
    data: NegativeInventorySchema
})
export type ListResponseObject = z.infer<typeof ListResponseObject>

export const SingleItemResponse = z.object({
    message: z.string(),
    ok: z.boolean(),
    status: z.coerce.number(),
    data: ItemSchema
}) 
export type SingleItemResponse = z.infer<typeof SingleItemResponse>