import { Helmet } from "react-helmet-async";
import Cover from "../SharedComponents/Cover";
import menuimg from '../../assets/menu/banner3.jpg'
import pizzaimg from '../../assets/menu/pizza-bg.jpg'
import soupimg from '../../assets/menu/soup-bg.jpg'
import saladimg from '../../assets/menu/salad-bg.jpg'
import dessertimg from '../../assets/menu/dessert-bg.jpeg'
import Heading from "../SharedComponents/Heading";
import useMenu from "../Hooks/useMenu";
import MenuCat from "../SharedComponents/MenuCat";
import FoodCover from "../SharedComponents/FoodCover";
import { Link } from "react-router-dom";
import loadingAnimation from '../LoadingAnimaiton/Animation - Loading.json'
import Lottie from "lottie-react";

const Menu = () => {

    const [menu, loading] = useMenu()

    const offers = menu.filter(item => item.category === 'offered')
    const pizza = menu.filter(item => item.category === 'pizza')
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')

    

    return (
        <div>
            <Helmet><title>Menu</title></Helmet>
            <Cover img={menuimg} heading={'OUR MENU'} subHeading={'Would you like to try a dish?'} />
            <Heading heading={`TODAY'S OFFER`} subheading={`---Don't miss---`} />
            {
                loading ? <div className="flex justify-center my-16">
                    <Lottie animationData={loadingAnimation} />
                </div> : <MenuCat items={offers} />
            }
            <div className="flex justify-center">
                <Link to={`/shop/popular`} className="btn bg-[#111827] text-[#BB8506] hover:border-b-[#BB8506] hover:border-b-4">order your favourite food</Link>
            </div>


            <FoodCover img={pizzaimg} heading={'PIZZA'} subHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
            {
                loading ? <div className="flex justify-center my-16">
                    <Lottie animationData={loadingAnimation} />
                </div> : <MenuCat items={pizza} />
            }
            <div className="flex justify-center">
                <Link to={`/shop/pizza`} className="btn bg-[#111827] text-[#BB8506] hover:border-b-[#BB8506] hover:border-b-4">order your favourite food</Link>
            </div>

            <FoodCover img={dessertimg} heading={'DESSERTS'} subHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
            {
                loading ? <div className="flex justify-center my-16">
                    <Lottie animationData={loadingAnimation} />
                </div> : <MenuCat items={dessert} />
            }
            <div className="flex justify-center">
                <Link to={`/shop/dessert`} className="btn bg-[#111827] text-[#BB8506] hover:border-b-[#BB8506] hover:border-b-4">order your favourite food</Link>
            </div>


            <FoodCover img={soupimg} heading={'SOUP'} subHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
            {
                loading ? <div className="flex justify-center my-16">
                    <Lottie animationData={loadingAnimation} />
                </div> : <MenuCat items={soup} />
            }
            <div className="flex justify-center">
                <Link to={`/shop/soup`} className="btn bg-[#111827] text-[#BB8506] hover:border-b-[#BB8506] hover:border-b-4">order your favourite food</Link>
            </div>


            <FoodCover img={saladimg} heading={'SALAD'} subHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
            {
                loading ? <div className="flex justify-center my-16">
                    <Lottie animationData={loadingAnimation} />
                </div> : <MenuCat items={salad} />
            }
            <div className="flex justify-center">
                <Link to={`/shop/salad`} className="btn bg-[#111827] text-[#BB8506] hover:border-b-[#BB8506] hover:border-b-4">order your favourite food</Link>
            </div>


        </div>
    );
};

export default Menu;