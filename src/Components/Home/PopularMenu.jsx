// import { useEffect, useState } from "react";
import Heading from "../SharedComponents/Heading";
import MenuCards from "../SharedComponents/MenuCards";
import useMenu from "../Hooks/useMenu";
import { Link } from "react-router-dom";
import loadingAnimation from "../LoadingAnimaiton/Animation - Loading.json";
import Lottie from "lottie-react";


const PopularMenu = () => {

    const [menu, loading] = useMenu() //used custom hook


    const popular = menu.filter(item => item.category === 'popular')

    return (
        <div className="max-w-4xl mx-auto">
            <Heading subheading={'---Check it out---'} heading={'FROM OUR MENU'} />
            {
                loading ? <div className="flex justify-center my-16">
                    <Lottie animationData={loadingAnimation} />
                </div>
                    :
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {
                            popular.map(item => <MenuCards key={item._id} item={item} />)
                        }
                    </div>
            }
            <div className="flex justify-center">
                <Link to={'/menu'} className="border-b-4 border-black rounded-b-lg p-3 hover:bg-gray-100 rounded-lg">Check Our Menu</Link>
            </div>
        </div>
    );
};

export default PopularMenu;