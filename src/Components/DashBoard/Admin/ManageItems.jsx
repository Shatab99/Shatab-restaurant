import InfiniteScroll from "react-infinite-scroll-component";
import useMenu from "../../Hooks/useMenu";
import Heading from "../../SharedComponents/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from '../../LoadingAnimaiton/Animation - Loading.json'
import { Helmet } from "react-helmet-async";


const ManageItems = () => {
    const [menu, isLoading, refetch] = useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDelete = id => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${id}`)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <div className="mx-auto max-w-xs lg:max-w-full">
            <Helmet><title>Manage Items</title></Helmet>
            <InfiniteScroll dataLength={10} next={menu} height={600} className="px-12">
                <Heading heading={'Manage Items'} subheading={'Hurry Up'} />
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Food Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                isLoading ? 
                                <div className="max-w-xs">
                                    <Lottie animationData={loadingAnimation}/>
                                </div>
                                :
                                    menu.map((item, index) => <> <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.name}</div>
                                                    <div className="text-sm opacity-50">{item.recipe}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-semibold">
                                            ${item.price}
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/menu/${item._id}`} className="btn bg-green-900 text-white hover:text-black"><FaEdit className="text-lg" /></Link>
                                        </td>
                                        <th>
                                            <button onClick={() => handleDelete(item._id)} className="btn bg-red-800 text-white hover:text-black"><MdDelete className="text-xl" /></button>
                                        </th>
                                    </tr>
                                    </>)
                            }

                        </tbody>
                    </table>
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default ManageItems;