import { useEffect, useState } from "react"
import type { Supplier } from "../types/listResponse"
import Loading from "../../UI/loading/Loading"
import styles from "./CreateSupplierDetails.module.css"
import UserSelect from "../../Users/UserSelect"
import { useAuth } from "@clerk/react-router"
import { useForm } from "react-hook-form"
import { SupplierDetailsPutschema, type SupplierDetailsPut } from "./types/supplierDetails"
import { zodResolver } from "@hookform/resolvers/zod"
import { notify } from "../../UI/toast"
import { apiPatch } from "../../../api/patch"


type EditSupplierDetailProps = {
    sup: Supplier
    onClose: () => void
    rerender: () => void
}

const EditSupplierDetails = ({ sup, rerender, onClose }: EditSupplierDetailProps) => {
    
const [loading, setLoading] = useState(false);

const { getToken } = useAuth();

const { register, handleSubmit, reset ,formState:{
     isSubmitting, isValid
}} = useForm<SupplierDetailsPut>({
    resolver: zodResolver(SupplierDetailsPutschema),
    defaultValues: {
        userId: "",
        orderDay: "",
        orderNotes: "",
        orderMinimum: "",
    }
});
{console.log(sup.supplierDetails?.user?.id)}

useEffect(() => {
    reset({
        userId: sup.supplierDetails?.user?.id ?? "",
        orderDay: sup.supplierDetails?.orderDay ?? "Monday",
        orderNotes: sup.supplierDetails?.orderNotes ?? undefined,
        orderMinimum: sup.supplierDetails?.orderMinimum ?? undefined,
    })
}, [sup, reset])

const onSubmit = async (data: SupplierDetailsPut) => {
    try {
        setLoading(true);
        const token = await getToken();
        if (!token) {
            notify.error("No User Credentials")
            return
        }
        await apiPatch<SupplierDetailsPut>(`/supplier-details/${sup.supplierDetails?.id}`, data, token)

        notify.success("Supplier Updated")

        rerender?.()
        onClose?.()
    } catch (error: any) {
        notify.error(error?.messaage || "Failed to update supplier details")
    }
}


    return(
        <div className={`${styles.supplierDetailsContainer} flex-col`}>
            <h1>{sup?.name} Details</h1>
            {loading && <Loading />}
            <form className={`flex-col`} onSubmit={handleSubmit(onSubmit, (errs) => console.log(errs))}>
                <div className={styles.formGroup}>
                    <label>Ordered By: </label>
                    <UserSelect 
                        registration={register("userId", { required: true })} 
                        />
                </div>
                <div className={styles.formGroup}>
                    <label>Order Day: </label>
                    <select {...register("orderDay")}>{sup.supplierDetails?.orderDay}
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>
                <div className={`${styles.textAreaFormGroup} flex-col`}>
                    <label>Order Minimum *If Applicable</label>
                    <textarea {...register("orderMinimum")} />
                </div>
                <div className={`${styles.textAreaFormGroup} flex-col`}>
                    <label>Order Notes</label>
                    <textarea {...register("orderNotes")} />
                </div>
                <button type="submit" disabled={!isValid || isSubmitting} className={isValid ? styles.submitBtn: ""}>Submit</button>
            </form>
        </div>
        
    )
}

export default EditSupplierDetails