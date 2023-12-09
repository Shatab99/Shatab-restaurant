import { Link, useLocation, useNavigate } from 'react-router-dom';
import authImg from '../../assets/others/authentication.png'
import authImg1 from '../../assets/others/authentication2.png'
import { AiOutlineHome } from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../Secret/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const SignUp = () => {
    const { createUser } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm()

    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(res => {
                updateProfile(res.user, {
                    displayName: data.name
                })
                    .then(res => {
                        console.log("Signed Up", res.user)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })

                const userInfo = {
                    name : data.name, 
                    email: data.email 
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    if(res.data.insertedId){
                        console.log(res.data)
                        Swal.fire({
                            title: "Well Done !",
                            text: "Successfully Created Account",
                            icon: "success"
                        });
                        navigate(location?.state ? location?.state : '/')
                        reset();
                    }
                })
            })
            .catch(error => {
                console.log(error.message)
                Swal.fire({
                    title: "Opps !!",
                    text: `${error.message}`,
                    icon: "error"
                });
            })

    }




    return (
        <div className='py-10 '>
            <div className="hero w-3/4 mx-auto lg:h-screen shadow-2xl" style={{ backgroundImage: `url(${authImg})` }}>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-5xl p-12 flex flex-col lg:flex-row-reverse items-center justify-center">
                        <div className='flex flex-col-reverse lg:flex-col items-center'>
                            <img src={authImg1} alt="" />
                            <Link to={'/'}>
                                <AiOutlineHome className='text-black text-4xl hover:text-red-800' />
                            </Link>
                        </div>
                        <div className='flex flex-col items-center gap-y-8'>
                            <h1 className='text-3xl text-center font-semibold text-black'>Sign Up</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 text-black'>
                                <input type="text" {...register('name', { required: true })} placeholder="Enter Name " className="input input-bordered w-full max-w-xs" />
                                {errors.name && <span className='text-red-500'>Name is required</span>}
                                <input type="email" {...register('email')} placeholder="Enter Email " className="input input-bordered w-full max-w-xs" />
                                <input type="password" {...register('password', {
                                    required: true,
                                })} placeholder="Enter password " className="input input-bordered w-full max-w-xs" />
                                {errors.password?.type === 'required' && <span className='text-red-500'>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500'>Password must be 6 Characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-500'>Password can not be more than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-500'>Password must contain A uppercase and a number</span>}

                                <input type="submit" value="Sign up" className='btn bg-[#D1A054B2] ' />
                            </form>
                            <p className='text-[#D1A054] text-sm'>Already Have Account ?<Link to={'/login'} className='font-semibold'> Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;