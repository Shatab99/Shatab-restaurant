import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from '../../Components/LoadingAnimaiton/Animation - Loading.json'


const AdminRoutes = ({children}) => {
    const {user, isLoading } = useContext(AuthContext)
    const [isAdmin, loading] = useAdmin()
    const location = useLocation()
    if(isLoading && loading ){
        return <div className="max-w-xs mx-auto">
            <Lottie animationData={loadingAnimation}/>
        </div>
    }

    if(user && isAdmin){
        return children
    }

    return <Navigate to={'/'} state={location.pathname} replace/>
};

export default AdminRoutes;