import type { Supplier } from "../types/listResponse"

type EditSupplierDetailProps = {
    data: Supplier
}

const EditSupplierDetails = ({ data }: EditSupplierDetailProps) => {
    return(
        <div>
            <h4>
                under constuction
            </h4>
            <ul>
                <h4>{data.name}</h4>
                <li>{data.supplierDetails?.orderMinimum}</li>
            </ul>
        </div>
        
    )
}

export default EditSupplierDetails