import { useEffect, useState } from "react"
import { ClerkUser, UserResponse, type MeUser } from "./types/meUserTypes"
import { useAuth } from "@clerk/react-router";
import { notify } from "../UI/toast";
import { apiFetch } from "../../api/fetchData";
import styles from "../../styles/Table.module.css";
import Loading from "../UI/loading/Loading";
import Portal from "../UI/portal/Portal";
import CreateUser from "./CreateUser";
import MeUserEdit from "./MeUserEdit";
import RequireRole from "../../app/permissions/RequireRoll";

const UserTable = () => {
    const [loading, setLoading] = useState(false)
    const [meUsers, setMeUsers] = useState<MeUser[] | null>(null);
    const [clerkUsers, setClerkUsers] = useState<ClerkUser[] | null>(null);
    const [refresh, setRefresh] = useState(0);
    const [createPortal, setCreatePortal] = useState(false)
    const [clerkId, setClerkId] = useState<string | "">("")
    const [firstName, setFirstName] = useState<string | "">("")
    const [lastName, setLastName] = useState<string | "">("");
    const [editPortal, setEditPortal] = useState(false)
    const [meId, setMeId] = useState<string | "">("")
    const { getToken } = useAuth()

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                notify.error("no user credentials") 
                return
            }

            const res = await apiFetch<UserResponse>(`/users`, token);
            if (!res.ok) {
                notify.error(res.message || "Server Error")
            }
            
            setMeUsers(res.meData);
            setClerkUsers(res.clerkData);
        } catch (error: any) {
            notify.error(error?.message || "Server Error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [refresh])

    const handleRefresh = () => setRefresh(n => n +1);
    return (
        <div className={styles.tableContainer}>
            {loading && <Loading />}
            <Portal isOpen={createPortal} onClose={() => setCreatePortal(false)}>
                {clerkId && <CreateUser 
                    clerkId={clerkId} 
                    firstName={firstName} 
                    lastName={lastName} 
                    onClose={() => {
                        setCreatePortal(false);
                        setClerkId("")
                        setFirstName("")
                        setLastName("")
                    }
                    } onRerender={() => handleRefresh()} />}
            </Portal>
            <Portal isOpen={editPortal} onClose={() => setEditPortal(false)}>
                {meId && <MeUserEdit 
                    id={meId} 
                    onClose={() => {
                        setEditPortal(false);
                        setMeId("")
                        }} reRender={() => handleRefresh()} />}
            </Portal>
            <RequireRole anyOf={["admin", "dev", "owner", "manager"]} fallback={null}>
                <h1>Not Created</h1>
            <table className={`${styles.table} ${styles.tableOne}`}>
                <thead className={styles.tableHead}>
                    <tr className={styles.tableHeadRow}>
                        <th className={styles.headIdentifier}>First Name</th>
                        <th className={styles.headIdentifier}>Last Name</th>
                        <RequireRole anyOf={["admin", "dev", "owner", "manager"]} fallback={null}>
                            <th className={styles.headIdentifier}>Create</th>
                        </RequireRole>
                    </tr>
                </thead>
                <tbody>
                    {clerkUsers && clerkUsers.map(user => (
                        <tr className={styles.tableDataRow} key={user.id}>
                            <td className={styles.colData}>{user.firstName}</td>
                            <td className={styles.colData}>{user.lastName}</td>
                            <RequireRole anyOf={["admin", "dev", "owner", "manager"]} fallback={null}>
                                <td className={styles.colData}>
                                <button onClick={() => {
                                            setCreatePortal(true)
                                            setClerkId(user.id)
                                            setFirstName(user.firstName)
                                            setLastName(user.lastName)
                                        }
                                } className={styles.createLink}>Create</button>
                            </td>
                            </RequireRole>
                            
                        </tr>
                        ))}
                    </tbody>
                </table>
            </RequireRole>
            
                
                {/* SWITCH TABLES */}
                <h3>Employees</h3>
            <table className={styles.table}>
                 
                <thead className={styles.tableHead}>
                    <tr className={styles.tableHeadRow}>
                        <th className={styles.headIdentifier}>Name</th>
                        <th className={styles.headIdentifier}>Email</th>
                        <th className={styles.headIdentifier}>Phone</th>
                        <RequireRole anyOf={["admin", "dev", "owner", "manager"]} fallback={null}>
                            <th className={styles.headIdentifier}>Edit</th>
                        </RequireRole>
                        
                    </tr>
                </thead>
                <tbody>
                    {meUsers && meUsers.map(user => (
                        <tr className={styles.tableDataRow} key={user.id}>
                            <td className={styles.colData}>{user.firstName} {user.lastName}</td>
                            <td className={styles.colData}>{user.email}</td>
                            <td className={styles.colData}>{user.phoneNumber}</td>
                            <RequireRole anyOf={["admin", "dev", "owner", "manager"]} fallback={null}>
                                <td className={styles.colData}>
                                <button onClick={() => {
                                            setEditPortal(true)
                                            setMeId(user.id)
                                        }
                                } className={styles.tableLink}>Edit</button>
                            </td>
                            </RequireRole>
                            
                        </tr>
                        ))}
                    </tbody>
                    
                </table>
        </div>
    )
}

export default UserTable