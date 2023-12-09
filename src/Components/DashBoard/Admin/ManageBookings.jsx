import Lottie from "lottie-react";
import useBooking from "../../Hooks/useBooking";
import Heading from "../../SharedComponents/Heading";
import { TiTick } from "react-icons/ti";
import loadingAnimation from "../../LoadingAnimaiton/Animation - Loading.json"
import axios from "axios";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { Helmet } from "react-helmet-async";


const ManageBookings = () => {

    const { bookings, isLoading, refetch } = useBooking()

    const Time = bookings.map(book =>{
        return parseInt(book.bookingTime)
    })
    console.log(Time)

    const handleSubmit = _id => {
        console.log(_id)
        axios.patch(`https://online-restaurant-server.vercel.app/booking/${_id}`, { status: 'confirm' })
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Booking Has Been Confirmed !",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
            })

    }

    const handleDelete = _id => {
        console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "before clear this history make sure that this customer has eaten in your restaurant !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            background: 'black',
            confirmButtonText: "Yes, I am sure!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://online-restaurant-server.vercel.app/booking/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "History Cleared!",
                            background: 'black',
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    }

    return (
        <div className="lg:p-5 max-w-xs lg:max-w-full mx-auto">
            <Helmet><title>Manage Booking</title></Helmet>
            <Heading heading={'BOOKINGS'} subheading={'---At a Glance!---'} />
            <div className="overflow-x-auto">
                <table className="table table-zebra ">
                    {/* head */}
                    <thead className="bg-[#D1A054] text-white ">
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Phone Number</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                            <th>Activity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ?
                                <div className="max-w-xs ">
                                    <Lottie animationData={loadingAnimation} />
                                </div>
                                :
                                bookings.map((book, index) => <>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{book.name}</td>
                                        <td>{book.email}</td>
                                        <td>{book.phone}</td>
                                        <td>{book.bookingDate}</td>
                                        <td>
                                            {
                                                Time > 12  ? 
                                                `${Time-12 < 10 ? '0' : ''}${Time-12} : ${book.bookingTime.slice(3,5)} PM` 
                                                :
                                                `${book.bookingTime} AM`
                                            }
                                        </td>
                                        {
                                            book.status === 'confirm' ?
                                                <td>
                                                    Confirmed
                                                </td>
                                                :
                                                <td>
                                                    pending
                                                </td>
                                        }
                                        <td>
                                            {
                                                book.status === 'confirm' ?
                                                    <button onClick={() => handleDelete(book._id)} className="btn btn-circle bg-red-800">
                                                        <MdDeleteForever className="text-2xl text-white hover:text-black" />
                                                    </button>
                                                    :
                                                    <button onClick={() => handleSubmit(book._id)} className="btn btn-circle bg-green-700">
                                                        <TiTick className="text-3xl text-white hover:text-black" />
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                </>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;