import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useBooking = () => {
   const {data: bookings =[], isLoading, refetch}=useQuery({
    queryKey:['bookings'],
    queryFn : async()=>{
        const res = await axios.get('https://online-restaurant-server.vercel.app/booking')
        return res.data
    }
   })
   return {bookings, isLoading, refetch}
};

export default useBooking;