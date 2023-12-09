import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useReviews = () => {
    const {data : reviews =[]}= useQuery({
        queryKey :['reviews'],
        queryFn: async()=>{
            const res = await axios.get('https://online-restaurant-server.vercel.app/review')
            return res.data
        }
    })
    return {reviews}
};

export default useReviews;