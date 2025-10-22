import type { FileUploadResponse } from "../components/negativeInventory/types/negativeTypes";
import { apiUrl } from "./url";

export const fileUpload = async (url: string, body: BodyInit): Promise<FileUploadResponse> => {
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: "POST",
            body: body
        })
        const text = await response.text()
        const json = text ? JSON.parse(text) : {};

        if (!response.ok || json?.ok === false) {
            return {
                ok: false,
                status: json?.status ?? response.status,
                message: json?.message ?? response.statusText
            }
        }

        return {
            ok: true,
            message: json.status ?? response.status,
        } as FileUploadResponse
    } catch (err: any) {
        return {
            ok: false,
            status: 0,
            reason: "NETWORK_ERROR",
            message: err.message ?? "Make sure the server is running and you are connected to the internet."
        }
    }
}

export const apiPost = async <TReq, TRes>(url: string, token: string, body: TReq): Promise<TRes> => {
    try {
            const res =  await fetch(`${apiUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        if (!res.ok) {
            if (res.status === 409) {
                throw new Error("User Already Exists")
            }
            throw new Error("Server Error")
        }
        return res.json() as Promise<TRes>

    } catch (error: any) {
        throw new Error(error.message || "server error")
    }
}