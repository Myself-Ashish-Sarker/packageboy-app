import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import Swal from 'sweetalert2';
import ParcelUpdate from './ParcelUpdate';
import Review from './Review';
import Pay from './Payment';

const MyParcel = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPackages, setTotalPackages] = useState(0);
    const [showPayment, setShowPayment] = useState(false);

    const axiosPublic = useAxiosPublic();

    const fetchUserData = async () => {
        if (user && user.email) {
            try {
                const response = await axiosPublic.get(`bookings`, { params: { email: user.email } });
                const data = response.data;
                setUserData(data);
                setLoading(false);

                const total = data.reduce((acc, booking) => acc + parseFloat(booking.price), 0);
                setTotalPrice(total);
                setTotalPackages(data.length);
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

    const handleCancel = booking => {
        Swal.fire({
            title: "Are you sure you want to cancel?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`bookings/${booking._id}`).then((result) => {
                    if (result.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Canceled!",
                            text: "Your package has been Canceled.",
                            icon: "success"
                        });
                        fetchUserData();
                    }
                });
            }
        });
    };

    return (
        <>
            <div className='flex'>
                <div className=''>
                    <div className='w-72 h-screen bg-[#187bcd] shadow-2xl pt-14 flex flex-col justify-evenly'>
                        <div>
                            <div className='pb-10'>
                                <h1 className=' text-center text-xl font-bold'>
                                    <Link to="/dashboard/userhome">User Home</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/bookparcel">Book a parcel</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link className='border-2 p-2 rounded-xl bg-white text-[#187bcd]' to="/dashboard/myparcel">My Parcel</Link>
                                </h1>
                            </div>
                            <div>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/userprofile">User Profile</Link>
                                </h1>
                            </div>
                        </div>

                        <div className='text-center text-xl font-bold'>
                            <Link className='border-2 p-2 rounded-xl bg-white text-[#187bcd]' to="/">Go Home</Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <h1 className='pt-10 font-black text-4xl pl-2'>User Home Section</h1>
                        <h1 className='pt-10 font-black text-4xl pl-2'>Total Packages: {totalPackages}</h1>

                        <div className='pt-24 pl-2'>

                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Parcel Type</th>
                                            <th>Requested Delivery Date</th>
                                            <th>Approximate Delivery Date</th>
                                            <th>Booking Date</th>
                                            <th>Delivery Man ID</th>
                                            <th>Price</th>
                                            <th>Booking Status</th>
                                            <th>Update</th>
                                            <th>Review</th>
                                            <th>Cancel</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user && userData && userData.length > 0 ? (
                                            userData.map((booking) => (
                                                <tr key={booking._id}>
                                                    <td>{booking.parcelType}</td>
                                                    <td>{booking.deliveryDate}</td>
                                                    <td>{booking.email}</td>
                                                    <th>{booking.bookingDate}</th>
                                                    <th>{booking.deliveryManId}</th>
                                                    <th>
                                                        <h1>{booking.price} $</h1>
                                                    </th>
                                                    <th>{booking.status}</th>
                                                    <th>
                                                        <ParcelUpdate disabled={booking.status === 'On The Way' || booking.status === 'canceled' || booking.status === 'delivered'} booking={booking} fetchUserData={fetchUserData}></ParcelUpdate>
                                                    </th>
                                                    <th>
                                                        {/* <button className='btn bg-yellow-500 hover:bg-yellow-400 text-white'>Review</button> */}
                                                        <Review></Review>
                                                    </th>
                                                    <th>
                                                        <button disabled={booking.status === 'On The Way' || booking.status === 'canceled' || booking.status === 'delivered'} onClick={() => handleCancel(booking)} className='btn bg-red-500 hover:bg-red-400 text-white'>Cancel</button>
                                                    </th>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10">No bookings found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <h1>Price: {totalPrice} $</h1>
                                {/* <button className='btn bg-blue-600 hover:bg-blue-400 text-white'>Pay</button> */}
                                <button onClick={() => setShowPayment(true)} className='btn bg-blue-600 hover:bg-blue-400 text-white'>Pay</button>
                                {showPayment && <Pay amount={totalPrice} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyParcel;

