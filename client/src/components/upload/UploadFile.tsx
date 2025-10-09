import { useForm } from "react-hook-form"
import { FileUploadSchema, type FileUpload } from "./uploadType"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { fileUpload } from "../../api/post"
import styles from  "./FileForm.module.css"
import { notify } from "../UI/toast"

type FileProps = {
    onSuccess: () => void
}
const FileForm = ({ onSuccess }: FileProps) => {
    const { register, handleSubmit, reset } = useForm<FileUpload>({
        resolver: zodResolver(FileUploadSchema)
    })
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (data: FileUpload) => {
        if (submitting) return

        const file = data.file?.[0]
        if (!file) {
            notify.error("Please select an excel file");
            return
        }

        const formData = new FormData();
        formData.append("file", file)

        setSubmitting(true);

        try {
            const result = await fileUpload(`/upload/products`, formData)

            if (!result.ok) {
                notify.error(result.message || "Unkown Error")
            } else {
                notify.success("Success!")
                reset()
                onSuccess?.()
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
        </form>
    )
}

export default FileForm