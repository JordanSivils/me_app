import { Outlet } from "react-router";
import Loading from "../../components/UI/loading/Loading";
import Unauthorized from "../../pages/specials/Unauthorized";
import { useRoles } from "./parseRoll"

const ManagerWrapper = () => {
    const { hasAny, isLoaded, isSignedIn } = useRoles();

    if (!isLoaded) return <Loading />
    if (!isSignedIn || !hasAny(["manager", "admin", "dev", "owner"])) return <Unauthorized />
    return (
        <Outlet />
    )
}

export default ManagerWrapper;