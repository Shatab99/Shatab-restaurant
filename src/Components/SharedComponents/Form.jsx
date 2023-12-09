import axios from 'axios';
import { LiaTelegramPlane } from 'react-icons/lia'
import Swal from 'sweetalert2';

const Form = () => {

    const handleContact = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;
        const contactForm = {
            name, email, phone, message
        }
        console.log(contactForm)
        axios.post('https://online-restaurant-server.vercel.app/feedback', contactForm)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your feedback send ! Thank You ❤",
                    showConfirmButton: false,
                    timer: 2000
                });
                form.reset();
            })

    }

    return (
        <div>
            <form onSubmit={handleContact} className=" max-w-4xl mx-auto  p-12  my-10 bg-slate-300 rounded-lg space-y-8">
                <div className="flex items-center justify-between gap-4 ">
                    <input name='name' type="text" placeholder="Your name" className="input input-bordered input-warning w-full " required />
                    <input name='email' type="email" placeholder="Enter Email" className="input input-bordered input-warning w-full " required />
                </div>
                <div>
                    <input name='phone' type="tel" placeholder="Enter Phone Number" className="input input-bordered input-warning w-full " required />
                </div>
                <textarea name='message' placeholder="Your Message " className="textarea textarea-bordered textarea-lg w-full" required></textarea>
                <div className="flex justify-center ">
                    <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] border-0 text-white">Send message <LiaTelegramPlane className='text-xl' /></button>
                </div>
            </form>
        </div>
    );
};

export default Form;