import { loadStripe } from "@stripe/stripe-js";
import Heading from "../SharedComponents/Heading";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Helmet } from "react-helmet-async";

//Todo , take the publishable key from the site 
const stripePromise = loadStripe('pk_test_51OFunvLooRhoamnLgVy5lbLUPJnhd7LIsPKufKC8DQUJeXgJutEQcHRRApdqjdSLoqTvrxabuKHbIyCmhPnXSMNd00iIaN0Njx')

const Payment = () => {
    return (
        <div className="mx-auto">
            <Helmet><title>Payments</title></Helmet>
            <Heading heading={'Add Payment'} subheading={'---Please Pay---'}/>
            <Elements stripe={stripePromise}>
                <CheckOutForm/>
            </Elements>
        </div>
    );
};

export default Payment;