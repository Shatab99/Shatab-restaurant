import axios from "axios";



const axiosPublic = axios.create({
    baseURL: 'https://online-restaurant-server.vercel.app'
})

const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;