import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../hooks/axiosPublic';

const DeliveryManHome = () => {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic()

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
        <>
            <div className='flex'>
                <div className=''>
                    <div className='w-72 h-screen bg-[#fcc1c5] shadow-2xl pt-14 flex flex-col justify-evenly'>
                        <div>
                            <div className='pb-10'>
                                <h1 className=' text-center text-xl font-bold'>
                                    <Link className='border-2 p-2 rounded-xl bg-white text-[#fcc1c5]' to="/dashboard/deliverymanhome">Delivery Man Home</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/deliverylist">My Delivery List</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/myreviews">My Reviews</Link>
                                </h1>
                            </div>
                            <div>
                            </div>
                        </div>

                        <div className='text-center text-xl font-bold'>
                            <Link className='border-2 p-2 rounded-xl bg-white text-[#fcc1c5]' to="/">Go Home</Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <h1 className='pt-10 font-black pl-24 text-4xl tetx'>Delivery Man Home</h1>

                        <div>

                            <div className='pt-10 pl-24'>
                                {
                                    user && userData ?
                                        <>
                                            <h1 className='text-lg'>Name: {userData.name}</h1>
                                            <h1>User Id: {userData._id}</h1>
                                            <h1>Email: {userData.email}</h1>
                                        </>
                                        :
                                        <></>
                                }
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default DeliveryManHome