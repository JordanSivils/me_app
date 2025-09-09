type AlertProps = {
    kind: "error" | "success" | "info"
    children: React.ReactNode
}

const Alert = ({ kind, children }: AlertProps) => {
    const color = kind === "error" ? "#fee2e2" : kind === "success" ? "#dcfce7" : "#e0f2fe";
    const border = kind === "error" ? "#ef4444" : kind === "success" ? "#16a34a" : "#0284c7";
    return (
        <div style={{ background: color, border: `1px solid ${border}`, padding: "1px 12px", borderRadius: 8, margin: "8px 0", color: "black" }}>
            {children}
        </div>
    )
}

export default Alert