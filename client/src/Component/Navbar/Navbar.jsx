import React, { useContext, useEffect, useState } from 'react';
import { MdNotificationAdd } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import './Navbar.css';
import useAxiosPublic from '../../hooks/axiosPublic';
import logo from '/logo.png'

const Navbar = () => {

    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();


    const handleLogOut = () => {

        Swal.fire({
            position: "center",
            title: "Want to Log Out?",
            showClass: {
                popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                `
            },
            hideClass: {
                popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                `
            },
            text: "We are happy to have you",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Log Out!",
            cancelButtonText: 'Stay'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(result => {
                        console.log(result);
                        Swal.fire({
                            title: "Logged Out!",
                            text: "See Yaa!.",
                            icon: "success"
                        });

                        navigate('/');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });
    }

    useEffect(() => {
        if (user && user.email) {
            const fetchUserData = async () => {
                try {
                    const response = await axiosPublic.get(`/user?email=${user.email}`);
                    setUserData(response.data);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };

            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [user, axiosPublic]);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }




    return (
        <div className=''>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to='/'>
                        <img className='w-52' src={logo} alt="" />
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">

                        <MdNotificationAdd className='text-3xl mr-4' />
                    </div>
                    <div className="dropdown dropdown-end">
                        {user && user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                tabIndex={0}
                                role="button"
                            />
                        ) : (
                            <FaUserCircle className='text-2xl cursor-pointer' tabIndex={0} role="button" />
                        )}
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                user && userData?
                                    <>
                                        <li className='hover:bg-none text-rose-500 font-semibold'>
                                            <button className='no-hover' disabled>{user.displayName}</button>
                                        </li>
                                        <li><NavLink to="/profile" className="hover:bg-green-500 hover:text-white">Profile</NavLink></li>
                                        <li><NavLink className="hover:bg-green-500 hover:text-white" to={`/dashboard/${userData.userType}home`}>Dashboard</NavLink></li>
                                        <li><button className='hover:bg-red-500 hover:text-white' onClick={handleLogOut}>Logout</button></li>
                                    </>
                                    :
                                    <>
                                        <li><NavLink className="font-semibold hover:bg-green-500 hover:text-white" to="/login">Login</NavLink></li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;