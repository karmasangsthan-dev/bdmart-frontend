import { Breadcrumbs, Link } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Shared/Footer/Footer';

const NotFoundPage = () => {

    const router = useRouter();
    return (
        <div style={{ minHeight: '120vh' }}>
            <Layout>
                <div className="main" >
                    
                    <div className="error-content text-center position-relative" style={{ backgroundImage: 'url("/images/error-bg.jpg")' }}>
                        <div className="container">

                            <h1 className="error-title">Error 404</h1>
                            <p>We are sorry, the page you've requested is not available.</p>
                            
                            <button onClick={()=> router.push('/')} className='btn custom-back-to-homepage'>
                                <span>BACK TO HOMEPAGE</span>
                                <i className="icon-long-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </Layout>
        </div>
    );
};

export default NotFoundPage;