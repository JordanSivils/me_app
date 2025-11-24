import { useEffect, useState } from "react"
import { useAuth } from "@clerk/react-router"
import { notify } from "../UI/toast"
import { apiFetch } from "../../api/fetchData"
import styles from "./SingleSupplier.module.css"
import Loading from "../UI/loading/Loading"
import type { SingleResponse, Supplier } from "./types/listResponse"
import Portal from "../UI/portal/Portal"
import CreateSupplierDetails from "./supplierDetails/CreateSupplierDetails"
import EditSupplierDetails from "./supplierDetails/EditSupplierDetails"

type SupplierProps = {
    onError: () => void
    supplierId: string
    onClose: () => void
}

const SingleSupplier = ({ supplierId, onError, onClose }: SupplierProps) => {
    const { getToken } = useAuth();
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [supName, setSupName] = useState<string | "">("")
    const [loading, setLoading] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [rerender, setRerender] = useState(0)
    const [editModal, setEditModal] = useState(false)
    const [supId, setSupId] = useState<string | "">("");

    const fetchSupplier = async () => {
        const url = `/supplier/${supplierId}`
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                notify.error("No User Credentials");
                return
            }
            const data = await apiFetch<SingleResponse>(url, token)
            setSupplier(data.data);
        } catch (error: any) {
            notify.error(error.message || "Server Error");
            onError?.()
            onClose?.()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSupplier()
    }, [rerender]);

    const handleRerender = () => setRerender(n => n + 1)
    return (
        <>
        {loading ? <Loading /> :
        
        <div className={`${styles.itemContainer} flex-col`}>
            <Portal isOpen={ createModal } onClose={() => setCreateModal(false)}>
                <CreateSupplierDetails 
                supplierId={supId} 
                supplierName={supName} 
                onClose={() => setCreateModal(false)}
                reRender={handleRerender}
                />
            </Portal>
            <Portal isOpen={editModal} onClose={() => setEditModal(false)}>
                {supplier?.supplierDetails &&
                    <EditSupplierDetails 
                    sup={ supplier } 
                    onClose={() => setEditModal(false)}
                    rerender={handleRerender}
                    />
                }
            </Portal>
            <div className={`${styles.head} flex`}>
                <h2>{supplier?.name}</h2>
            </div>
            <div className={`flex-col ${styles.infoGroup}`}>
                {supplier?.supplierDetails ? 
                <div>
                    <ul>
                        <li><span>Order On: </span>{supplier?.supplierDetails.orderDay}</li>
                        <li>
                            <div className={`flex-col ${styles.textArea}`}>
                                <span>Order Minimum: </span>
                                <p>{supplier?.supplierDetails.orderMinimum}</p>     
                            </div>
                        </li>
                        <li>
                            <div className={`flex-col ${styles.textArea}`}>
                                <span>Order Notes: </span>
                                <p>{supplier?.supplierDetails.orderNotes}</p>     
                            </div>
                        </li>
                    </ul>
                    {supplier?.supplierDetails?.user ?
                    <ul>
                        <li>
                            <div className={`flex-col ${styles.textArea}`}>
                                <span>Ordered by: </span>
                                <p>{supplier?.supplierDetails.user.firstName} {supplier?.supplierDetails.user.lastName}</p>     
                                <p>{supplier?.supplierDetails.user.email}</p>     
                                <p>{supplier?.supplierDetails.user.phoneNumber}</p>     
                            </div>
                        </li>
                    </ul> :
                    null 
                    }
                    
                <button className={styles.editBtn} onClick={() => {
                        setEditModal(true)
                        setSupplier(supplier)
                        
                    }
                    }>Edit</button>
                </div>
                 : 
                <button className={styles.createBtn} onClick={() => {
                    setCreateModal(true)
                    {supplier && 
                        setSupId(supplier.id); 
                        setSupName(supplier?.name || "")
                    }
                }}>Create Supplier Details</button>
                }
                
            </div>
        </div>
        }
        </>
    )
}

export default SingleSupplier