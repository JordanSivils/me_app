import { PDFViewer } from "@react-pdf/renderer"
import { Navigate, useLocation } from "react-router"
import PdfDoc from "../PdfDoc"

type PdfState = {
    items: Array<{ 
        SKU: number | string
        Description: string
        Available: number
    }>
    meta?: {
        supplier?: string
        printedAtIso?: string
    }
}
const PdfDownload = () => {
    const { state } = useLocation() as { state?: PdfState}
    if (!state?.items) {
        return <Navigate to="/upload" replace />;
      }
    return (
        <PDFViewer style={{ width: "100%", height: "100%"}}>
            <PdfDoc 
            items={state.items}
            supplier={state.meta?.supplier}
            printedAtIso={state.meta?.printedAtIso}
            />
        </PDFViewer>
    )
}

export default PdfDownload