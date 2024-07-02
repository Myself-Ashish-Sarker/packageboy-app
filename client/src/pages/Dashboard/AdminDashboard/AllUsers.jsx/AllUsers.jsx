import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    const fetchUserData = async () => {
        if (user && user.email) {
            try {
                const response = await axiosPublic.get('/users');
                const userData = response.data.filter(user => {
                    const userType = user.userType ? user.userType.toLowerCase() : '';
                    return userType === 'user';
                });
                setUserData(userData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const makeDelivery = async (userId) => {
        try {
            const response = await axiosPublic.patch(`/users/${userId}`, { userType: 'deliveryman' });
            if (response.status === 200) {
                setUserData(prevUserData =>
                    prevUserData.filter(user => user._id !== userId)
                );
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully made delivery man",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Failed to update user type", error);
        }
    }

    const makeAdmin = async (userId) => {
        try {
            const response = await axiosPublic.patch(`/users/${userId}`, { userType: 'admin' });
            if (response.status === 200) {
                setUserData(prevUserData =>
                    prevUserData.filter(user => user._id !== userId)
                );
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully made admin",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Failed to update user type", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className='flex'>
                <div className=''>
                    <div className='w-72 h-screen bg-[#a3cac9] shadow-2xl pt-14 flex flex-col justify-evenly'>
                        <div>
                            <div className='pb-10'>
                                <h1 className=' text-center text-xl font-bold'>
                                    <Link to="/dashboard/adminhome">Admin Statisctics</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/bookedparcel">Booked Parcels</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/alldelivery">All Delivery Men</Link>
                                </h1>
                            </div>
                            <div>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link className='border-2 p-2 rounded-xl bg-white text-[#a3cac9]' to="/dashboard/allusers">All Users</Link>
                                </h1>
                            </div>
                        </div>

                        <div className='text-center text-xl font-bold'>
                            <h1><Link className='border-2 p-2 rounded-xl bg-white text-[#a3cac9]' to='/'>Go Home</Link></h1>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className='pt-10 font-black pl-24 text-4xl'>Booked Users</h1>
                        <div className='pt-24'>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>User's Name</th>
                                            <th>User's Phone Number</th>
                                            <th>Make Delivery Man</th>
                                            <th>Make Admin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.map((user, index) => (
                                            <tr key={index}>
                                                <td>{user.name}</td>
                                                <td>{user.phone}</td>
                                                <td>
                                                    <button onClick={() => makeDelivery(user._id)} className='btn bg-fuchsia-500 hover:bg-fuchsia-400 text-white'>Delivery Man</button>
                                                </td>
                                                <td>
                                                    <button
                                                        className='btn bg-emerald-500 hover:bg-emerald-400 text-white'
                                                        onClick={() => makeAdmin(user._id)}
                                                    >
                                                        Admin
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllUsers;