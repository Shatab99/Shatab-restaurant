import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useFeedBacks = () => {
   const {data : feedbacks =[], isLoading, refetch}=useQuery({
    queryKey : ['feedbacks'],
    queryFn : async()=>{
        const res = await axios.get('https://online-restaurant-server.vercel.app/feedback')
        return res.data
    }
   })
   return {feedbacks, isLoading,refetch }
};

export default useFeedBacks;