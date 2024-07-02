import React, { useContext, useState, useEffect } from 'react';
import boy1 from '/boy1.jpg';
import boy2 from '/boy2.jpg';
import boy3 from '/boy3.jpg';
import 'animate.css/animate.min.css';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/axiosPublic';

const Delivery = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalDeliveries1, setTotalDeliveries1] = useState(0);
    const [totalDeliveries2, setTotalDeliveries2] = useState(0);
    const [totalDeliveries3, setTotalDeliveries3] = useState(0);
    const [averageRating1, setAverageRating1] = useState(0);
    const [averageRating2, setAverageRating2] = useState(0);
    const [averageRating3, setAverageRating3] = useState(0);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get('bookings');
                const reviewResponse = await axiosPublic.get('reviews');
                const deliveryData = response.data;
                const reviewData = reviewResponse.data;

                const filteredDeliveries1 = deliveryData.filter(delivery => delivery.deliveryManId === '66607bfb7ded959b01ba6d16' && delivery.status === 'delivered');
                const filteredDeliveries2 = deliveryData.filter(delivery => delivery.deliveryManId === '66607c1d7ded959b01ba6d17' && delivery.status === 'delivered');
                const filteredDeliveries3 = deliveryData.filter(delivery => delivery.deliveryManId === '66607c457ded959b01ba6d18' && delivery.status === 'delivered');

                setTotalDeliveries1(filteredDeliveries1.length);
                setTotalDeliveries2(filteredDeliveries2.length);
                setTotalDeliveries3(filteredDeliveries3.length);

                const calculateAverageRating = (deliveryManId) => {
                    const reviews = reviewData.filter(review => review.deliveryManId === deliveryManId);
                    const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
                    return reviews.length > 0 ? (totalRating / reviews.length).toFixed(2) : 0;
                };

                setAverageRating1(calculateAverageRating('66607bfb7ded959b01ba6d16'));
                setAverageRating2(calculateAverageRating('66607c1d7ded959b01ba6d17'));
                setAverageRating3(calculateAverageRating('66607c457ded959b01ba6d18'));

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className='mt-36'>
                <h1 className='mb-16 text-center font-bold lg:text-7xl md:text-3xl text-xl text-rose-500 animate__animated animate__backInLeft'>Our Featured Delivery Man</h1>
            </div>

            <div className='flex justify-center'>
                <select className="select select-accent bg-cyan-500 text-white font-semibold w-full max-w-xs mb-24">
                    <option disabled selected>Select</option>
                    <option>Number of Parcels Delivered</option>
                    <option>Average Ratings</option>
                </select>
            </div>


            <div className='mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center px-16'>
                {/* first box */}
                <div>
                    <div className="w-96 bg-base-100 shadow-xl">
                        <figure><img className='h-64' src={boy1} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Abdul</h2>
                            <p>Total Deliveries: {totalDeliveries1}</p>
                            <p>Average Rating: {averageRating1}</p>
                        </div>
                    </div>
                </div>
                {/* first box */}

                {/* second box */}
                <div>
                    <div className="w-96 bg-base-100 shadow-xl">
                        <figure><img className='h-64' src={boy2} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Jashim</h2>
                            <p>Total Deliveries: {totalDeliveries2}</p>
                            <p>Average Rating: {averageRating2}</p>
                        </div>
                    </div>
                </div>
                {/* second box */}

                {/* third box */}
                <div>
                    <div className="w-96 bg-base-100 shadow-xl">
                        <figure><img src={boy3} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shabnur</h2>
                            <p>Total Deliveries: {totalDeliveries3}</p>
                            <p>Average Rating: {averageRating3}</p>
                        </div>
                    </div>
                </div>
                {/* third box */}
            </div>
        </>
    );
};

export default Delivery;
