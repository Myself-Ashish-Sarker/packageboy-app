import React, { useContext, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/axiosPublic';

const Feature = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCount, setUserCount] = useState(0);
    const [deliveredCount, setDeliveredCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, bookingsResponse] = await Promise.all([
                    axiosPublic.get('/users'),
                    axiosPublic.get('/bookings')
                ]);

                setUserCount(usersResponse.data.length);

                const delivered = bookingsResponse.data.filter(booking => booking.status === 'delivered');
                setDeliveredCount(delivered.length);

                const pending = bookingsResponse.data.filter(booking => booking.status === 'pending');
                setPendingCount(pending.length);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosPublic]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className='mt-36'>
                <h1 className='mb-16 text-center font-bold lg:text-7xl md:text-3xl text-xl text-rose-500 animate__animated animate__backInLeft'>Our Feature Section</h1>
            </div>
            <div className='flex justify-center'>
                <div className="stats shadow mt-16">

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div className="stat-title">Bookings</div>
                        <div className="stat-value">
                            <CountUp
                                start={0}
                                end={pendingCount}
                                delay={2}
                            ></CountUp>
                        </div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                        </div>
                        <div className="stat-title">Parcel Delivered</div>
                        <div className="stat-value">
                            <CountUp
                                start={0}
                                end={deliveredCount}
                                delay={2}
                            ></CountUp>
                        </div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                            </svg>
                        </div>
                        <div className="stat-title">All Users</div>
                        <div className="stat-value">
                            <CountUp
                                start={0}
                                end={userCount}
                                delay={2}
                            ></CountUp>
                        </div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Feature;