import z from "zod";

export const FileUploadSchema = z.object({
    file: z.instanceof(FileList)
        .refine(files => files.length > 0, "File Required to Submit")
        .refine(files => files[0]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Only .xlsx Files accepted")
})

export type FileUpload = z.infer<typeof FileUploadSchema>