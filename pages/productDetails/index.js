import { Breadcrumbs, Link } from '@mui/material';
import Layout from '../../components/Layout';

const productDetails = () => {
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    return (
        <Layout>
            <div className="container">
                <div role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/shop"
                        >
                            Shop
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href="/"
                            aria-current="page"
                        >
                            Product
                        </Link>
                    </Breadcrumbs>
                </div>
                <div className='d-flex '>
                    <div className="col-md-6">
                        <h2>image</h2>
                    </div>
                    <div className="col-md-6">
                        <p>description</p>
                    </div>

                </div>
            </div>
        </Layout>
    );
};



export default productDetails;