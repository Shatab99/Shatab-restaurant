import axios from "axios";
import Heading from "../SharedComponents/Heading";
import { FaBookReader } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../Secret/AuthProvider";



const Bookings = () => {
    const {user}= useContext(AuthContext)

    const handleBooking = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const guests = form.guests.value;
        const bookingTime = form.bookingTime.value;
        const bookingDate = form.bookingDate.value;
        const bookingForm = {
            name, email, phone, guests, bookingDate, bookingTime
        }
        console.log(bookingForm)
        axios.post('https://online-restaurant-server.vercel.app/booking', bookingForm)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    title: "Booking Confirmed!",
                    imageUrl: "https://media.tenor.com/S72N1icu9K8AAAAj/the-lind-hotels-thelindhotels.gif",
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                });
                form.reset();
            })

    }

    return (
        <div className="">
            <Helmet><title>Booking</title></Helmet>
            <Heading subheading={'---Reservation---'} heading={'BOOK A TABLE'} />
            <form onSubmit={handleBooking} className="flex flex-col px-5 mb-6 lg:px-16 gap-7">
                <div className="flex flex-col lg:flex-row items-center justify-center  gap-6">
                    <div className="space-y-2 w-full">
                        <p className="font-bold">Date*</p>
                        <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-full" name="bookingDate" required />
                    </div>
                    <div className="space-y-2 w-full">
                        <p className="font-bold" >Time*</p>
                        <input type="time" placeholder="Type here" className="input input-bordered w-full max-w-full" name="bookingTime" required />
                    </div>
                    <div className="space-y-2 w-full">
                        <p className="font-bold">Guest*</p>
                        <select className="select select-bordered w-full max-w-full" name="guests" required>
                            <option disabled selected>Select Persons</option>
                            <option>1</option>
                            <option>2</option>
                            <option>4</option>
                            <option>6</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center  gap-6">
                    <div className="space-y-2 w-full">
                        <p className="font-bold">Name*</p>
                        <input type="text" placeholder="Enter name" className="input input-bordered w-full max-w-full" name="name" required />
                    </div>
                    <div className="space-y-2 w-full">
                        <p className="font-bold">Phone*</p>
                        <input type="tel" placeholder="Phone Number" className="input input-bordered w-full max-w-full" name="phone" required />
                    </div>
                    <div className="space-y-2 w-full">
                        <p className="font-bold">Email*</p>
                        <input type="email" placeholder="Email" className="input input-bordered w-full max-w-full" name="email" defaultValue={user.email} required />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="flex gap-3 btn text-white btn-wide bg-gradient-to-r from-[#835D23] to-[#B58130]">Book a table <FaBookReader className="text-xl" /></button>
                </div>
            </form>
        </div>
    );
};

export default Bookings;