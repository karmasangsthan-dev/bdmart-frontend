import { Rating } from '@mui/material';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import AddReview from './AddReview';

const ProductDescription = ({ product }) => {
    
    const arrayOfStrings = product?.keyFeatures?.map(obj => `${obj?.title} ${obj?.desc}`);
    var liData = arrayOfStrings || [];


    // Split the liData into two separate arrays
    // split the li data into two separate arrays 
    var leftSide = liData?.slice(0, Math.ceil(liData?.length / 2));
    var rightSide = liData?.slice(Math.ceil(liData?.length / 2));

    return (
        <div className='product-description-container '>
            <h6 className='heading'>Product details of {product?.title}</h6>

            <div className="product-description">
                <div style={{ borderBottom: ' 1px solid #eff0f5' }} className='d-flex justify-content-between'>
                    <ul style={{ listStyleType: 'initial' }} className='w-50'>
                        {
                            leftSide?.map((li, i) => <li key={i}>{li}</li>)
                        }

                    </ul>
                    <ul style={{ listStyleType: 'initial' }} className='w-50'>
                        {
                            rightSide?.map((li, i) => <li key={i}>{li}</li>)
                        }
                    </ul>
                </div>
                <div>
                    <h5 className='heading-description'>Specifications of {product?.title}</h5>
                    <div className='d-flex justify-content-between'>
                        <ul style={{ listStyleType: 'initial' }} className='w-50'>
                            {
                                product?.brand && <li>Brand : {product?.brand} </li>
                            }
                            {
                                !product?.brand && <li>Brand : <span className='text-danger'>Not Found</span> </li>
                            }

                        </ul>
                        <ul style={{ listStyleType: 'initial' }} className='w-50'>
                            {
                                product?.sku && <li>SKU : {product?.sku} </li>
                            }
                            {
                                !product?.sku && <li>SKU : <span className='text-danger'>Not Found</span> </li>
                            }
                        </ul>
                    </div>
                    <div className='mt-3'>
                        <p className='what-in-box'><span style={{ fontWeight: 'bold' }}>What’s in the box:</span> <span className='ms-5'>{product?.whatInTheBox ? product?.whatInTheBox : 'BUY 1 GET 1, Square LED Digital Sports Watch , Water Resistance LED Wrist Watch, COMBO OFFER'}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;