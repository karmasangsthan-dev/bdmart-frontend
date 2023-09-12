import React from 'react';

const ContactUs = () => {
    const handlePhoneCall = () => {
        window.location.href = 'tel:+1234567890';
    };
    const handlesendEmail = () => {
        window.location.href = 'mailto:contact@bangladeshmart.com.bd';
    };
    const handleNavigateLocation = () => {
        const latitude = 23.798548359326315;
        const longitude = 90.4265756426758;
        const mapsUrl = `https://www.google.com/maps/place/Mia+Bhai+Plaza/@23.7985585,90.4266118,21z/data=!4m6!3m5!1s0x3755c778f8f615ef:0x6090ac67efbb2f33!8m2!3d23.7985751!4d90.4266097!16s%2Fg%2F11fl0bwvbs?entry=ttu`;
        window.open(mapsUrl, '_blank');
    }
    return (
        <div className='contact-container bg-white'>
            <div className="contact-content-hd">
                <div className="contact-cards">
                    <div className="contact-card">
                        <span className="logo">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </span>
                        <h5>Email Us</h5>
                        <p><span onClick={handlesendEmail}>contact@bangladeshmart.com.bd</span> Interactively grow empowered for process-centric total linkage.</p>
                    </div>
                    <div className="contact-card">
                        <span className="logo">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </span>
                        <h5>call Us</h5>
                        <p><span onClick={handlePhoneCall}>+12 34567890</span> Distinctively disseminate focused solutions clicks-and-mortar ministate..</p>
                    </div>
                    <div className="contact-card">
                        <span className="logo">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </span>
                        <h5>Location</h5>
                        <p><span onClick={handleNavigateLocation}>1020 Vatara Road, Notun Bazar, Dhaka 1212, Bangladesh.</span> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;