import { ClerkProvider } from "@clerk/react-router"
import { BrowserRouter, Route, Routes } from "react-router"
import SignedInPermission from "./permissions/SignedInPermission"
import Root from "./routes/root/Root"
import AppShell from "../components/layout/AppShell/AppShell"
import HomePage from "../components/Home/HomePage"

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


            </Route>
          </Route>
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  )
}

export default Routing
