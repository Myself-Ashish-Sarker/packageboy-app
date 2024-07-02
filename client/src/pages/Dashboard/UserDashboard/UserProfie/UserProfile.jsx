import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../hooks/axiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (user && user.email) {
            const fetchUserData = async () => {
                try {
                    const response = await axiosPublic.get(`/user`, {
                        params: { email: user.email }
                    });
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const onSubmit = e => {
        e.preventDefault();
        if (selectedFile) {
            handleImage();
        }
    }

    const handleFileChange = e => {
        setSelectedFile(e.target.files[0]);
    }

    const handleImage = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData);
            const imageUrl = res.data.data.url;

            await updateUserImage(imageUrl);

            setUserData({ ...userData, image: imageUrl });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const updateUserImage = async (imageUrl) => {
        try {
            const response = await axiosPublic.patch('/users/update', {
                email: user.email,
                image: imageUrl
            });
            console.log('Image URL updated in database:', response.data);
        } catch (error) {
            console.error('Error updating user image in database:', error);
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
                                    <Link to="/dashboard/bookparcel">Book a parcel</Link>
                                </h1>
                            </div>
                            <div className='pb-10'>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link to="/dashboard/myparcel">My Parcel</Link>
                                </h1>
                            </div>
                            <div>
                                <h1 className='text-center text-xl font-bold'>
                                    <Link className='border-2 p-2 rounded-xl bg-white text-[#187bcd]' to="/dashboard/userprofile">User Profile</Link>
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
                        <h1 className='pt-10 font-black pl-24 text-4xl'>User Home Section</h1>

                        <div className='pt-10 pl-24'>
                            {user && userData ? (
                                <div className="flex flex-col items-center justify-center">
                                    <img className="w-52 h-52 rounded-full border-2 border-rose-500" src={userData.image} alt="" />

                                    <h1 className="mt-10 font-black text-black">ID: &nbsp;&nbsp;<span className="border-2 p-2 rounded-md bg-white">{userData._id}</span></h1>
                                    <h1 className="mt-10 font-black text-black">User Email: &nbsp;&nbsp;<span className="border-2 p-2 rounded-md bg-white">{userData.email}</span> </h1>
                                    <h1 className="mt-10 font-black text-black">Name: &nbsp;&nbsp;<span className="border-2 p-2 rounded-md bg-white">{userData.name}</span></h1>
                                    <h1 className="mt-10 font-black text-black">User Type: &nbsp;&nbsp; <span className="border-2 p-2 rounded-md bg-white">{userData.userType}</span></h1>

                                    <form onSubmit={onSubmit}>
                                        <input type="file" className="mt-10 file-input file-input-bordered text-cyan-500 file-input-info w-full max-w-xs" onChange={handleFileChange} />
                                        <button type="submit">Upload</button>
                                    </form>
                                </div>
                            ) : (
                                <div>No user information available.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
