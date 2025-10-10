import { useEffect, useState } from "react"
import type { SupplierSchema } from "../../api/types/item/supplierSchema"
import { useAuth } from "@clerk/react-router"
import { notify } from "../UI/toast"
import { apiFetch } from "../../api/fetchData"
import styles from "./SingleSupplier.module.css"
import Loading from "../UI/loading/Loading"

type SupplierProps = {
    onError: () => void
    supplierId: string
}

const SingleSupplier = ({ supplierId, onError }: SupplierProps) => {
    const { getToken } = useAuth();
    const [supplier, setSupplier] = useState<SupplierSchema | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchSupplier = async () => {
        const url = `/supplier/${supplierId}`
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                notify.error("No User Credentials");
                return
            }
            const data = await apiFetch<SupplierSchema>(url, token)
            setSupplier(data);
        } catch (error: any) {
            notify.error(error.message || "Server Error");
            onError?.()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSupplier()
    }, [])
    return (
        <>
        {loading ? <Loading /> :
        
        <div className={`${styles.itemContainer} flex-col`}>
            
            <div className={`${styles.head} flex`}>
                <h2>{supplier?.name}</h2>
            </div>
            <ul className={`flex-col`}>
                <li><span>Id</span>: {supplier?.id}</li>
                {supplier?.createdAt &&
                    <li><span>Created On</span>: {supplier?.createdAt.toLocaleString()}</li>
                }
            </ul>
        </div>
        }
        </>
    )
}

export default SingleSupplier