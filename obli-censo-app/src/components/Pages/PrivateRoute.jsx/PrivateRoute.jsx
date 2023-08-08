import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children, redirectTo }) => {
    const userLogged = useSelector((state) => state.user.userLogged);
    console.log(userLogged);
    if (userLogged) {
        return children
    } else {
        return <Navigate to={redirectTo} />
    }
}

export default PrivateRoute
