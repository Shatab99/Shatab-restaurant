import { Rating } from "@smastrom/react-rating";
import Heading from "../SharedComponents/Heading";
import { useState } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Secret/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const AddReviews = () => {
    const [rating, setRating] = useState(3);
    const { user } = useContext(AuthContext)


    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const likedRecipe = form.likedRecipe.value;
        const suggestion = form.suggestion.value;
        const details = form.details.value;
        const email = user?.email
        const name = user?.displayName
        const reviewForm = {
            likedRecipe,email, name, suggestion, details, rating
        }
        console.log(reviewForm)
        axios.post('https://online-restaurant-server.vercel.app/review', reviewForm)
            .then(res => {
                console.log(res)
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your review successfully posted !",
                    showConfirmButton: false,
                    timer: 2000
                });
                form.reset();
            })


    }

    return (
        <div className="p-12 mx-auto max-w-full">
            <Helmet><title>Add Reviews</title></Helmet>
            <Heading heading={'GIVE A REVIEW...'} subheading={'---Sharing is Caring!!!---'} />
            <form onSubmit={handleSubmit} className="flex flex-col  rounded-2xl p-8 bg-slate-200 w-full gap-5">
                <h1 className="text-2xl font-cinzel text-center">Rate Us</h1>
                <Rating
                    style={{ maxWidth: 180 }}
                    value={rating}
                    onChange={setRating}
                    className="mx-auto"
                />
                <div className="flex flex-col gap-3 ">
                    <p className="font-semibold ">Which recipe you liked most?</p>
                    <input name="likedRecipe" type="text" placeholder="Recipe you liked most" className="input input-bordered w-full max-w-full" />
                </div>
                <div className="flex flex-col gap-3 ">
                    <p className="font-semibold ">Do you have any suggestion for us?</p>
                    <input name="suggestion" type="text" placeholder="Sugggestion" className="input input-bordered w-full max-w-full" />
                </div>
                <div className="flex flex-col gap-3 ">
                    <p className="font-semibold ">Kindly express your care in a short way.</p>
                    <textarea name="details" placeholder="Review in detail" className="textarea textarea-bordered textarea-lg w-full max-w-full" ></textarea>
                </div>

                <div>
                    <button className="btn  bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
                        Send Review <BsFillRocketTakeoffFill className="text-lg" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddReviews;