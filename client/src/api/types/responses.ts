export type ApiError = {
    ok: false
    status: number
    reason: string
    message?: string
    field?: string
}

