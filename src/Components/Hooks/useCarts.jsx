import { useContext } from "react";
import { AuthContext } from "../Secret/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useCarts = () => {
    const {user} = useContext(AuthContext)
    const url = `https://online-restaurant-server.vercel.app/carts?email=${user?.email}`

    const{data, isLoading, refetch}=useQuery({
        queryKey:['carts'],
        queryFn:()=>{
            return axios.get(url)
        }
    })

    const carts = data?.data;

    return {carts , isLoading, refetch}
};

export default useCarts;