import styles from '../../styles/Grid.module.css';
import RequireRole from '../../app/permissions/RequireRoll';

const HomeGrid = () => {
    return (
        <div className={`${styles.gridContainer} grid-auto`}>
                <div>
                    <a href="/home">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Home</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00df00" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                            </svg>
                            <p>Home Page</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="/inventory-upload">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Inventory Report</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00df00" viewBox="0 0 16 16">
                                <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
                                <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
                                <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                            </svg>
                            <p>Pinogy Excel into usable inventory checklist</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="/negative-inventory">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Negative Inventory</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00df00" viewBox="0 0 16 16">
                                <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
                                <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M6 8h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1"/>
                            </svg>
                            <p>Handle Negative Inventory</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="/suppliers">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Suppliers</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00df00" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                            </svg>
                            <p>Suppliers & Details</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="/employees">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Employees</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00df00" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>
                            <p>Contact Info</p>
                        </div>
                    </a>
                </div>
                <RequireRole anyOf={["admin", "dev", "owner", "manager"]} fallback={null}>
                    <div>
                        <a href="/manager/home">
                            <div className={`${styles.gridCard} flex-col`}>
                                <p>Manager Home</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00df00" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
                                </svg>
                                <p>Handle Managerial Duties</p>
                            </div>
                        </a>
                    </div>
                </RequireRole>
        </div>
    )
}

export default HomeGrid