import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../../styles/Table.module.css"
import Portal from "../UI/portal/Portal";
import type { NegativeItemList } from "./types/negativeTypes";
import { useAuth } from "@clerk/react-router";
import { apiFetch } from "../../api/fetchData";
import FileForm from "../upload/UploadFile";
import { apiPatch } from "../../api/patch";
import type { ListResponseObject } from "../../api/types/responses";
import SingleItem from "../item/SingleItem";
import { notify } from "../UI/toast";
import Pagination from "../UI/pagination/Pagination";
import Limit from "../UI/pagination/Limit";
import Loading from "../UI/loading/Loading";

const NegativeInventoryTable = () => {
    const { getToken } = useAuth();
    const [negativeInventory, setNegativeInventory] = useState<NegativeItemList[] | null>(null);
    const [loading, setLoading] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number | 15>(15);
    const [previousPage, setPreviousPage] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    
    const url = useMemo(
        () => `/inventory/negative?limit=${limit}&page=${currentPage}`,
        [limit, currentPage]
    )

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const token = await getToken();
            if (!token) {
                console.warn("No Token")
                notify.error("No User Credentials")
                return 
            }
            const res = await apiFetch<ListResponseObject>(url, token)
            const pagination = res.data
            const data = res.data?.items 
            setNegativeInventory(data); 
            setCurrentPage(pagination.page);
            setLimit(pagination.limit);
            setTotalPages(pagination.totalPages)
            setPreviousPage(pagination.previousPage || false);
            setNextPage(pagination.nextPage || false)
            setTotal(pagination.total);
        } catch (error) {
            notify.error("Server Error")
        } finally {
            setLoading(false)
        }
            
        }, [getToken, url])
    
    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleNext = () => {
        if (!currentPage) {
            throw new Error("no current Page")
        }
        nextPage && setCurrentPage(currentPage + 1)
    }

    const handlePrev = () => {
        if (!currentPage) {
            throw new Error("no current page")
        }
        previousPage && setCurrentPage(currentPage - 1)
    }

    const handleLimit = (nextSize: number) => {
        setCurrentPage(1)
        setLimit(nextSize)
    }
    const opts = [15, 25, 50]

    type PatchBody = { status: "negative" | "standard"}
    

    const onToggle = async (row: NegativeItemList, checked: boolean) => {
        const token = await getToken();
        if (!token) {
            console.warn("No Token")
            notify.error("No User Credentials")
            return 
        }
        try {
            await apiPatch<PatchBody>(`/item/${row.id}`, {status: checked ? "standard" : "negative"}, token)
            notify.success("Handled Successfully")
            await fetchData()
        } catch (error: any) {
            notify.error(error.message || "Server Error")
        }
    }

    return (
       <div className={styles.tableContainer}>
            <Portal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)}><FileForm onSuccess={() => {
                setCreateModalOpen(false)
            }} /></Portal>
            <Portal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
                {activeId && <SingleItem itemId={activeId} onError={() => setDetailModalOpen(false)}/>}
            </Portal>
           
            <div className={styles.tableHeader}>
                
                <div className={`${styles.topGroup} flex`}>
                    <h3>Negative Inventory List</h3>
                    <Limit 
                    limit={limit}
                    limitOpts={opts}
                    newLimit={handleLimit}
                    />
                </div>
                <div className={`${styles.topGroup} flex`}>
                    <button className={styles.createBtn} onClick={() => setCreateModalOpen(true)}>Upload Inventory</button>
                    <Pagination 
                    total={total}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    />
                </div>
            </div>
            {loading && <Loading />}
            <table className={styles.table}>
                 
                <thead className={styles.tableHead}>
                    <tr className={styles.tableHeadRow}>
                        <th className={styles.headIdentifier}>SKU</th>
                        <th className={styles.headIdentifier}>Description</th>
                        <th className={styles.headIdentifier}>Available</th>
                        <th className={styles.headIdentifier}>Handled?</th>
                        <th className={styles.headIdentifier}>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {negativeInventory && negativeInventory.map(row => (
                        <tr className={styles.tableDataRow} key={row.id}>
                        <td className={`${styles.colData} ${styles.sku}`}>{row.sku}</td>
                        <td className={styles.colData}>{row.description}</td>
                        <td className={styles.colData}>{row.available}</td>
                        <td className={styles.colData}>
                            <label className={styles.switch}>
                                <input 
                                type="checkbox" 
                                role="switch"
                                checked={row.status === "standard"}
                                onChange={(e) => onToggle(row, e.target.checked)}

                                />
                                
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </td>
                        <td className={styles.colData}>
                            <button onClick={() => {
                                        setDetailModalOpen(true)
                                        setActiveId(row.id)
                                    }
                            } className={styles.tableLink}>Details</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                
            </table>
            
       </div>
    )
}

export default NegativeInventoryTable;