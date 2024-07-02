import React, { useState } from 'react';
import useAxiosPublic from '../../../../hooks/axiosPublic';
import Swal from 'sweetalert2';

const Review = ({ userId }) => {
    const axiosPublic = useAxiosPublic();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [userName, setUserName] = useState('');
    const [deliveryManId, setDeliveryManId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reviewData = {
            userId,
            userName,
            deliveryManId,
            rating,
            feedback,
        };

        try {
            const response = await axiosPublic.post('/reviews', reviewData);
            console.log('Review submitted successfully:', response.data);
            document.getElementById('my_modal_5').close();

            Swal.fire({
                title: 'Success!',
                text: 'Your review has been submitted successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            
        } catch (error) {
            console.error('Error submitting the review:', error);

            Swal.fire({
                title: 'Error!',
                text: 'There was an error submitting your review. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
            <button
                className="btn bg-yellow-400 hover:bg-yellow-300 text-white"
                onClick={() => document.getElementById('my_modal_5').showModal()}
            >
                Review
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Submit Your Review</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="py-4">
                            <div>
                                <label>User's Name</label>
                                <input
                                    type="text"
                                    placeholder="User Name"
                                    className="input input-bordered w-full mb-4"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Rating out of 5</label>
                                <input
                                    type="number"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="input input-bordered w-full mb-4"
                                    max="5"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label>Feedback</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="textarea textarea-bordered w-full mb-4"
                                ></textarea>
                            </div>
                            <div>
                                <label>Delivery Man's Id</label>
                                <input
                                    type="text"
                                    placeholder="Delivery Man's ID"
                                    className="input input-bordered w-full mb-4"
                                    value={deliveryManId}
                                    onChange={(e) => setDeliveryManId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-400 text-white">
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn bg-red-500 hover:bg-red-400 text-white"
                                onClick={() => document.getElementById('my_modal_5').close()}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Review;
