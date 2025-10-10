import { ClerkProvider } from "@clerk/react-router"
import { BrowserRouter, Route, Routes } from "react-router"
import SignedInPermission from "./permissions/SignedInPermission"
import AppShell from "../components/layout/AppShell/AppShell"
import HomePage from "../components/Home/HomePage"
import Root from "../pages/specials/Root"
import InventoryUpload from "../components/ExceltoPdf/pages/InventoryUpload"
import PdfDownload from "../components/ExceltoPdf/pages/PdfDownload"
import FourOhFour from "../pages/specials/Fours"
import NegativeInventory from "../components/negativeInventory/page/NegativeInventory"
import SupplierPage from "../components/supplier/page/SupplierPage"

function Routing() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}> 
        <Routes>
          {/* Sign in upon entering website */}
          <Route path="/" element={<Root />} />
          {/* Must be Signed in to use this app, All routes must sit in here other than the root/true home */}
          <Route element={ <SignedInPermission /> }>
            {/* Layout */}
            <Route element={<AppShell />}>

              {/* True Home */}
              <Route path="/home" element={<HomePage />} />

              {/* Inventory conversion paths */}
              <Route path="/inventory-upload" element={<InventoryUpload />} />
              <Route path="/pdf-download" element={<PdfDownload />} />

              <Route path="/negative-inventory" element={<NegativeInventory /> }/>

              <Route path="/suppliers" element={<SupplierPage />} />

              <Route path="*" element={<FourOhFour />} />
              
            </Route>
          </Route>
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  )
}

export default Routing
