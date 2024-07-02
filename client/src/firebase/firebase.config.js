// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: import.meta.env.VITE_apiKey,
    // authDomain: import.meta.env.VITE_authDomain,
    // projectId: import.meta.env.VITE_projectId,
    // storageBucket: import.meta.env.VITE_storageBucket,
    // messagingSenderId: import.meta.env.VITE_messagingSenderId,
    // appId: import.meta.env.VITE_appId
    apiKey: "AIzaSyD1WmNDy6MY4UCxAnDPYYUXF-7fZoX94Ng",
    authDomain: "delivery-app-69406.firebaseapp.com",
    projectId: "delivery-app-69406",
    storageBucket: "delivery-app-69406.appspot.com",
    messagingSenderId: "476530365082",
    appId: "1:476530365082:web:792b9f55ef037e804a8523"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);