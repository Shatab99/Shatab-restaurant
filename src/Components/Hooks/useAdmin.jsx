import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Secret/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";


const useAdmin = () => {
   const {user} = useContext(AuthContext)
   const axiosSecure = useAxiosSecure()
   const{data : isAdmin, isLoading:loading } = useQuery({
    queryKey : ['admins'],
    queryFn : async() =>{
        const res  = await axiosSecure.get(`/users/${user.email}`)
        return res.data?.admin;
    }
   })
   return [isAdmin, loading]
};

export default useAdmin;
