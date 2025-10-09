import { useEffect, useState } from "react"
import { apiFetch } from "../../api/fetchData"
import { useAuth } from "@clerk/react-router"
import type { ItemSchema } from "../../api/types/item/itemSchema"
import type { SingleItemResponse } from "../../api/types/responses"
import styles from "./SingleItem.module.css"
import { notify } from "../UI/toast"

type ItemProps = {
    itemId: string
}

const SingleItem = ({ itemId }: ItemProps) => {
    const [item, setItem] = useState<ItemSchema | null>(null)
    
    const url = `/item/${itemId}`
    const { getToken } = useAuth()
    useEffect(() => {
        const getItem = async () => {
            const token = await getToken()
            if (!token) {
                notify.error("No User Credentials")
                return
            }
            try {
                const res = await apiFetch<SingleItemResponse>(url, token)
                console.log(res)
                setItem(res.data)
            } catch (error: any) {
                notify.error(error.message || "Server Error")
            }
        }
        getItem()
    }, [])
    return (
        <>
        <div className={`${styles.itemContainer} flex-col`}>
            <div className={`${styles.head} flex`}>
                <h2>{item?.description}</h2>
                <p>SKU: {item?.sku}</p>
            </div>
            <ul className={`flex-col`}>
                <li><span>Available</span> *likely wrong*: {item?.available}</li>
                {item?.status && item?.status === "negative" ? 
                    <li><span>Inventory Status</span>: {item.status}</li> :
                    null
                }
                <li><span>Category</span>: {item?.category?.name}</li>
                {item?.suppliers && item?.suppliers.map(sup => (
                    <ul key={sup.id} className={styles.dash}><span>Suppliers:</span>
                        <li>{sup.name}</li>
                    </ul>
                ))}
                {item?.manufacturer ? 
                    <li><span>Manufacturer</span>: {item?.manufacturer?.name}</li> :
                    <li><span>Manufacturer</span>: Missing Manufacturer</li>
                }
                {item?.brand ?
                    <li><span>Brand</span>: {item?.brand?.name}</li> :
                    <li><span>Brand</span>: Missing Brand</li>
                }
            </ul>
        </div>
        
        </>
    )
}

export default SingleItem