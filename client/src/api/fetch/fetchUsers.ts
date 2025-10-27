import type { MeUser, UserResponse } from "../../components/Users/types/meUserTypes";
import { apiFetch } from "../fetchData"

export const fetchUsers = async (token: string): Promise<MeUser[]> => {
        try {
            const res = await apiFetch<UserResponse>("/users", token);
            if (!res.ok) {
                throw new Error(res.message || "Failed to fetch employees")
            }
            const users = res.meData;
            console.log(users);
            return users as MeUser[]
        } catch (error: any) {
            throw new Error(error?.message || "Server Error")
        }
    }