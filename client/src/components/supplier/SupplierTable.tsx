import { useAuth } from "@clerk/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../../styles/Table.module.css"
import { notify } from "../UI/toast";
import { apiFetch } from "../../api/fetchData";
import Portal from "../UI/portal/Portal";
import Limit from "../UI/pagination/Limit";
import Pagination from "../UI/pagination/Pagination";
import Loading from "../UI/loading/Loading";
import type { ListResponseObject, SupplierList } from "./types/listResponse";
import SingleSupplier from "./SingleSupplier";

const SupplierTable = () => {
const { getToken } = useAuth();
    const [suppliers, setSuppliers] = useState<SupplierList[] | null>([]);
    const [loading, setLoading] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number | 15>(15);
    const [previousPage, setPreviousPage] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    
    const url = useMemo(
        () => `/suppliers?limit=${limit}&page=${currentPage}`,
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
            setSuppliers(data); 
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
    return (
       <div className={styles.tableContainer}>
            <Portal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
                {activeId && <SingleSupplier  supplierId={activeId} onError={() => setDetailModalOpen(false)}/>}
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
                <div className={`${styles.right} flex`}>
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
                        <th className={styles.headIdentifier}>Supplier</th>
                        <th className={styles.headIdentifier}>Item Count</th>
                        <th className={styles.headIdentifier}>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers && suppliers.map(row => (
                        <tr className={styles.tableDataRow} key={row.id}>
                            <td className={styles.colData}>{row.name}</td>
                            <td className={styles.colData}>{row._count.items}</td>
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

export default SupplierTable