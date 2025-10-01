import { useForm } from "react-hook-form"
import { FileUploadSchema, type FileUpload } from "./uploadType"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { fileUpload } from "../../api/post"
import styles from  "./FileForm.module.css"

const FileForm = () => {
    const { register, handleSubmit, reset } = useForm<FileUpload>({
        resolver: zodResolver(FileUploadSchema)
    })
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = async (data: FileUpload) => {
        if (submitting) return

        const file = data.file?.[0]
        if (!file) {
            setErrorMessage("Please select an excel file");
            return
        }

        const formData = new FormData();
        formData.append("file", file)

        setSubmitting(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = await fileUpload(`/upload/products`, formData)

            if (!result.ok) {
                setErrorMessage(result.message || "Unkown Error")
            } else {
                setSuccessMessage("Success, Exit to close")
                reset
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.fileFormContainer}>
            <h4>Uplaod Inventory</h4>
            <input 
            type="file" 
            {...register("file")}
            accept=".xlsx"
            disabled={submitting}
            />

            <button type="submit" disabled={submitting} className={styles.fileFormBtn}>
                {submitting ? "Uploading" : "Upload File"}
            </button>

            {errorMessage ?? <p className={styles.errTxt}>{errorMessage}</p>}
            {successMessage ?? <p>{successMessage}</p>}
        </form>
    )
}

export default FileForm