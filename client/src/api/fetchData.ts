import { notify } from "../components/UI/toast"
import { apiUrl } from "./url"

export const apiFetch = async <T>(url: string, auth: string): Promise<T> => {
   
        const response = await fetch(`${apiUrl}${url}`, {
            headers: {
                "Authorization": `Bearer ${auth}`
            }
        })

        if (!response.ok) {
             notify.error("server error")
        }

        const data = await response.json() as Promise<T>

        return data
}