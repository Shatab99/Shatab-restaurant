import { Link, useLocation, useNavigate } from 'react-router-dom';
import authImg from '../../assets/others/authentication.png'
import authImg1 from '../../assets/others/authentication2.png'
import { AiOutlineHome } from 'react-icons/ai'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Secret/AuthProvider';
import { FcGoogle } from 'react-icons/fc'
import useAxiosPublic from '../Hooks/useAxiosPublic';

const LogIn = () => {

    const { loginUser, setGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleGoogle = () => {
        setGoogle()
            .then(res => {
                console.log(res.user)
                const userInfo = {
                    name: res.user?.displayName, email: res.user?.email
                }
                navigate(location?.state ? location?.state : '/')
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            navigate(location?.state ? location?.state : '/')
                        }
                    })

            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const captcha = form.captcha.value;
        console.log(email, password, captcha)
        if (validateCaptcha(captcha) == true) {
            loginUser(email, password)
                .then(res => {
                    console.log(res.user)
                    Swal.fire({
                        title: "Well Done",
                        text: "Successfully Logged In Account",
                        icon: "success"
                    });
                    form.reset();
                    navigate(location?.state ? location?.state : '/')
                })
                .catch(error => {
                    Swal.fire({
                        title: "Opps 🥺!",
                        text: `${error.message}`,
                        icon: "error"
                    });
                })
        }

        else {
            Swal.fire({
                title: "Opps !!",
                text: "Captha doesn't matched",
                icon: "error"
            });
        }
    }


    return (
        <div className='py-10 '>
            <div className="hero w-3/4 mx-auto lg:h-screen shadow-2xl" style={{ backgroundImage: `url(${authImg})` }}>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-5xl p-12 flex flex-col lg:flex-row items-center justify-center">
                        <div className='flex flex-col-reverse lg:flex-col  items-center'>
                            <img src={authImg1} alt="" />
                            <Link to={'/'}>
                                <AiOutlineHome className='text-black text-4xl hover:text-red-800' />
                            </Link>
                        </div>
                        <div className='flex flex-col items-center gap-y-8'>
                            <h1 className='text-3xl text-center font-semibold text-black'>Sign In</h1>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-5 text-black'>
                                <input type="email" name='email' placeholder="Enter Email " className="input input-bordered w-full max-w-xs" required />
                                <input type="password" name='password' placeholder="Enter password " className="input input-bordered w-full max-w-xs" required />
                                <div>
                                    <LoadCanvasTemplate />
                                </div>
                                <input type="text" name='captcha' placeholder="Enter Captcha " className="input input-bordered w-full max-w-xs" required />
                                <input type="submit" value="Sign in" className='btn bg-[#D1A054B2] w-full' />
                            </form>
                            <p className='text-[#D1A054] text-sm'>New Here ? <Link to={'/signup'} className='font-semibold'>Create New Account</Link></p>
                            <button onClick={handleGoogle}><FcGoogle className='text-4xl' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;