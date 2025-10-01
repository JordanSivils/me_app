import { apiUrl } from "./url"

export const apiPatch = async <T>(url: string, body: T, token: string) => {
    const response = await fetch(`${apiUrl}${url}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error("Server Problem")
    }
    return await response.json()
}