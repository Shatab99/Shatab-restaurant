import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Secret/AuthProvider";


const useUsers = () => {
    const {user}= useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data : users=[], refetch , isLoading}=useQuery({
        queryKey:['users'],
        queryFn : async()=>{
            const res = await axiosSecure.get(`/users/email?email=${user.email}`)
            return res.data;
        }
    })
    return {users,refetch, isLoading }
};

export default useUsers;