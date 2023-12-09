import { useLoaderData } from "react-router-dom";
import Heading from "../../SharedComponents/Heading";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_Hosting_key = '3a084d22138a9ac23ba538ec26d5bff2';
const img_Hosting_api = `https://api.imgbb.com/1/upload?key=${img_Hosting_key}`

const UpdateItems = () => {
    const { name, price, recipe, category, _id } = useLoaderData()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const imgFile = { image: data.image[0] };
        console.log(imgFile.image)

        if (imgFile.image === undefined) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must Choose an Image First!",
            });
        }


        const res = await axiosPublic.post(img_Hosting_api, imgFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                image: res.data.data.display_url,
                price: parseFloat(data.price),
                recipe: data.recipe
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes)
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Item  Updated Successfully ! ",
                    background: 'black',
                    icon: 'success',
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



    };
    return (
        <div className=" ">
            <Helmet><title>Update Items</title></Helmet>
            <InfiniteScroll dataLength={5} height={600} className="py-4 px-12">
                <div>
                    <Heading subheading={`${name}`} heading={'Update'} />
                </div>

                <div className="mx-auto  ">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 w-full rounded-2xl bg-slate-200 p-12  ">
                        <input type="text" {...register('name')} defaultValue={name} placeholder="Food Name" className="input input-bordered w-full max-w-full " />
                        <div className="flex flex-col lg:flex-row items-center gap-2">
                            <select defaultValue={category} {...register('category')} className="select select-bordered w-full ">
                                <option disabled selected>Select A Category</option>
                                <option value={'salad'}>Salad</option>
                                <option value={'soup'}>Soup</option>
                                <option value={'pizza'}>Pizza</option>
                                <option value={'desserts'}>Desserts</option>
                                <option value={'drinks'}>Drinks</option>
                            </select>
                            <input defaultValue={price} type="text" {...register('price')} placeholder="Price" className="input input-bordered w-full max-w-xs" />
                        </div>
                        Receipe*
                        <textarea defaultValue={recipe} {...register('recipe')} placeholder="Enter Receipe Details" className="textarea textarea-bordered textarea-lg w-full " ></textarea>
                        <input type="file" {...register('image')} className="file-input w-full max-w-xs" />
                        <div className="flex justify-center">
                            <button className="btn bg-[#7B3F00] text-white hover:text-black">Update Items <FaUtensils /></button>
                        </div>
                    </form>
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default UpdateItems;