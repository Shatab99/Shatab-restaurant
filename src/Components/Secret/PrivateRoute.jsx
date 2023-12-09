import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import loadingAnimation from '../LoadingAnimaiton/Animation - Loading.json'
import Lottie from "lottie-react";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <div className="flex justify-center my-16">
            <Lottie animationData={loadingAnimation} />
        </div>
    }
   
   
    if(user){
        return children;
    }

    return <Navigate  state={location.pathname}  to={'/login'}  replace/>
};

export default PrivateRoute;