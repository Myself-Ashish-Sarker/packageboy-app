import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import ReactApexChart from 'react-apexcharts';
import useAxiosPublic from '../../../../hooks/axiosPublic';

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);

    const axiosPublic = useAxiosPublic();

    const groupByBookingDate = (data) => {
        const groupedData = {};

        data.forEach((item) => {
            const { bookingDate } = item;
            if (groupedData[bookingDate]) {
                groupedData[bookingDate].count += 1;
            } else {
                groupedData[bookingDate] = { bookingDate, count: 1 };
            }
        });

        return Object.values(groupedData);
    };

    useEffect(() => {
        if (user && user.email) {
            const fetchUserData = async () => {
                try {
                    const response = await axiosPublic.get('/bookings');
                    const data = response.data;
                    const groupedData = groupByBookingDate(data);
                    setChartData(groupedData);
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
                    <div className='w-72 h-screen bg-[#a3cac9] shadow-2xl pt-14 flex flex-col justify-evenly'>
                        <div>
                            <div className='pb-10'>
                                <h1 className=' text-center text-xl font-bold'>
                                    <Link className='border-2 p-2 rounded-xl bg-white text-[#a3cac9]' to="/dashboard/adminhome">Admin Statisctics</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/bookedparcel">Booked Parcels</Link>
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
                </div>

                <div>
                    <div>
                        <h1 className='pt-10 font-black pl-24 text-4xl tetx'>Admin Stat Section</h1>

                        <div>


                            <div className='mt-24'>
                                <ReactApexChart
                                    options={{
                                        chart: {
                                            type: 'bar',
                                            height: 350,
                                        },
                                        plotOptions: {
                                            bar: {
                                                horizontal: false,
                                                columnWidth: '55%',
                                            },
                                        },
                                        dataLabels: {
                                            enabled: false,
                                        },
                                        xaxis: {
                                            type: 'category',
                                            labels: {
                                                style: {
                                                    fontSize: '12px',
                                                },
                                            },
                                        },
                                    }}
                                    series={[
                                        {
                                            name: 'Bookings',
                                            data: chartData.map((item) => item.count),
                                        },
                                    ]}
                                    type="bar"
                                    height={350}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;