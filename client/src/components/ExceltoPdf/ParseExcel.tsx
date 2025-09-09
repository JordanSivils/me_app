import { XLSX } from "@me/shared"
import { useNavigate } from "react-router"
import styles from "./ParseExcel.module.css"
import { useRef, useState } from "react"
import Alert from "../UI/Alert"

type RawRow = Record<string, unknown>

export type InventoryItem = {
  SKU: string
  Description: string
  Available: number
}

export type ParsedInventory = {
  items: InventoryItem[]
  soureSheet: string
  fileName: string
}

const ParseExcel = () => {
const navigate = useNavigate();
const [parsed, setParsed] = useState<ParsedInventory | null>(null);
const [error, setError] = useState<string | null>(null);
const inputRef = useRef<HTMLInputElement | null>(null)
  
    const handleFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setError(null);

      const reader = new FileReader();

      reader.onerror = () => {
        setParsed(null);
        setError("Failed to read the file. Please try again");
        if (inputRef.current) inputRef.current.value = ""
      };

      reader.onload = (evt) => {
        try {
          const data = evt.target?.result as ArrayBuffer;
          const wb = XLSX.read(data, { type: "array", cellDates: true, dateNF: "mm-dd-yyyy" })

          const firstSheet = wb.SheetNames[0];
          if (!firstSheet) {
            throw new Error("No Worksheet Fond.")
          }

          const ws = wb.Sheets[firstSheet];
          const json: RawRow[] = XLSX.utils.sheet_to_json(ws, {defval: null, raw: false});

          const items: InventoryItem[] = json.map((r: any) => ({
            SKU: r.SKU ?? r.sku ?? r["Item #"] ?? "",
            Description: r.Description ?? r.description ?? r.Item ?? "",
            Available: r.Available ?? r.available ?? r["Qty On Hand"] ?? 0
          }))

          setParsed({ items, soureSheet: firstSheet, fileName: file.name})
        } catch (err: any) {
          setParsed(null);
          setError(err?.message ?? "Failed to parse file.")
        } finally {
          if (inputRef.current) inputRef.current.value = ""
        }
      }
      reader.readAsArrayBuffer(file)
    };

    const handleSubmit = () => {
      if (!parsed) return;
      navigate("/pdf-download", { state: parsed })
    }

    const handleClear = () => {
      setParsed(null);
      setError(null);
      if (inputRef.current) inputRef.current.value = ""
    }
  
    return (
      <div className={styles.inventoryForm}>
        <h2>Upload Inventory</h2>

        <input 
        ref={inputRef}
        type="file" 
        accept=".xlsx,.xls" 
        onChange={handleFile} 
        />

        {error && <Alert kind="error">{error}</Alert>}

        {parsed && 
          <Alert kind="success">
            <div className={styles.darkFont}>
              <div className={styles.groupContainer}>
                <div className={styles.darkFont}><strong className={styles.darkFont}>File:</strong> {parsed.fileName}</div>
                <div className={styles.darkFont}><strong className={styles.darkFont}>Sheet:</strong> {parsed.soureSheet}</div>
                <div className={styles.darkFont}><strong className={styles.darkFont}>Rows:</strong> {parsed.items.length}</div>
              </div>
              <div className={styles.submitContainer}>
                <button onClick={handleSubmit} className={styles.darkFont}>Submit</button>
                <button type="button" onClick={handleClear} className={styles.darkFont}>Clear</button>
              </div>
            </div>
          </Alert>}
      </div>
    );
  
}

export default ParseExcel