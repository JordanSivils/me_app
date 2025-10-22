import { SignedIn, UserButton } from "@clerk/react-router"
import styles from "./Sidebar.module.css"
import RequireRole from "../../../app/permissions/RequireRoll"
const Sidebar = () => {
    return (
        <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Main Nav</p>
                <li className={styles.sidebarItem}><a href="/home" className={styles.sidebarLink}>Home</a></li>
                <li className={styles.sidebarItem}><a href="/negative-inventory" className={`${styles.sidebarLink} ${styles.sbSm}`}>Negative Inventory</a></li>
                <li className={styles.sidebarItem}><a href="/suppliers" className={`${styles.sidebarLink}`}>Suppliers</a></li>
                <li className={styles.sidebarItem}><a href="/employees" className={`${styles.sidebarLink}`}>Employees</a></li>
                <RequireRole anyOf={["admin", "dev", "owner", "manager"]}>
                    <li className={styles.sidebarItem}><a href="/manager/home" className={`${styles.sidebarLink}`}>Manager</a></li>
                </RequireRole>
                
            </ul>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Quick Tools</p>
                <li className={styles.sidebarItem}><a href="/inventory-upload" className={styles.sidebarLink}>Inventory</a></li>
            </ul>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Profile</p>
                <li className={styles.sidebarItem}><a href="#"><SignedIn><UserButton /></SignedIn></a></li>
            </ul>
        </div>
    )
}

export default Sidebar