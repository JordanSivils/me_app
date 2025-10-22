import { useAuth } from "@clerk/react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "../../styles/Form.module.css"
import { apiPost } from "../../api/post"
import { notify } from "../UI/toast"
import { useState } from "react"
import Loading from "../UI/loading/Loading"
import { MeUserCreateSchema, type CreateResponse, type MeUserCreate } from "./types/meUserTypes"
import RequireRole from "../../app/permissions/RequireRoll"

type CreateUserProps = {
    clerkId: string
    firstName: string
    lastName: string
    onClose: () => void
    onRerender: () => void
}

const CreateUser = ({ clerkId, firstName, lastName, onClose, onRerender }: CreateUserProps) => {
    const [loading, setLoading] = useState(false)
    const { getToken } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting }
        } = useForm<MeUserCreate>({
        resolver: zodResolver(MeUserCreateSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: { clerkId, firstName, lastName}
    });

    const onSubmit = async (data: MeUserCreate) => {
        setLoading(true)
        try {
            const token = await getToken();
        if (!token) {
            notify.error("no user credentials")
            return
        }
        await apiPost<MeUserCreate, CreateResponse>("/me/user", token, data)

        notify.success("Created Successfully")

        reset();

        onClose?.()
        
        } catch (error: any) {
            if (error.status === 409) {
                notify.error(error.message || "test")
                return
            } else {
                notify.error(error.message || "Error creating user")
            }
           
           reset();
        } finally {
            setLoading(false)
            onRerender?.()
        }
        
    }
    return (
        <RequireRole anyOf={["admin", "dev", "owner", "manager"]} fallback={null}>
            <div className={`${styles.formContainer} flex-col`}>
            {loading && <Loading />}
            <h3>{firstName} {lastName}</h3>
            <form className="flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={`${styles.formGroup} flex-col`}>
                    <label>Email:</label>
                    <input 
                    type="text" 
                    {...register("email")} 
                    required 
                    aria-invalid={!!errors.email || undefined}
                    aria-describedby="email-error"
                    />
                    <p id="email-error" role="alert" className={styles.alertText}>
                        {errors.email?.message}
                    </p>
                </div>
                <div className={`${styles.formGroup} flex-col`}>
                    <label>Phone Number:</label>
                <input 
                type="text" 
                {...register("phoneNumber")} 
                required 
                aria-invalid={!!errors.phoneNumber || undefined}
                aria-describedby="phone-error"
                />
                <p id="phone-error" role="alert" className={styles.alertText}>
                    {errors.phoneNumber?.message}
                </p>
                </div>
                

                <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={(!isValid || isSubmitting) ? `${styles.btnDisabled}` : `${styles.btn}`}
                >
                Submit
                </button>

            </form>
        </div>
        </RequireRole>
        
    )
}

export default CreateUser