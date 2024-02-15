import { useRouter } from 'next/router';
import React from 'react';

const SubmitRfq = () => {
    const router = useRouter();
    return (
        <div className='rfq-container'>
            <div className="rfq-banner">
                <button onClick={()=>router.push('/submit-rfq/new')}>Request for Quote</button>
                
            </div>
            <div className="rfq-content">
                
            </div>
        </div>
    );
};

export default SubmitRfq;