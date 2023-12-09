import Heading from "../SharedComponents/Heading";
import demo from '../../assets/others/profile.png'
import { useContext } from "react";
import { AuthContext } from "../Secret/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUsers from "../Hooks/useUsers";

const api_key = '3a084d22138a9ac23ba538ec26d5bff2';
const host_api = `https://api.imgbb.com/1/upload?key=${api_key}`

const Profile = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const {users} = useUsers()
    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = async(data) => {
        console.log(data)
        const imgFile = {image : data.image[0]}
        const res = await axiosPublic.post(host_api, imgFile,{
            headers :{
                'Content-Type' : 'multipart/form-data'
            }
        })
        console.log(res.data)
        if(res.data.success){
            const image ={
                image : res.data.data.display_url
            }
            const imageRes = await axiosSecure.patch(`/users?email=${user.email}`, image)
            console.log(imageRes.data)
            if (imageRes.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Dp Uploaded Successfully ! ",
                    background: 'black',
                    icon:'success',
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
                reset();
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto my-12">
            <Heading heading={'Your Profile'} />
            <div className=" flex flex-col-reverse items-center  lg:grid lg:grid-cols-3 gap-4">
                <div className="bg-slate-200 p-4 rounded-lg flex flex-col items-center gap-y-4">
                    <img src={demo} alt="" className="w-32 h-32 rounded-full" />
                    <h1>Here To Chose Your Dp</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                        <input type="file" {...register('image')} className="file-input file-input-warning file-input-bordered file-input-xs w-full max-w-xs mb-6" />
                        <button className="btn bg-red-900 text-white hover:text-black ">Upload Profile Picture</button>
                    </form>
                </div>
                <div className="col-span-2 p-4 shadow-2xl rounded-lg border-dashed border-2 flex flex-col items-center gap-5">
                    {users[0]?.image ? <img src={users[0]?.image} className="w-32 h-32"/> : <img src={demo} className="w-32 h-32"/>}
                    <p className="text-lg font-semibold">{user?.displayName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;