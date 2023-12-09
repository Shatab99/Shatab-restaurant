import InfiniteScroll from "react-infinite-scroll-component";
import useCarts from "../Hooks/useCarts";
import Heading from "../SharedComponents/Heading";
import Lottie from "lottie-react";
import noAnimation from '../LoadingAnimaiton/no-data-animation.json'
import loadingAnimation from '../LoadingAnimaiton/Animation - Loading.json'
import { RiDeleteBinFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Carts = () => {

    const { carts, isLoading, refetch } = useCarts()
    const totolPrice = carts?.reduce((sum, item) => sum + item?.price, 0)

    console.log(carts);

    const axiosSecure = useAxiosSecure()

    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                refetch();
            }
        });
    }


    return (
        <div className="max-w-xs lg:max-w-full mx-auto">
            <Helmet><title>Your Carts</title></Helmet>
            <InfiniteScroll dataLength={10} next={carts} height={600} className="lg:p-5">
                <Heading heading={'WANT TO ADD MORE'} subheading={'--My Carts--'} />
                <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-16 items-center font-cinzel font-semibold">
                    <h1>Total Orders : {carts?.length}</h1>
                    <p>Total Price : $ {totolPrice} </p>
                    {
                        carts?.length ? <Link to={'/dashboard/payment'} >
                            <button className="btn bg-red-800 hover:text-black text-white">Procced to pay</button>
                        </Link> :
                            <button disabled className="btn bg-red-800 hover:text-black text-white">Procced to pay</button>
                    }
                </div>
                <div className="overflow-x-auto">
                    {
                        carts?.length === 0 ?
                            <div className="flex flex-col items-center">
                                <Lottie animationData={noAnimation} className="max-w-sm mx-auto" />
                                <p>No Cart Found 😐 !</p>
                            </div>
                            :
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name Of Food</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* rows */}
                                    {
                                        isLoading ?
                                            <div className="max-w-xs mx-auto p-24">
                                                <Lottie animationData={loadingAnimation} />
                                            </div>
                                            :
                                            carts?.map((cart, index) => <>
                                                <tr key={cart.cid}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={cart.image} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{cart.name}</div>
                                                                <div className="text-sm opacity-50">{cart.recipe}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="font-semibold text-lg">
                                                        ${cart.price}
                                                    </td>
                                                    <td><button onClick={() => handleDelete(cart._id)}><RiDeleteBinFill className="text-2xl text-red-800" /></button></td>
                                                </tr>
                                            </>)
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Carts;