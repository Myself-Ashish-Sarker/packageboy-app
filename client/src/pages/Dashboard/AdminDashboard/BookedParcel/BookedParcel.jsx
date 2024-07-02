import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import { AuthContext } from '../../../../providers/AuthProvider';
import BookedParcelUpdate from './BookedParcelUpdate';

const BookedParcel = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();

    const fetchUserData = async () => {
        if (user && user.email) {
            try {
                const response = await axiosPublic.get('/bookings');
                const filteredData = response.data.filter(booking => booking.userType === 'user');
                setUserData(filteredData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        } else {
            setLoading(false);
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
        <div className='flex'>
            <div className='w-72 h-screen bg-[#a3cac9] shadow-2xl pt-14 flex flex-col justify-evenly'>
                <div>
                    <div className='pb-10'>
                        <h1 className='text-center text-xl font-bold'>
                            <Link to="/dashboard/adminhome">Admin Statistics</Link>
                        </h1>
                    </div>
                    <div className='pb-10'>
                        <h1 className='text-center text-xl font-bold'>
                            <Link className='border-2 p-2 rounded-xl bg-white text-[#a3cac9]' to="/dashboard/bookedparcel">Booked Parcels</Link>
                        </h1>
                    </div>
                    <div className='pb-10'>
                        <h1 className='text-center text-xl font-bold'>
                            <Link to="/dashboard/alldelivery">All Delivery Men</Link>
                        </h1>
                    </div>
                    <div>
                        <h1 className='text-center text-xl font-bold'>
                            <Link to="/dashboard/allusers">All Users</Link>
                        </h1>
                    </div>
                </div>
                <div className='text-center text-xl font-bold'>
                    <h1><Link className='border-2 p-2 rounded-xl bg-white text-[#a3cac9]' to='/'>Go Home</Link></h1>
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
                                        <th>Booking Date</th>
                                        <th>Requested Delivery Date</th>
                                        <th>Cost</th>
                                        <th>Status</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user && userData && userData.length > 0 ? (
                                        userData.map((booking) => (
                                            <tr key={booking._id}>
                                                <td>{booking.name}</td>
                                                <td>{booking.phoneNumber}</td>
                                                <td>{booking.bookingDate}</td>
                                                <td>{booking.deliveryDate}</td>
                                                <td>{booking.price} $</td>
                                                <td>{booking.status}</td>
                                                <td>
                                                    <BookedParcelUpdate booking={booking} />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10">No bookings found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedParcel;
