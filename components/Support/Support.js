import React from 'react';
import { CustomChat, FacebookProvider } from 'react-facebook';
const Support = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
        return <></>;
    }

    return (
        <div>
            <FacebookProvider appId={process.env.NEXT_PUBLIC_FB_APP_ID}>
                <CustomChat pageId={process.env.NEXT_PUBLIC_FB_PAGE_ID} minimized="true">

                </CustomChat>
            </FacebookProvider>
        </div>
    );
};

export default Support;