import { useContext } from "react";
import { AuthContext } from "../Secret/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const usePaymentHistory = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure= useAxiosSecure()
    const {data : payments = [], isLoading} = useQuery({
        queryKey :['payments'],
        queryFn : async() =>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })
    return {payments, isLoading}
};

export default usePaymentHistory;