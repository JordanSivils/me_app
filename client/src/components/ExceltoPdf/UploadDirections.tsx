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
        <li>
            <div className={`flex-col`}>
                <p>Step 2:</p>
                <p>Select the gear Icon in the top right corner.</p>
                <img src="src/assets/Setting_Icon.webp" alt="Gear Icon" height={50} width={70} />
            </div>
        </li>
        <li>
            <div className={`flex-col`}>
                <p>Step 3:</p>
                <p>a: Select the Records Per Page and make sure the number is greater than the number of records you want to print.</p>
                <img src="src/assets/Table_Settings.webp" alt="Gear Icon" height={300} width={500} />
                <p>b: Select the Show columns and make sure that suppliers is selected so you can sort by the targeted supplier.</p>
                <img src="src/assets/Select_Supplier.webp" alt="Gear Icon" height={180} width={500} />
            </div>
        </li>
        <li>
            <div className={`flex-col`}>
                <p>Step 4:</p>
                <p>Highlight the rows you want to print for getting Invetory Counts. You can skip lines you dont want.</p>
                <img src="src/assets/Highlighted_lines_Redacted.webp" alt="Gear Icon" height={300} width={500} />
                <p>They are marked out because of where I host the codebase, and help I may get</p>
            </div>
        </li>
        <li>
            <div className={`flex-col`}>
                <p>Step 5:</p>
                <p>A: Select the Smart Export Icon.</p>
                <img src="src/assets/Smart_Export.webp" alt="Gear Icon" height={50} width={70} />
                <p>B: Select the Options for "Selected Records"! This will immediately create an excel file with the selected lines.</p>
                <img src="src/assets/Correct_Export.webp" alt="Gear Icon" height={300} width={300} />
            </div>
        </li>
        <li>
            <div className={`flex-col`}>
                <p>Step 6:</p>
                <p>Rename and save this file in a location you know you can find.</p>
                <p>Do NOT Alter the headers or columns of this excel file. The program is set up to pull from excel repot untouched.</p>
            </div>
        </li>
        <li>
            <div className={`flex-col`}>
                <p>Step 7:</p>
                <p>When the the new page opens after you submit, you can print directly from that page on a windows computer, but you will have to download and preview to print on a mac.</p>
                <p>To get out of the pdf page, just click back or use the side navigation to get wherever you want to go.</p>
            </div>
        </li>
       </ul>
    </div>
 )
}

export default UploadDirections