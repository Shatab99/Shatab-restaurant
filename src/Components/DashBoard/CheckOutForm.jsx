import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from '../Hooks/useAxiosSecure'
import useCarts from "../Hooks/useCarts";
import { useContext } from "react";
import { AuthContext } from "../Secret/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";


const CheckOutForm = () => {
    const stripe = useStripe();
    const { user } = useContext(AuthContext)
    const [transactionId, setTransactionId] = useState('')
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    const axiosSecure = useAxiosSecure()
    const { carts, refetch } = useCarts()
    const totalPrice = carts.reduce((total, item) => total + item.price, 0)
    const navigate = useNavigate()

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        //making payment methode
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('[error]', error)
            setError(error.message)
            setSuccess('')
        }
        else {
            console.log('[payment Method]', paymentMethod)
            setError('')
            setSuccess('Successfully Paid !')
        }

        //comfirm Payments
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log(confirmError)
        }
        else {
            console.log('Payment Intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log("Transaction Id : ", paymentIntent.id)
                setTransactionId(paymentIntent.id)

                //make payment History

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: carts.map(item => item._id),
                    menuIds: carts.map(item => item.cid),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment)
                console.log("Payment Saved ", res.data)
                refetch();
                if (res?.data?.paymentRes?.insertedId) {
                    Swal.fire({
                        title: "Done!",
                        text: "Your Payment Was Successfull",
                        imageUrl: "https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Custom image",
                        background: 'black'
                    });
                    elements.getElement(CardElement).clear();
                }
            }
        }


    }


    return (
        <form onSubmit={handleSubmit} className="p-8">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-wide bg-red-900 text-white hover:text-black my-6" type="submit" disabled={!stripe || !clientSecret}>
                Pay ($ {totalPrice})
            </button>
            <p className="font-semibold text-red-600">{error}</p>
            <p className="font-semibold text-green-600">{success}</p>
            {transactionId && <p className="font-semibold text-green-600">Your Transaction ID : <span className="text-red-800 font-bold">{transactionId}</span> . <br /> <Link className="text-blue-800 font-semibold" to={'/dashboard/paymenthistory'}>Go To Payment History !</Link></p>}
        </form>
    );
};

export default CheckOutForm;