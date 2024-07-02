import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Profile from "../shared/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layout/Dashboard";
import DeliveryManHome from "../pages/Dashboard/DeliveryDashboard/DeliveryHome/DeliveryHome";
import AdminHome from "../pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserDashboard/UserHome/UserHome";
import BookParcel from "../pages/Dashboard/UserDashboard/BookParcel/BookParcel";
import MyParcel from "../pages/Dashboard/UserDashboard/MyParcel/MyParcel";
import BookedParcel from "../pages/Dashboard/AdminDashboard/BookedParcel/BookedParcel";
import AllUsers from "../pages/Dashboard/AdminDashboard/AllUsers.jsx/AllUsers";
import AllDelivery from "../pages/Dashboard/AdminDashboard/AllDelivery/AllDelivery";
import DeliveryList from "../pages/Dashboard/DeliveryDashboard/DeliveryList/DeliveryList";
import MyReviews from "../pages/Dashboard/DeliveryDashboard/MyReviews/MyReviews";
import UserProfile from "../pages/Dashboard/UserDashboard/UserProfie/UserProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [

        ]
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: 'registration',
        element: <Registration></Registration>
    },
    {
        path: 'profile',
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [


            // special //
            //user
            {
                path: 'userhome',
                element: <PrivateRoutes><UserHome></UserHome></PrivateRoutes>,
            },
            {
                path: 'bookparcel',
                element: <PrivateRoutes><BookParcel></BookParcel></PrivateRoutes>
            },
            {
                path: 'myparcel',
                element: <PrivateRoutes><MyParcel></MyParcel></PrivateRoutes>
            },
            {
                path: 'userprofile',
                element: <PrivateRoutes><UserProfile></UserProfile></PrivateRoutes>
            },
            // user
            
            // delivery man
            {
                path: 'deliverymanhome',
                element: <PrivateRoutes><DeliveryManHome></DeliveryManHome></PrivateRoutes>
            },
            {
                path: 'deliverylist',
                element: <PrivateRoutes><DeliveryList></DeliveryList></PrivateRoutes>
            },
            {
                path: 'myreviews',
                element: <PrivateRoutes><MyReviews></MyReviews></PrivateRoutes>
            },
            // delivery man

            //admin
            {
                path: 'adminhome',
                element: <PrivateRoutes><AdminHome></AdminHome></PrivateRoutes>
            },
            {
                path: 'bookedparcel',
                element: <PrivateRoutes><BookedParcel></BookedParcel></PrivateRoutes>
            },
            {
                path: 'allusers',
                element: <PrivateRoutes><AllUsers></AllUsers></PrivateRoutes>
            },
            {
                path: 'alldelivery',
                element: <PrivateRoutes><AllDelivery></AllDelivery></PrivateRoutes>
            }
            //admin

        ]

    },


]);