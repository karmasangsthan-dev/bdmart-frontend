import React from 'react';
import Layout from '../components/Layout';
import ForgetPassword from '../components/Shared/Login/ForgetPassword/ForgetPassword';

const ForgetUserPassword = () => {
    return (
        <Layout >
            <main className="mainnnnn forget-margin" style={{ background: '#eff0f5' ,marginTop:'-15px'}}>
                <ForgetPassword ></ForgetPassword>

            </main>
        </Layout>
    );
};

export default ForgetUserPassword;