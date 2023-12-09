import { useQuery } from "@tanstack/react-query";
import Heading from "../../SharedComponents/Heading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loadingAnimation from "../../LoadingAnimaiton/Animation - Loading.json"
import { Helmet } from "react-helmet-async";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${user.name} is Admin now `,
                        showClass: {
                            popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                        },
                        hideClass: {
                            popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                        }
                    });
                }
            })
    }

    const handleDelete = user => {
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
                axiosSecure.delete(`/carts/${user._id}`);
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
        <div className="lg:p-5 mx-auto max-w-xs lg:max-w-full">
            <Helmet><title>All Users</title></Helmet>
            <Heading heading={'All Users'} />
            <h1>Total Users :{users.length} </h1>
            <div className="overflow-x-auto ">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? 
                            <div className="max-w-xs mx-auto">
                                <Lottie animationData={loadingAnimation}/>
                            </div>
                            :
                                users.map((user, index) => <>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn bg-blue-950 text-white hover:text-black"><RiAdminLine className="text-2xl" /></button>}
                                        </td>
                                        <td>{
                                            user.role === 'admin' ? <button disabled onClick={() => handleDelete(user)} className="btn bg-red-800 text-white hover:text-black"><MdOutlineDeleteOutline className="text-2xl" /></button> :
                                                <button onClick={() => handleDelete(user)} className="btn bg-red-800 text-white hover:text-black"><MdOutlineDeleteOutline className="text-2xl" /></button>
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

export default AllUsers;