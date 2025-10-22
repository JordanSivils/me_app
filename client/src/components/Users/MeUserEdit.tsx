import { useEffect, useState } from "react"
import styles from "../../styles/Form.module.css"
import { MeUserPatchSchema, type MeUser, type MeUserPatch, type MeUserSingleResponse } from "./types/meUserTypes"
import { apiFetch } from "../../api/fetchData"
import { useAuth } from "@clerk/react-router"
import RequireRole from "../../app/permissions/RequireRoll"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { notify } from "../UI/toast"
import { apiPatch } from "../../api/patch"
import Loading from "../UI/loading/Loading"

type MeUserProps = {
    id: string
    onClose: () => void
    reRender: () => void
}

const MeUserEdit = ({ id, onClose, reRender } : MeUserProps) => {
    const [user, setUser] = useState<MeUser | null>(null)
    const [loading, setLoading] = useState(false);

    const { getToken } = useAuth();
    const { register, handleSubmit, reset, formState: {
        isDirty, isSubmitting
    } } = useForm<MeUserPatch>({
        resolver: zodResolver(MeUserPatchSchema),
        defaultValues: {
            email: "",
            phoneNumber: ""
        }
    })

    const fetchUser = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                throw new Error("no user credentials")
            }
            const res = await apiFetch<MeUserSingleResponse>(`/me/user/${id}`, token)
            const data = res.data
            reset ({
                email: data.email ?? "",
                phoneNumber: data.phoneNumber ?? ""
            })
            setUser(data)
        } catch (error: any) {
            notify.error(error.message || "Poblem Loading Employees")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const onSubmit = async (data: MeUserPatch) => {
        try {
            setLoading(true)
            const token = await getToken()
            if (!token) {
                notify.error("no user credentials")
                return
            }
            await apiPatch<MeUserPatch>(`/me/user/${id}`, data, token)

            notify.success("User Edited")

            onClose?.()
            reRender?.()
        } catch (error: any) {
            notify.error(error?.message || "Error Saving Changes")
        } finally {
            setLoading(false)
        }
    }

    return (
        <RequireRole anyOf={["dev", "admin", "manager", "owner"]} fallback={null}>
            <div className={`${styles.formContainer} flex-col`}>
            {loading && <Loading />} 
            <h3>{user?.firstName} {user?.lastName}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
                <div className={styles.formGroup}>
                    <label htmlFor="">Email: </label>
                    <input type="text" {...register("email")}/>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="">Phone: </label>
                    <input type="text" {...register("phoneNumber")} />
                </div>
                <div className={`flex ${styles.submitGroup}`}>
                    <button
                    type="submit"
                    disabled={!isDirty || isSubmitting}
                    className={(!isDirty || isSubmitting) ? `${styles.btnDisabled}` : `${styles.btn}`}
                    >
                    Submit
                    </button>
                    <button onClick={onClose} className={`${styles.cancelBtn}`}>Cancel</button>
                </div>
            </form>
        </div>
        </RequireRole>
    )
}

export default MeUserEdit;