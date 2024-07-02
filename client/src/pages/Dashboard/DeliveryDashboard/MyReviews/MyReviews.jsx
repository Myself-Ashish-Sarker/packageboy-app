import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../hooks/axiosPublic';

const MyReviews = () => {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user && user.email) {
                    const userResponse = await axiosPublic.get(`/user?email=${user.email}`);
                    setUserData(userResponse.data);

                    const reviewsResponse = await axiosPublic.get('/reviews');
                    setReviews(reviewsResponse.data);

                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, axiosPublic]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const userReviews = userData ? reviews.filter(review => review.deliveryManId === userData._id) : [];

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
                                    <Link to="/dashboard/deliverylist">My Delivery List</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link className='border-2 p-2 rounded-xl bg-white text-[#fcc1c5]' to="/dashboard/myreviews">My Reviews</Link>
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
                        {user && userData ? (
                            <>
                                <div className="flex flex-col items-center justify-center">
                                </div>
                                <div className="mt-10 pl-24">
                                    <h2 className="font-black text-2xl">My Reviews</h2>
                                    {userReviews.length > 0 ? (
                                        userReviews.map(review => (
                                            <div key={review._id} className="border-2 p-4 rounded-md my-2 bg-white">
                                                <p><strong>Username:</strong> {review.userName}</p>
                                                <p><strong>Delivery Man ID:</strong> {review.deliveryManId}</p>
                                                <p><strong>Rating:</strong> {review.rating}</p>
                                                <p><strong>Rating:</strong> {review.feedback}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No reviews found.</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div>No review available.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyReviews;