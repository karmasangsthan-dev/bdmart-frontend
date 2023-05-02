import Image from 'next/image';
import React from 'react';

const LandingImage = () => {
    return (
        <>
            <div className="landing-img my-4">
                <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
                    <Image
                        className="d-block "
                        alt='Mountains'
                        src="/images/image(12).png"
                        loading="eager"
                        layout="responsive"
                        width={100}
                        height={100}
                    />
                </div>

            </div>
        </>
    );
};

export default LandingImage;