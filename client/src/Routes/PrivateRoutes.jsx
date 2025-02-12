import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";



const PrivateRoutes = ({ children }) => {
    // const { user, loading } = useContext(AuthContext);
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoutes;