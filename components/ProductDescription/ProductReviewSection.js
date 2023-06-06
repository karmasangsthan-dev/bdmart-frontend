import { Rating } from '@mui/material';
import React from 'react';

const ProductReviewSection = ({ product }) => {
    console.log(product, 'product')
    return (
        <div className='review-section-container py-3 px-4 my-5' style={{ background: '#eff0f5' }}>
            <h5 className='review-container-title'>Ratings & Reviews of {product?.title}</h5>
            <div className='review-statics '>
                <div className="col-md-6 d-flex justify-content-between">
                    <div>
                        <p>{product?.rating.toFixed(1)}/5</p>
                        <Rating
                            name="read-only"
                            value={parseInt(product?.rating)}
                            readOnly
                        />
                        <p>677 Ratings </p>
                    </div>
                    <div>
                        <div className='d-flex'>
                            <Rating
                                name="read-only"
                                value={5}
                                readOnly
                            />
                            <p className='ms-2'> (65)</p>
                        </div>
                        <div className='d-flex'>
                            <Rating
                                name="read-only"
                                value={4}
                                readOnly
                            />
                            <p className='ms-2'> (5)</p>
                        </div>
                        <div className='d-flex'>
                            <Rating
                                name="read-only"
                                value={3}
                                readOnly
                            />
                            <p className='ms-2'> (6)</p>
                        </div>
                        <div className='d-flex'>
                            <Rating
                                name="read-only"
                                value={2}
                                readOnly
                            />
                            <p className='ms-2'> (2)</p>
                        </div>
                        <div className='d-flex'>
                            <Rating
                                name="read-only"
                                value={1}
                                readOnly
                            />
                            <p className='ms-2'> (10)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-reviews">
                <p>Product Reviews : </p>
                <div className='all-reviews'>
                    {
                        [1, 2, 3, 4, 5].map(review => <div className="review-card border card px-3 py-2 mb-3">
                            <Rating
                                name="read-only"
                                value={4}
                                readOnly
                            />
                            <p>By Md Altaf Hossen. <span className='text-success'>Verified Purchase</span></p>
                            <p>Wow !! this product was really awesome !! Thank you !!</p>
                            <div >
                                <img width="25" height="25" src="https://img.icons8.com/color/48/facebook-like--v1.png" alt="facebook-like--v1" /> (0)
                                <img width="25" className='mt-2 ms-5' height="25" src="https://img.icons8.com/color/48/thumbs-down.png" alt="thumbs-down" /> (0)
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductReviewSection;