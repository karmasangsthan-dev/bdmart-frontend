import React from 'react';
import Layout from '../../../components/Layout';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import RfqForm from '../../../components/SubmitRfq/RfqForm';

const index = () => {
    return (
        <Layout>
            <RfqForm></RfqForm>
        </Layout>
    );
};

export default index;