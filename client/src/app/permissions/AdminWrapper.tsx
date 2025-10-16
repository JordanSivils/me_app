
import { Outlet } from "react-router";
import Loading from "../../components/UI/loading/Loading";
import { useRoles } from "./parseRoll";
import Unauthorized from "../../pages/specials/Unauthorized";

const AdminWrapper = () => {
    const { hasAny, isLoaded, isSignedIn } = useRoles();

    if (!isLoaded) return <Loading />
    if(!isSignedIn || !hasAny(["admin", "dev"])) return <Unauthorized />
    return (
        <Outlet />
    )
}

export default AdminWrapper