import demo from '../../assets/others/profile.png'
import Heading from "../SharedComponents/Heading";
import usePaymentHistory from "../Hooks/usePaymentHistory";
import useUsers from "../Hooks/useUsers";
import { FaStar,FaCalendarAlt,FaWallet } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import useReviews from '../Hooks/useReviews';
import { useContext } from 'react';
import { AuthContext } from '../Secret/AuthProvider';
import { Helmet } from 'react-helmet-async';
import useCarts from '../Hooks/useCarts';
import useBooking from '../Hooks/useBooking';


const UserHome = () => {

    const {users} = useUsers()
    const {user} = useContext(AuthContext)
    const {payments }= usePaymentHistory()
    const {reviews} = useReviews() 
    const {carts} = useCarts()
    const {bookings} = useBooking()
    
    const review = reviews.filter(item => item.email === user.email)
    const booking = bookings.filter(item => item.email === user.email)

    console.log(bookings)


    return (
        <div className='p-5'>
            <Helmet><title>Dasboard | User Home</title></Helmet>
            <Heading heading={`Welcome Back ${users[0]?.name}`} />
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className='flex flex-col items-center bg-[#FFEDD5] p-12'>
                    {users[0]?.image ? <img src={users[0]?.image} alt="" className='w-32 h-32 rounded-full'/> : <img src={demo}/>}
                    <p className='text-lg font-semibold  '>{users[0]?.name}</p>
                    <p>{users[0]?.email}</p>
                </div>
                <div className='bg-[#FEF9C3] p-12 flex-grow'>
                    <h1 className='text-2xl font-semibold'>Your Activities</h1>
                    <p className='flex items-center gap-1 font-semibold text-[#0088FE]'><FaCartShopping /> Orders : {carts.length ? carts.length : '0'}</p>
                    <p className='flex items-center gap-1 font-semibold text-[#00C4A1]'><FaStar /> Reviews : {review.length ? review.length :'0'}</p>
                    <p className='flex items-center gap-1 font-semibold text-[#FFBB28]'><FaCalendarAlt /> Booking : {booking.length ? booking.length : '0'}</p>
                    <p className='flex items-center gap-1 font-semibold text-[#FF8042]'><FaWallet /> Payments : {payments.length ? payments.length : '0'}</p>
                </div>
            </div>
        </div>
    );
};

export default UserHome;