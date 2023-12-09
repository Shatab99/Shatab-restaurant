import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://online-restaurant-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;