import React from 'react';
import Navbar from '../../../Component/Navbar/Navbar';
import Cover from '../../../Component/Cover/Cover';
import Feature from '../../../Component/Feature/Feature';
import Delivery from '../../../Component/Delivery/Delivery';
import Footer from '../../../Component/Footer/Footer';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Cover></Cover>
            <Feature ></Feature>
            <Delivery></Delivery>
            <Footer></Footer>
        </div>
    );
};

export default Home