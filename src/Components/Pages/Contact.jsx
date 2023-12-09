import Cover from "../SharedComponents/Cover";
import banner from '../../assets/contact/banner.jpg'
import Heading from "../SharedComponents/Heading";
import { BsTelephone, BsClock } from 'react-icons/bs'
import { SlLocationPin } from 'react-icons/sl'
import Form from "../SharedComponents/Form";
import { Helmet } from "react-helmet-async";

const Contact = () => {
    return (
        <div>
            <Helmet><title>Contact Us</title></Helmet>
            <Cover img={banner} heading={'CONTACT US'} subHeading={'Would you like to try a dish?'} />
            <Heading heading={'OUR LOCATION'} subheading={'---Visit Us---'} />
            <div className="grid grid-cols-1 lg:grid-cols-3 my-8 max-w-4xl mx-auto gap-9">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-[#D1A054] px-28 py-4 text-xl">
                        <BsTelephone />
                    </div>
                    <div className="w-56 h-32 border-2 shadow-xl max-w-sm">
                        <h1 className="text-center text-2xl font-semibold mt-5">Phone</h1>
                        <h1 className="text-center ">+880 12 3242 424</h1>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-[#D1A054] px-28 py-4 text-xl ">
                        <SlLocationPin />
                    </div>
                    <div className="w-56 h-32 border-2 shadow-xl">
                        <h1 className="text-center text-2xl font-semibold mt-5">Address</h1>
                        <h1 className="text-center text-sm">Bashbari road, Mohammapur, Dhaka</h1>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-[#D1A054] px-28 py-4 text-xl">
                        <BsClock />
                    </div>
                    <div className="w-56 h-32 border-2 shadow-xl ">
                        <h1 className="text-center text-2xl font-semibold mt-5">WORKING HOURS</h1>
                        <h1 className="text-center ">10AM to 12am sun to wed</h1>
                        <h1 className="text-center "> 4PM to 8pm sat to Fri</h1>
                    </div>
                </div>
            </div>
            <Heading heading={'CONTACT FORM'} subheading={'---Send Us a Message---'}/>
            <Form />
        </div>
    );
};

export default Contact;