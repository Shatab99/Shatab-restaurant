import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Secret/AuthProvider";
import profile from '../../assets/others/profile.png'
import Swal from "sweetalert2";
import { BsCart3 } from 'react-icons/bs'
import useCarts from "../Hooks/useCarts";
import useUsers from "../Hooks/useUsers";
import useAdmin from "../Hooks/useAdmin";


const Navbar = ({ children }) => {

    const [sticky, setSticky] = useState('relative bg-[#E4A126] text-black font-semibold')
    const { user, logout } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const { carts } = useCarts()
    const { users } = useUsers()
    console.log(users)

    const handleLogOut = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            background: "#000000",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Log Out"
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                Swal.fire({
                    title: "Logged Out!",
                    text: "You are logged out from device",
                    background: "#000000",
                    icon: "success"
                });
            }
        });
    }

    const navItems = <>
        <li><Link>Home</Link></li>
        <li><Link to={'/contact'}>Contact Us</Link></li>
        {
            user && isAdmin ? <li><Link to={'/dashboard/adminhome'}>DashBoard</Link></li> :
                <li><Link to={'/dashboard/userhome'}>DashBoard</Link></li>
        }
        <li><Link to={'/menu'}>Our Menu</Link></li>
        <li><Link to={'/shop/salad'}>Our Shop</Link></li>
        {
            user && <li>
                <Link to={'/dashboard/carts'} className="text-xl">
                    <BsCart3 />
                    <div className="badge">{carts?.length}</div>
                </Link>
            </li>
        }
        {
            user ?
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {users[0]?.image ? <img src={users[0]?.image} alt="" /> :
                                <img src={profile} />
                            }
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black text-white hover:text-white rounded-box w-52">
                        <li>
                            <Link to={'profile'} className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li><button onClick={handleLogOut}>Logout</button></li>
                    </ul>
                </div> :

                <li><Link to={'/login'}>Sign In</Link></li>
        }
    </>

    useEffect(() => {
        window.addEventListener('scroll', stickNav)

        return () => {
            window.removeEventListener('scroll', stickNav)
        }
    }, [])


    const stickNav = () => {
        if (window !== undefined) {
            window.scrollY > 50 ? setSticky('fixed bg-opacity-30 bg-black text-white') : setSticky('relative bg-[#E4A126] text-black font-semibold')
        }
    }



    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className={`w-full navbar ${sticky} lg:z-10`}>
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-canzel font-semibold font-girassol">SHATAB'S <br /> Restaurant</div>
                    <div className="flex-none hidden  lg:block">
                        <ul className="menu menu-horizontal items-center">
                            {/* Navbar menu content here */}
                            {navItems}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                {children}
            </div>
            <div className={`drawer-side z-10 min-h-full`}>
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#F7E3BD] ">
                    {/* Sidebar content here */}
                    {
                        user ?
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex items-center gap-x-3">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            {users[0]?.image ? <img src={users[0]?.image} alt="" /> :
                                                <img src={profile} />
                                            }
                                        </div>
                                    </label>
                                    <Link to={'/dashboard/carts'} className="text-xl flex ">
                                        <BsCart3 />
                                        <div className="badge">{carts?.length}</div>
                                    </Link>
                                </div>
                                <div>
                                    <button onClick={handleLogOut} className="btn bg-red-800 text-white ">Log out </button>
                                </div>

                            </div> :

                            <Link to={'/login'} className="btn bg-red-800 text-white w-1/2 mb-5">Sign In</Link>
                    }
                    <li>
                        <Link to={'profile'} className="justify-between">
                            Profile
                        </Link>
                    </li>
                    <li><Link>Home</Link></li>
                    <li><Link to={'/contact'}>Contact Us</Link></li>
                    {
                        user && isAdmin ? <li><Link to={'/dashboard/adminhome'}>DashBoard</Link></li> :
                            <li><Link to={'/dashboard/userhome'}>DashBoard</Link></li>
                    }
                    <li><Link to={'/menu'}>Our Menu</Link></li>
                    <li><Link to={'/shop/salad'}>Our Shop</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;