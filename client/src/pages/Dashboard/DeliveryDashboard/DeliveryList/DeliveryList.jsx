import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import ShowMap from './ShowMap';


const DeliveryList = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            const fetchUserData = async () => {
                try {
                    const response = await axiosPublic.get(`/user?email=${user.email}`);
                    setUserData(response.data);

                    const bookingsResponse = await axiosPublic.get(`/bookings`);
                    const filteredBookings = bookingsResponse.data.filter(booking => booking.deliveryManId === response.data._id);
                    setBookings(filteredBookings);

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

    const updateBookingStatus = async (bookingId, status) => {
        try {
            await axiosPublic.patch(`/bookings/${bookingId}`, { status });
            setBookings(prevBookings => prevBookings.map(booking => 
                booking._id === bookingId ? { ...booking, status } : booking
            ));
        } catch (error) {
            setError(error);
        }
    };

    const handleStatusChange = (bookingId, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                updateBookingStatus(bookingId, status).then(() => {
                    document.getElementById(`cancel-btn-${bookingId}`).disabled = true;
                    document.getElementById(`deliver-btn-${bookingId}`).disabled = true;
                    Swal.fire({
                        title: status.charAt(0).toUpperCase() + status.slice(1) + "!",
                        text: `Your booking has been ${status}.`,
                        icon: "success"
                    });
                });
            }
        });
    };

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
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/deliverymanhome">Delivery Man Home</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link className='border-2 p-2 rounded-xl bg-white text-[#fcc1c5]' to="/dashboard/deliverylist">My Delivery List</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/myreviews">My Reviews</Link>
                                </h1>
                            </div>
                        </div>

                        <div className='text-center text-xl font-bold'>
                            <Link className='border-2 p-2 rounded-xl bg-white text-[#fcc1c5]' to="/">Go Home</Link>
                        </div>
                    </div>
                </div>

                <div className=' w-full'>
                    {user && userData ? (
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="mt-10 font-black text-black text-3xl pb-24">My Delivery List</h1>
                            {bookings.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Phone Number</th>
                                                <th>Receiver Name</th>
                                                <th>Booking Date</th>
                                                <th>Delivery Date</th>
                                                <th>Booked User's Number</th>
                                                <th>Address</th>
                                                <th>Location</th>
                                                <th>Cancel</th>
                                                <th>Deliver</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map(booking => (
                                                <tr key={booking._id}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                <div className="font-bold">{booking.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{booking.phoneNumber}</td>
                                                    <td>{booking.receiverName}</td>
                                                    <td>{booking.bookingDate}</td>
                                                    <td>{booking.deliveryDate}</td>
                                                    <td>{booking.receiverNumber}</td>
                                                    <td>{booking.address}</td>
                                                    <td>
                                                        <ShowMap booking={booking}></ShowMap>
                                                    </td>
                                                    <td>
                                                        <button 
                                                            id={`cancel-btn-${booking._id}`}
                                                            className='btn bg-red-500 hover:bg-red-400 text-white'
                                                            onClick={() => handleStatusChange(booking._id, 'cancelled')}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button 
                                                            id={`deliver-btn-${booking._id}`}
                                                            className='btn bg-emerald-500 hover:bg-emerald-400 text-white'
                                                            onClick={() => handleStatusChange(booking._id, 'delivered')}
                                                        >
                                                            Deliver
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div>No bookings found for this delivery man.</div>
                            )}
                        </div>
                    ) : (
                        <div>No user information available.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DeliveryList;
