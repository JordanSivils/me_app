import { SignedIn, UserButton } from "@clerk/react-router"
import styles from "./Sidebar.module.css"
const Sidebar = () => {
    return (
        <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Main Nav</p>
                <li className={styles.sidebarItem}><a href="/home" className={styles.sidebarLink}>Home</a></li>
                <li className={styles.sidebarItem}><a href="/suppliers" className={styles.sidebarLink}>Suppliers</a></li>
                <li className={styles.sidebarItem}><a href="/special-orders" className={styles.sidebarLink}>Special Orders</a></li>
                <li className={styles.sidebarItem}><a href="/reports" className={styles.sidebarLink}>Reports</a></li>
                <li className={styles.sidebarItem}><a href="/users" className={styles.sidebarLink}>Users</a></li>
            </ul>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Quick Tools</p>
                <li className={styles.sidebarItem}><a href="/inventory" className={styles.sidebarLink}>Inventory</a></li>
            </ul>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Profile</p>
                <li className={styles.sidebarItem}><a href="#"><SignedIn><UserButton /></SignedIn></a></li>
            </ul>
        </div>
    )
}

export default Sidebar