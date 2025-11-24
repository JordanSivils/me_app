import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SupplierDetailsBodySchema, type SupplierDetailsBody } from "./types/supplierDetails";
import styles from "./CreateSupplierDetails.module.css"
import UserSelect from "../../Users/UserSelect";
import { useState } from "react";
import { useAuth } from "@clerk/react-router";
import { apiPost } from "../../../api/post";
import type { CreateResponse } from "../../Users/types/meUserTypes";
import { notify } from "../../UI/toast";
import Loading from "../../UI/loading/Loading";
import Portal from "../../UI/portal/Portal";
import SingleSupplier from "../SingleSupplier";

type CreateSupplierDetailsProps = {
    onClose: () => void
    supplierId: string
    supplierName: string;
    reRender: () => void
}

const CreateSupplierDetails = ({ supplierId, supplierName, onClose, reRender }: CreateSupplierDetailsProps) => {
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const { getToken } = useAuth();
    
    const { register, handleSubmit, reset, formState: { isValid} } = useForm<SupplierDetailsBody>({
        resolver: zodResolver(SupplierDetailsBodySchema),
        defaultValues: {
            supplierId: supplierId
        },
        mode: "onChange"
    })

    const onSubmit = async (data: SupplierDetailsBody) => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                throw new Error("no user credentials")
            }
            const res = await apiPost<SupplierDetailsBody, CreateResponse>("/supplier-details", token, data);
            
            notify.success(res.message);
            reRender?.()
            reset();
            onClose?.();
            setDetailModalOpen(true);

        } catch (error: any) {
            notify.error(error?.message || "Failed to create Supplier")
        }
        
    }
    return (
        <div className={`${styles.supplierDetailsContainer} flex-col`}>
            <Portal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
                <SingleSupplier supplierId={supplierId} onError={() => setDetailModalOpen(false)} onClose={() => setDetailModalOpen(false)}/>
            </Portal>
            <h1>{supplierName} Details</h1>
            {loading && <Loading />}
            <form className={`flex-col`} onSubmit={handleSubmit(onSubmit, (errs) => console.log(errs))}>
                <div className={styles.formGroup}>
                    <label>Ordered By: </label>
                    <UserSelect registration={register("userId", { required: true })} />
                </div>
                <div className={styles.formGroup}>
                    <label>Order Day: </label>
                    <select {...register("orderDay")}>
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
                <button type="submit" disabled={!isValid} className={isValid ? styles.submitBtn : ""}>Submit</button>
            </form>
        </div>
        
    )
}

export default CreateSupplierDetails;