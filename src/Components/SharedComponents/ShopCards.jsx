import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Secret/AuthProvider";
import useCarts from "../Hooks/useCarts";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const ShopCards = ({ items }) => {
    const {user} = useContext(AuthContext)
    const {refetch} = useCarts()
    const axiosSecure = useAxiosSecure()
    
    const handleAddToCart = (food) => {
        const cid = food._id;
        const name= food.name;
        const image= food.image;
        const recipe=food.recipe;
        const price=food.price;
        const useremail= user?.email;

        const carts = {name , image, recipe , price,useremail, cid }

        axiosSecure.post('/carts', carts)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    title: "Well Done",
                    text: "Successfully Added to Carts",
                    icon: "success"
                });
                refetch();
            })
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
            {
                items.map(item => <>
                    <div className="flex flex-col items-center justify-center gap-y-2 border-2 p-3 rounded-2xl shadow-xl">
                        <img src={item.image} alt="" />
                        <div className="space-y-2 flex-grow mb-5">
                            <h1 className="text-lg font-semibold text-center">{item.name}</h1>
                            <p className="text-sm text-[#737373]">{item.recipe}</p>
                        </div>
                        <button onClick={() => handleAddToCart(item)} className="btn bg-[#111827] text-[#BB8506] hover:border-b-[#BB8506] hover:border-b-4">Add to cart (${item.price})</button>
                    </div>
                </>)
            }
        </div>
    );
};

export default ShopCards;