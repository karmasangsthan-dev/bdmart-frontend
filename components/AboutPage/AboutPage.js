import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Maps from './Maps';


const AboutPage = () => {
    

    return (
        <div className='about-us'>
            <div className='about-page-thumbnail'>
                <div className='preview-content'>
                    <h1>Elevating Every Unboxing Experience.</h1>
                    <h4>Happy Shopping</h4>
                </div>
            </div>
            <div className="details-content">
                <div className="our-story">
                    <h2>About Bangladesh Mart</h2>
                    <p>Launched in 2020, Bangladeshmart.com.bd is your go-to destination for an unparalleled online shopping experience. Serving millions of satisfied customers globally, we bring you a curated selection of top-quality products. Welcome to a world of seamless shopping, where your satisfaction is our priority.</p>
                </div>
                <div className="our-mission">
                    <h2>Our Mission</h2>
                    <p>As part of the Bangladesh Mart Group, our mission is to make it easy to do business anywhere. </p>

                    <p>We do this by giving suppliers the tools necessary to reach a global audience for their products, and by helping buyers find products and suppliers quickly and efficiently.</p>
                </div>
                <div className="maps">
                    <h2>Our Location</h2>
                    <Maps></Maps>
                </div>
                
            </div>

        </div>
    );
};

export default AboutPage;