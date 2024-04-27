import React from 'react';
import Layout from '../components/Layout';
import { toast } from 'react-hot-toast';
import ContactUs from '../components/Shared/ContactUs/ContactUs';
import Footer from '../components/Shared/Footer/Footer';

const contact = () => {
    const handleContactFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const companyName = event.target.company.value;
        const message = event.target.message.value;
        toast.success('Email sent Successfull...')
    }
    return (
        <Layout title='Contact Us - Bangladesh Mart'>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </Layout>
    );
};

export default contact;