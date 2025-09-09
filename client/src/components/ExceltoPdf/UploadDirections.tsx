import styles from "./UploadDirections.module.css"

const UploadDirections = () => {
 return (
    <div className={`${styles.directionsContainer} flex-col`}>
       <h2>Directions to Download and Transofrm Inventory</h2>
       <ul className={`flex-col`}>
        <li>
            <div className={`flex-col`}>
                <p>Step 1:</p>
                <p>Enter the Pinogy app "Products"</p>
            </div>
        </li>
       </ul>
    </div>
 )
}

export default UploadDirections