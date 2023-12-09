import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Featured from "./Featured";
import OrderOutline from "./OrderOutline";
import PopularMenu from "./PopularMenu";
import Testimonials from "./Testimonials";



const Home = () => {
    return (
        <div className="max-w-xs md:max-w-lg lg:max-w-full mx-auto">
            <Helmet><title>Home</title></Helmet>
            <Banner/>
            <OrderOutline/>
            <PopularMenu/>
            <Featured/>
            <Testimonials/>
        </div>
    );
};

export default Home;