import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userLog = { email, password };

        console.log(userLog);

        try {
            const result = await signIn(email, password);
            const user = result.user;
            console.log(user);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Logged In!",
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/');
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/invalid-credential') {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Invalid Credentials!",
                    text: "Please check your email and password and try again.",
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Login Failed!",
                    text: error.message,
                    showConfirmButton: true,
                });
            }
        }
    }

    return (
        <>
            <div className="h-screen bg-gradient-to-r from-[#40c9ff] to-[#e81cff]">

                <div className="flex flex-col h-screen justify-center items-center">
                    <div className="w-96 bg-base-100 shadow-2xl">
                        <div className="card-body">
                            <h2 className="text-center text-3xl font-bold mb-8">Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="form-control pb-5">
                                    <label>
                                        <h1 className="font-semibold mb-2">Email:</h1>
                                    </label>
                                    <input type="text" name="email" placeholder="Email" className="input input-bordered input-info w-full max-w-xs" required />
                                </div>

                                <div className="form-control">
                                    <h1 className="font-semibold mb-2">Passowrd:</h1>
                                    <input type="password" name="password" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                                </div>

                                <div className="pt-4 flex justify-start gap-2">
                                    <div><p>New Here?</p></div>
                                    <Link to='/registration' className="hover:underline hover:text-blue-500">Register</Link>
                                </div>

                                <div className="mt-6 card-actions justify-center">
                                    <button className="btn btn-primary">Login</button>
                                </div>

                                <div className="mt-9 flex justify-center items-center gap-1">
                                    <RxDividerHorizontal className="" />
                                    <div>
                                        <p>Login with other accounts</p>
                                    </div>
                                    <RxDividerHorizontal />
                                </div>

                                <div className="flex justify-center text-2xl text-blue-700">
                                    <SocialLogin></SocialLogin>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Link to="/"><button className="btn bg-gradient-to-r from-[#08203e] to-[#557c93] text-white hover:scale-110">Back to Home</button></Link>
                    </div>
                </div>
            </div>
        </>


    );
};

export default Login