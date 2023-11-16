import React from 'react';
import Layout from '../components/Layout';
import AboutPage from '../components/AboutPage/AboutPage';
import Footer from '../components/Shared/Footer/Footer';

const aboutUs = () => {
    return (
        <Layout>
            <AboutPage></AboutPage>
            <Footer></Footer>
        </Layout>
    );
};

export default aboutUs;