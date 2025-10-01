import z from "zod";
import type { ApiError } from "../../../api/types/responses";

export const NegativeItemList = z.object({
    id: z.uuid(),
    sku: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(["negative", "standard"]),
    available: z.coerce.number(),
    manufacturerId: z.uuid().nullish(),
    brandId:  z.uuid().nullish(),
    categoryId:  z.uuid().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})
export type NegativeItemList = z.infer<typeof NegativeItemList>

export const FileUploadSuccess = z.object({
    ok: z.boolean(),
    message: z.string()
})
export type FileUploadSuccess = z.infer<typeof FileUploadSuccess>

export type FileUploadResponse = ApiError | FileUploadSuccess