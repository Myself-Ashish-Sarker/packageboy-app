import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import Swal from 'sweetalert2';

const BookedParcelUpdate = ({ booking }) => {
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchDeliveryMen = async () => {
            try {
                const response = await axiosPublic.get('/users');
                const deliveryMenData = response.data.filter(user => user.userType === 'deliveryman');
                setDeliveryMen(deliveryMenData);
            } catch (error) {
                console.error("Error fetching delivery men:", error);
            }
        };

        fetchDeliveryMen();
    }, [axiosPublic]);

    const handleAssign = async () => {
        try {
            await axiosPublic.patch(`/bookings/${booking._id}`, {
                status: 'On The Way',
                deliveryManId: selectedDeliveryMan,
                deliveryDate
            });

            Swal.fire({
                title: 'Success!',
                text: 'Booking status has been updated and delivery man assigned.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            document.getElementById(`modal_${booking._id}`).close();
        } catch (error) {
            console.error("Error updating booking:", error);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to update booking.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
            <button className="btn bg-yellow-400 hover:bg-yellow-300 text-white" onClick={() => document.getElementById(`modal_${booking._id}`).showModal()}>Manage</button>
            <dialog id={`modal_${booking._id}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Manage Booking</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleAssign(); }}>
                        <div className="py-4">
                            <label className="block text-sm font-medium text-gray-700">Select Delivery Man</label>
                            <select
                                className="mt-1 block w-full"
                                value={selectedDeliveryMan}
                                onChange={(e) => setSelectedDeliveryMan(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a delivery man</option>
                                {deliveryMen.map(man => (
                                    <option key={man._id} value={man._id}>{man.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="py-4">
                            <label className="block text-sm font-medium text-gray-700">Approximate Delivery Date</label>
                            <input
                                type="date"
                                className="mt-1 block w-full"
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn bg-green-500 hover:bg-green-400 text-white">Assign</button>
                            <button type="button" className="btn" onClick={() => document.getElementById(`modal_${booking._id}`).close()}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default BookedParcelUpdate;
