import React from 'react';
import Layout from '../components/Layout';
import { toast } from 'react-hot-toast';

const contact = () => {
    const handleContactFormSubmit =(event)=>{
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const companyName = event.target.company.value;
        const message = event.target.message.value;
        toast.success('Email sent Successfull...')
    }
    return (
        <Layout title='Contact Us - Bangladesh Mart'>
            <div className='contact-container' style={{ minHeight: '120vh' }}>
                <div className="contain">
                    <div className="wrapper ">
                        <div className="">
                            <h3 className="form-headline mb-4">Send us a message</h3>
                            <form onSubmit={handleContactFormSubmit} id="submit-form" >
                                <p>
                                    <input id="name" name='name' className="form-input" type="text" placeholder="Your Name*" required />
                                </p>
                                <p>
                                    <input id="email" name='email' className="form-input" type="email" placeholder="Your Email*" required />
                                </p>
                                <p className="full-width">
                                    <input name='company' id="company-name" className="form-input" type="text" placeholder="Company Name*" required />
                                    <small />
                                </p>
                                <p className="full-width">
                                    <textarea name='message' id="message" cols={30} rows={7} placeholder="Your Message*" required defaultValue={""} />
                                    <small />
                                </p>
                                <p className="full-width"><input type="checkbox" id="checkbox" name="checkbox" defaultChecked /> Yes, I would like to receive communications by call / email about Company's services.</p>
                                <p className="full-width">
                                    <input type="submit" className="submit-btn" defaultValue="Submit" />
                                    <input type="reset" className="reset-btn" defaultValue="Reset" />

                                </p>
                            </form>
                        </div>
                        <div className="contacts contact-wrapper">
                            <ul>
                                <li>Unleash Your E-commerce Potential: Let's Collaborate and Achieve Success Together!</li>
                                <span className="hightlight-contact-info">
                                    <li className="email-info"><i className="fa fa-envelope me-2" aria-hidden="true" />contact@bangladeshmart.com.bd</li>
                                    <li><i className="fa fa-phone" aria-hidden="true" /> <span className="highlight-text">+880 12 3333 4444</span></li>
                                </span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default contact;