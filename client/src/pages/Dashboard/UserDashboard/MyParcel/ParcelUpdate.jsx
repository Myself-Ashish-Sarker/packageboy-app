import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/axiosPublic';

const ParcelUpdate = ({ booking, fetchUserData, disabled }) => {
    const openModal = () => {
        document.getElementById(`modal_${booking._id}`).showModal();
    };

    const [parcelWeight, setParcelWeight] = useState(booking.parcelWeight);
    const [price, setPrice] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState(booking.phoneNumber);
    const [parcelType, setParcelType] = useState(booking.parcelType);
    const [receiverName, setReceiverName] = useState(booking.receiverName);
    const [receiverNumber, setReceiverNumber] = useState(booking.receiverNumber);
    const [deliveryDate, setDeliveryDate] = useState(booking.deliveryDate);
    const [latitude, setLatitude] = useState(booking.latitude);
    const [longitude, setLongitude] = useState(booking.lon);
    const [bookingDate] = useState(new Date().toLocaleDateString());

    const axiosPublic = useAxiosPublic();

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

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updateObj = {
            name: booking.name,
            email: booking.email,
            phoneNumber,
            parcelType,
            parcelWeight,
            receiverName,
            receiverNumber,
            deliveryDate,
            bookingDate,
            deliveryManId: booking.deliveryManId || 'Not set',
            latitude,
            longitude,
            price,
            status: 'Pending'
        };

        try {
            const response = await axiosPublic.patch(`/bookings/${booking._id}`, updateObj);

            if (response.status === 200) {
                const updatedBooking = response.data;
                console.log('Booking updated successfully:', updatedBooking);
                fetchUserData(); // Call fetchUserData to refresh the data
                document.getElementById(`modal_${booking._id}`).close(); // Close the modal after successful update
            } else {
                console.error('Failed to update booking');
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    return (
        <div>
            <button className='btn bg-emerald-500 hover:bg-emerald-400 text-white' onClick={openModal} disabled={disabled}>Update</button>
            <dialog id={`modal_${booking._id}`} className="modal modal-bottom sm:modal-middle ">
                <div className="modal-box w-full max-w-4xl">
                    <h3 className="font-bold text-lg">Update Parcel</h3>
                    <p className="py-4">Updating booking for {booking.parcelType}</p>

                    <form onSubmit={handleUpdate}>
                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' value={booking.name} className="input input-bordered" readOnly required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' value={booking.email} className="input input-bordered" readOnly required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="number" name='phone-number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input input-bordered" required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Parcel Type</span>
                            </label>
                            <input type="text" name='parcel-type' value={parcelType} onChange={(e) => setParcelType(e.target.value)} className="input input-bordered" required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Parcel Weight</span>
                            </label>
                            <input type="number" name='parcel-weight' value={parcelWeight} onChange={(e) => setParcelWeight(Number(e.target.value))} className="input input-bordered" required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Receiver's Name</span>
                            </label>
                            <input type="text" name='receiver-name' value={receiverName} onChange={(e) => setReceiverName(e.target.value)} className="input input-bordered" required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Receiver's Phone Number</span>
                            </label>
                            <input type="number" name='receiver-number' value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} className="input input-bordered" required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Requested Delivery Date</span>
                            </label>
                            <input type="date" name='delivery-date' value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="input input-bordered" required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Booking Date</span>
                            </label>
                            <input type="text" name='booking-date' value={bookingDate} className="input input-bordered" readOnly required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Delivery Man ID</span>
                            </label>
                            <input type="text" name='delivery-man-id' value={booking.deliveryManId || 'Not set'} className="input input-bordered" readOnly required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Latitude</span>
                            </label>
                            <input type="number" name='latitude' step="any" value={booking.latitude} onChange={(e) => setLatitude(e.target.value)} className="input input-bordered" required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Longitude</span>
                            </label>
                            <input type="number" name='longitude' step='any' value={booking.longitude} onChange={(e) => setLongitude(e.target.value)} className="input input-bordered" required />
                        </div>

                        <div className="form-control pb-5">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" name='price' value={price} className="input input-bordered" readOnly required />
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-400 text-white" disabled={disabled}>Update</button>
                            <button type="button" className="btn bg-red-500 hover:bg-red-500 text-white" onClick={() => document.getElementById(`modal_${booking._id}`).close()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ParcelUpdate;
