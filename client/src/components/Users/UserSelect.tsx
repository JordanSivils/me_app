import { useEffect, useState } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import type { MeUser, UserResponse } from "./types/meUserTypes"
// import { fetchUsers } from "../../api/fetch/fetchUsers"
import { useAuth } from "@clerk/react-router"
import { notify } from "../UI/toast"
import { apiFetch } from "../../api/fetchData"

type UserSelectProps = {
    registration: UseFormRegisterReturn;
    id: string
    name: string
}

const UserSelect = ({ registration, id, name }: UserSelectProps) => {
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
        <select {...registration}>
            <option value={id ? id : ""}>{name ? name : "Select Employee"}</option>
            {users?.map(user => (
                <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
            ))}
        </select>
    )
}

export default UserSelect;