import Heading from "../SharedComponents/Heading";
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroll-component";
import loadingAnimation from '../LoadingAnimaiton/Animation - Loading.json'
import Lottie from "lottie-react";
import noAnimation from '../LoadingAnimaiton/no-data-animation.json'
import usePaymentHistory from "../Hooks/usePaymentHistory";


const PaymentHistory = () => {

    const {payments, isLoading} = usePaymentHistory()

    return (
        <div className="max-w-xs lg:max-w-full mx-auto">
            <Helmet><title>Payment History</title></Helmet>
            <InfiniteScroll dataLength={10} next={payments} height={600}>
                <Heading heading={`Payment History (${payments.length})`} subheading={'See Your Payments'} />

                {
                    payments.length === 0 ?
                        <div className="flex flex-col items-center">
                            <Lottie animationData={noAnimation} className="max-w-sm mx-auto" />
                            <p>No Transaction Found 😐 !</p>
                        </div>
                        :

                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Price</th>
                                        <th>Transaction Id</th>
                                        <th>Number Of foods Ordered</th>
                                        <th>Date</th>
                                        <th>Status Of Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ?
                                            <div className="max-w-xs mx-auto p-24">
                                                <Lottie animationData={loadingAnimation} />
                                            </div> :

                                            payments.map((payment, index) => <>
                                                <tr>
                                                    <th>{index + 1}</th>
                                                    <td className="font-semibold">${payment.price}</td>
                                                    <td>{payment.transactionId}</td>
                                                    <td className="text-center font-semibold">{payment.menuIds.length}</td>
                                                    <td>{payment.date.slice(0,10)}</td>
                                                    <td className="text-red-900 font-bold">{payment.status}</td>
                                                </tr>
                                            </>)
                                    }

                                </tbody>
                            </table>
                        </div>
                }

            </InfiniteScroll>

        </div>
    );
};

export default PaymentHistory;