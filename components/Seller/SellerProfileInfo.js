import React from 'react';

const SellerProfileInfo = ({seller}) => {
    const shortedEmail = (email) => {
        const emailFirstPart = email.split('@')[0];
        const emailSecondPart = email.split('@')[1];
        const firstFour = emailFirstPart.slice(0, 4);
        const lastFour = emailFirstPart.slice(-4);
        const generatedEmail = firstFour + '*******' + lastFour + '@' + emailSecondPart

        return generatedEmail;
    }
    return (
        <div className="sidebar-content-profile sidebar-profile-info">
            <img className='mb-2' src={seller?.profilePicture || "https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png"} alt="" />
            <p>Name: {seller?.name}</p>
            <p title={seller?.email}>Email: {seller?.email.length > 25 ? shortedEmail(seller?.email) : seller?.email}</p>
            <p title={seller?.phone}>Phone: {seller?.phone ? seller?.phone : '+88012345678'}</p>
            {seller?.status === 'inactive' && <p >Account status : <span className='text-danger'>inactive</span></p>}
            {seller?.status === 'active' && <p >Account status : <span className='text-success'>active</span></p>}
        </div>
    );
};

export default SellerProfileInfo;