import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/axiosPublic";

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleLogOut = () => {

        Swal.fire({
            position: "center",
            title: "Want to Log Out?",
            showClass: {
                popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                `
            },
            hideClass: {
                popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                `
            },
            text: "We are happy to have you",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Log Out!",
            cancelButtonText: 'Stay'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(result => {
                        console.log(result);
                        Swal.fire({
                            title: "Logged Out!",
                            text: "See Yaa!.",
                            icon: "success"
                        });

                        navigate('/');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            
        });
    }
    

    return (
        <div className="h-screen bg-gradient-to-br from-[#08203e] to-[#557c93]">
            <h1 className="py-10 text-center text-white font-semibold text-4xl">Welcome back</h1>
            {
                user && userData ?
                    <>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-52 h-52 rounded-full border-2 border-rose-500" src={userData.image} alt="" />

                            <h1 className="mt-10 font-black text-black">ID: &nbsp;&nbsp;<span className="border-2 p-2 rounded-md bg-white">{userData._id}</span></h1>

                            <h1 className="mt-10 font-black text-black">User Email: &nbsp;&nbsp;<span className="border-2 p-2 rounded-md bg-white">{userData.email}</span> </h1>

                            <h1 className="mt-10 font-black text-black">Name: &nbsp;&nbsp;<span className="border-2 p-2 rounded-md bg-white">{userData.name}</span></h1>
                            <h1 className="mt-10 font-black text-black">User Type: &nbsp;&nbsp; <span className="border-2 p-2 rounded-md bg-white">{userData.userType}</span></h1>

                        </div>

                    </>
                    :
                    <div>No user information available.</div>
            }

            <div className="mt-10 flex justify-center">
                <Link to="/"><button className="btn bg-emerald-700 hover:bg-emerald-400 text-white">Go Home</button></Link>
            </div>
            <div className="mt-10 flex justify-center">
                <Link><button onClick={handleLogOut} className="btn bg-red-700 hover:bg-red-400 text-white">Log Out</button></Link>
            </div>
        </div>
    );
};

export default Profile;
