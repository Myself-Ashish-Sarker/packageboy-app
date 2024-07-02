import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/axiosPublic";


const Registration = () => {
    const axiosPublic = useAxiosPublic();
    const [userType, setUserType] = useState("");
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated')

                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            phone: data.phone,
                            image: data.photoURL,
                            userType,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('User added to the database!');
                                    reset();
                                    Swal.fire({
                                        position: 'middle',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };

    const handleUserTypeChange = type => {
        setUserType(type);
        setDropDownVisible(false);
    }

    const toggleDropDown = () => {
        setDropDownVisible(!dropDownVisible);
    }

    return (
        <>
            <div className="h-full py-12 flex flex-col items-center justify-center bg-gradient-to-r from-[#40c9ff] to-[#e81cff]">
                <div className=" flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div>
                            <h1 className="text-center text-2xl font-bold">Registration</h1>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="number"  {...register("phone", { required: true })} name="phone" placeholder="phone number" className="input input-bordered" />
                            {errors.number && <span className="text-red-600">Phone Number is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <input type="password"  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} placeholder="password" className="input input-bordered" />
                        </div>
                        <div >
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1" onClick={toggleDropDown}>Choose Your Type</div>
                                {
                                    dropDownVisible && (
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            {/* <li><L onClick={() => handleUserTypeChange("User")}>User</L></li> */}
                                            <li><button className="hover:bg-rose-600 hover:text-white" onClick={() => handleUserTypeChange("user")}>User</button> </li>
                                            {/* <li><Link onClick={() => handleUserTypeChange("Delivary Man")}>Delivary Man</Link></li> */}
                                            <li><button className="hover:bg-rose-600 hover:text-white" onClick={() => handleUserTypeChange("deliveryman")}>Delivery Man</button></li>
                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className="px-6 pb-6">Already have an account? <Link to="/login" className="font-semibold hover:text-blue-500 hover:underline">Login</Link></p>
                </div>
                <div className="pt-8">
                    <Link to="/"><button className="btn bg-gradient-to-r from-[#08203e] to-[#557c93] text-white hover:scale-110">Back to Home</button></Link>
                </div>
            </div>
        </>
    );
};

export default Registration;