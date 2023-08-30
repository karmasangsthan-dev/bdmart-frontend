import React from 'react';

const UserProfileInfo = ({user}) => {
    const shortedEmail = (email) => {
        const emailFirstPart = email?.split('@')[0];
        const emailSecondPart = email?.split('@')[1];
        const firstFour = emailFirstPart?.slice(0, 4);
        const lastFour = emailFirstPart?.slice(-4);
        const generatedEmail = firstFour + '*******' + lastFour + '@' + emailSecondPart

        return generatedEmail;
    }
    return (
        <div className="sidebar-content-profile sidebar-profile-info">
            <img className='mb-2' src={user?.profilePicture || "https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png"} alt="" />
            <p>Name: {user?.fullName}</p>
            <p title={user?.email}>Email: {user?.email.length > 25 ? shortedEmail(user?.email) : user?.email}</p>
            <p title={user?.contactNumber}>Phone: {user?.contactNumber ? user?.contactNumber : '+88012345678'}</p>
            {user?.status === 'inactive' && <p >Account status : <span className='text-danger'>inactive</span></p>}
            {user?.status === 'active' && <p >Account status : <span className='text-success'>active</span></p>}
        </div>
    );
};

export default UserProfileInfo;