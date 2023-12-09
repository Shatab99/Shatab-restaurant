import { Link } from "react-router-dom";
import {  AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import { PiShoppingCartSimpleBold } from 'react-icons/pi'
import { MdReviews } from 'react-icons/md'
import { FaClipboardList, FaUsers,  FaUtensils } from 'react-icons/fa';
import { FaClipboardUser } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { GiHamburgerMenu } from 'react-icons/gi'
import useCarts from "../Hooks/useCarts";
import useAdmin from "../Hooks/useAdmin";
import Lottie from "lottie-react";
import loadingNavDash from '../../Components/LoadingAnimaiton/Animation-sideNavbar.json'


const NavDash = ({children}) => {
    const { carts } = useCarts()
    const [isAdmin, isLoading] = useAdmin()

    if(isLoading){
        return <div className="max-w-xs absolute top-0"><Lottie animationData={loadingNavDash}/></div>
    }

    return (
        <>
            <div className="relative z-10 lg:z-0">
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer-2" className="text-3xl drawer-button absolute -top-11 left-3  lg:hidden text-white"><GiHamburgerMenu /></label>
                        {children}

                    </div>
                    <div className="drawer-side  ">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-[#F7E3BD] text-base-content">
                            {/* Sidebar content here */}
                            <h1 className="text-2xl font-semibold mb-8 font-girassol">Shatab's Restaurent</h1>
                            {
                                isAdmin ? <>
                                    <li><Link to={'/dashboard/adminhome'}><AiOutlineHome className="text-xl" /> Admin Home</Link></li>
                                    <li><Link to={'/dashboard/additems'}><FaUtensils className="text-xl" />Add Items</Link></li>
                                    <li><Link to={'/dashboard/manageitems'}><PiShoppingCartSimpleBold className="text-xl" />Manage Items</Link></li>
                                    <li><Link to={'/dashboard/managebooking'}><MdReviews className="text-xl" />Manage Bookings</Link></li>
                                    <li><Link to={'/dashboard/allusers'}><FaUsers className="text-xl" />All Users</Link></li>
                                    <li><Link to={'/dashboard/feedback'}><FaClipboardUser className="text-xl" />User Feedbacks</Link></li>
                                </> :
                                    <>
                                        <li><Link to={'/dashboard/userhome'}><AiOutlineHome className="text-xl" /> User Home</Link></li>
                                        <li><Link to={'/dashboard/carts'}><PiShoppingCartSimpleBold className="text-xl" /> My Cart ({carts?.length})</Link></li>
                                        <li><Link to={'/dashboard/reviews'}><MdReviews className="text-xl" />Add Review</Link></li>
                                        <li><Link to={'/dashboard/bookings'}><FaClipboardList className="text-xl" />Bookings</Link></li>
                                        <li><Link to={'/dashboard/paymenthistory'}><MdOutlinePayment className="text-xl" />Payment History</Link></li>

                                    </>
                            }
                            <div className="divider"></div>
                            <li><Link to={'/'}><AiFillHome className="text-xl" /> Home</Link></li>
                            <li><Link to={'/menu'}><MdOutlineMenuBook className="text-xl" /> Menu</Link></li>
                            <li><Link to={'/shop/salad'}><FiShoppingBag className="text-xl" /> Order Food</Link></li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
};

export default NavDash;