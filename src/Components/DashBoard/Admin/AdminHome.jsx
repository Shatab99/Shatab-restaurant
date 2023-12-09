import { useContext } from "react";
import Heading from "../../SharedComponents/Heading";
import { AuthContext } from "../../Secret/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaWallet } from "react-icons/fa6";
import { PiUsersThreeLight } from "react-icons/pi";
import { IoFastFoodSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import PieChartAdmin from "./PieChartAdmin";
import InfiniteScroll from "react-infinite-scroll-component";
import { ImDiamonds } from "react-icons/im";
import Lottie from "lottie-react";
import loadingAnimation from '../../LoadingAnimaiton/Animation - Loading.json'
import { Helmet } from "react-helmet-async";





const AdminHome = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: stats = [], isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })
    console.log(stats)
    if (isLoading) {
        return <div className="max-w-xs mx-auto">
            <Lottie animationData={loadingAnimation}/>
        </div>
    }

    return (
        <div className="max-w-xs mx-auto lg:max-w-full ">
  
            <InfiniteScroll dataLength={10} next={stats} height={600} className={`p-2 `}>
                {/* <RemoveScrollBar/> */}
                <Helmet><title>DashBoard | Admin Home</title></Helmet>
                <Heading heading={`Welcome ${user?.displayName}`} />
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                    <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF]  rounded-lg flex items-center gap-5 px-12 py-4">
                        <FaWallet className="text-2xl text-white" />
                        <div>
                            <p className="text-white font-semibold text-xl">${stats.revenue}</p>
                            <h1 className="text-white font-semibold">Revenue</h1>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]  rounded-lg flex items-center gap-5 px-12 py-4">
                        <PiUsersThreeLight className="text-3xl text-white" />
                        <div>
                            <p className="text-white font-semibold text-xl">{stats.user}</p>
                            <h1 className="text-white font-semibold">Customers</h1>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#FE4880] to-[#FECDE9]  rounded-lg flex items-center gap-5 px-12 py-4">
                        <IoFastFoodSharp className="text-3xl text-white" />
                        <div>
                            <p className="text-white font-semibold text-xl">{stats.menuItems}</p>
                            <h1 className="text-white font-semibold">Products</h1>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]  rounded-lg flex items-center gap-5 px-12 py-4">
                        <TbTruckDelivery className="text-3xl text-white" />
                        <div>
                            <p className="text-white font-semibold text-xl">{stats.order}</p>
                            <h1 className="text-white font-semibold">Orders</h1>
                        </div>
                    </div>
                </div>
                <div className="flex mt-12 lg:mt-0 flex-col-reverse lg:flex-row justify-center items-center lg:gap-48">
                    <PieChartAdmin />
                    <div className="flex  lg:flex-col gap-2 font-semibold ">
                        <p className="flex items-center gap-2 text-[#0088FE]"><ImDiamonds />Dessert</p>
                        <p className="flex items-center gap-2 text-[#00C49F]"><ImDiamonds />Pizza</p>
                        <p className="flex items-center gap-2 text-[#FFBB28]"><ImDiamonds />Salad</p>
                        <p className="flex items-center gap-2 text-[#FF8042]"><ImDiamonds />Soup </p>
                        <p className="flex items-center gap-2 text-[#D62728]"><ImDiamonds />Drinks </p>
                        <p className="flex items-center gap-2 text-[#C54EF6]"><ImDiamonds />Popular </p>
                    </div>
                </div>
            </InfiniteScroll>

        </div>
    );
};

export default AdminHome;