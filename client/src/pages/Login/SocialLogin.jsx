import { FaGoogle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/axiosPublic";

const SocialLogin = () => {

    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    userType: 'User'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <button onClick={ handleGoogleSignIn }>
                <FaGoogle className="text-2xl"></FaGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;