import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import Swal from 'sweetalert2';
const axiosPublic = useAxiosPublic();

const BookParcel = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [parcelWeight, setParcelWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [bookingDate] = useState(new Date().toLocaleDateString());

    const axiosPublic = useAxiosPublic();

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

    useEffect(() => {
        if (parcelWeight === 1) {
            setPrice(50);
        } else if (parcelWeight === 2) {
            setPrice(100);
        } else if (parcelWeight > 2) {
            setPrice(150);
        } else {
            setPrice(0);
        }
    }, [parcelWeight]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleBooking = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const userType = form['user-type'].value;
        const address = form.address.value;
        const phoneNumber = form['phone-number'].value;
        const parcelType = form['parcel-type'].value;
        const parcelWeight = form['parcel-weight'].value;
        const receiverName = form['receiver-name'].value;
        const receiverNumber = form['receiver-number'].value;
        const deliveryDate = form['delivery-date'].value;
        const bookingDate = form['booking-date'].value;
        const deliveryManId = form['delivery-man-id'].value;
        const latitude = form.latitude.value;
        const longitude = form.longitude.value;
        const price = form.price.value;
        const status = form.status.value;

        const bookObj = { name, email, userType, address, phoneNumber, parcelType, parcelWeight, receiverName, receiverNumber, deliveryDate, bookingDate, deliveryManId, latitude, longitude, price, status };

        console.log(bookObj);

        try {
            const res = await axiosPublic.post('/bookings', bookObj);
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Booked",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Try Again later",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

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
                                    <Link className='border-2 p-2 rounded-xl bg-white text-[#187bcd]' to="/dashboard/bookparcel">Book a parcel</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/myparcel">My Parcel</Link>
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
                        <h1 className='pt-10 font-black pl-96 text-4xl'>Book Parcel Section</h1>

                        <div>
                            <div className='pt-10 pl-64'>
                                {
                                    user && userData ?
                                        <>
                                            <form className="card-body" onSubmit={handleBooking}>
                                                <h1 className='text-center text-xl font-bold'>Registration</h1>

                                                <div className='flex gap-8 md:flex-col lg:flex-row'>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Name</span>
                                                        </label>
                                                        <input type="text" name='name' defaultValue={userData.name} className="input input-bordered" readOnly required />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Email</span>
                                                        </label>
                                                        <input type="text" name='email' defaultValue={userData.email} className="input input-bordered" readOnly required />
                                                    </div>
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">User Type</span>
                                                    </label>
                                                    <input type="text" name='user-type' defaultValue={userData.userType} className="input input-bordered" readOnly required />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Address</span>
                                                    </label>
                                                    <input type="text" name='address' placeholder="Address" className="input input-bordered" required />
                                                </div>

                                                <div className='flex gap-8 md:flex-col lg:flex-row'>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Phone Number</span>
                                                        </label>
                                                        <input type="number" name='phone-number' placeholder='Phone Number' className="input input-bordered" required />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Parcel Type</span>
                                                        </label>
                                                        <input type="text" name='parcel-type' placeholder='Parcel Type' className="input input-bordered" required />
                                                    </div>
                                                </div>

                                                <div className="flex gap-8 md:flex-col lg:flex-row">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Parcel Weight</span>
                                                        </label>
                                                        <input type="number" name='parcel-weight' placeholder='Parcel Weight' className="input input-bordered" value={parcelWeight} onChange={(e) => setParcelWeight(Number(e.target.value))} required />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Receiver's Name</span>
                                                        </label>
                                                        <input type="text" name='receiver-name' placeholder="Receiver's Name" className="input input-bordered" required />
                                                    </div>
                                                </div>

                                                <div className="flex gap-8 md:flex-col lg:flex-row">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Receiver's Phone Number</span>
                                                        </label>
                                                        <input type="number" name='receiver-number' placeholder="Receiver's Phone Number" className="input input-bordered" required />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Requested Delivery Date</span>
                                                        </label>
                                                        <input type="date" name='delivery-date' className="input input-bordered" required />
                                                    </div>
                                                </div>

                                                <div className='flex gap-8 md:flex-col lg:flex-row'>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Booking Date</span>
                                                        </label>
                                                        <input type="text" name='booking-date' value={bookingDate} className="input input-bordered" readOnly required />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Delivery Man ID</span>
                                                        </label>
                                                        <input type="text" name='delivery-man-id' defaultValue="Not set" className="input input-bordered" readOnly required />
                                                    </div>
                                                </div>

                                                <div className="flex gap-8 md:flex-col lg:flex-row">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Latitude</span>
                                                        </label>
                                                        <input type="number" name='latitude' step="any" placeholder='latitude' className="input input-bordered" required />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Longitude</span>
                                                        </label>
                                                        <input type="number" name='longitude' step='any' placeholder='longitude' className="input input-bordered" required />
                                                    </div>
                                                </div>

                                                <div className="flex gap-8 md:flex-col lg:flex-row">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Price</span>
                                                        </label>
                                                        <input type="number" name='price' value={price} className="input input-bordered" readOnly required />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Status</span>
                                                        </label>
                                                        <input type="text" name='status' value="Pending" className="input input-bordered" readOnly required />
                                                    </div>
                                                </div>

                                                <div className="form-control mt-6">
                                                    <button className="btn btn-primary">Book Parcel</button>
                                                </div>
                                            </form>
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

export default BookParcel;