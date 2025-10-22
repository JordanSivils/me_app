import z from "zod";

export const MeUserSchema = z.object({
    id: z.uuid(),
    clerkId: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1),
    phoneNumber: z.string().min(1)
});
export type MeUser = z.infer<typeof MeUserSchema>

export const ClerkUser = z.object({
    id: z.string().min(1),
    userName: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
})
export type ClerkUser = z.infer<typeof ClerkUser>

export const UserResponse = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string().min(1),
    meData: z.array(MeUserSchema),
    clerkData: z.array(ClerkUser)
})
export type UserResponse = z.infer<typeof UserResponse>

export const MeUserSingleResponse = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string().min(1),
    data: MeUserSchema
})
export type MeUserSingleResponse = z.infer<typeof MeUserSingleResponse>

export const MeUserPatchSchema = z.object({
    email: z.string().min(1),
    phoneNumber: z.string().min(1)
})
export type MeUserPatch = z.infer<typeof MeUserPatchSchema>

export const CreateResponseSchema = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string(),
    data: MeUserSchema
});
export type CreateResponse = z.infer<typeof CreateResponseSchema>

export const MeUserCreateSchema = z.object({
    clerkId: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1),
    phoneNumber: z.string().min(1),
});

export type MeUserCreate = z.infer<typeof MeUserCreateSchema>;