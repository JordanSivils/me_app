import { useEffect, useState } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import type { MeUser, UserResponse } from "./types/meUserTypes"
// import { fetchUsers } from "../../api/fetch/fetchUsers"
import { useAuth } from "@clerk/react-router"
import { notify } from "../UI/toast"
import { apiFetch } from "../../api/fetchData"

const UserSelect = ({ registration }: { registration: UseFormRegisterReturn}) => {
    const [users, setUsers] = useState<MeUser[]>([])
    const { getToken } = useAuth()
    const fetch = async () => {
        try {
            const token = await getToken()
            if (!token) {
                throw new Error("no user credentials")
            }
            const data = await apiFetch<UserResponse>("/users",token)
            if (!data.ok) {
                console.log(data.message);
            }
            console.log(data)
            setUsers(data.meData);
        } catch (error: any) {
            notify.error(error.message || "Server Error")
        }

        
    }
    useEffect(() => {
            fetch()
        }, [])
        
    return (
        <select key={users.length} {...registration}>
        <option value="">Select Employee</option>
        {users.map(user => (
            <option key={user.id} value={String(user.id)}>
            {user.firstName} {user.lastName}
            </option>
        ))}
        </select>
    )
}

export default UserSelect;