import ParseExcel from '../ParseExcel';
import UploadDirections from '../UploadDirections';

const InventoryUpload = () => {
    return (
      <div className="inventory-container">
        <ParseExcel />
        <UploadDirections />
      </div>
    );
  }

  export default InventoryUpload