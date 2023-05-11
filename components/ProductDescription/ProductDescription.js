import { Rating } from '@mui/material';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import AddReview from './AddReview';

const ProductDescription = ({ product }) => {

    return (
        <div className="product-description">
            <Tabs defaultActiveKey="product-info" id="product-tabs">
                <Tab eventKey="product-info" title="Product Information">
                    <h2>Product Information</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                    <ul>
                        <li>Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit.</li>
                        <li>Vivamus finibus vel mauris ut vehicula.</li>
                        <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                </Tab>

                <Tab eventKey="additional-info" title="Additional Information">
                    <h4>Information</h4>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.</p>
                    <h4>Fabric & care</h4>
                    <ul>
                        <li>Faux suede fabric</li>
                        <li>Gold tone metal hoop handles.</li>
                        <li>RI branding </li>
                        <li>Snake print trim interior </li>
                        <li>Adjustable cross body strap</li>
                        <li>Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm</li>
                    </ul>
                    <h4>Size</h4>
                    one size
                </Tab>
                <Tab eventKey="shipping" title="Shipping & Returns">
                    <h2>Delivery & returns</h2> <br />
                    <p>
                        We deliver to over 100 countries around the world. For full
                        details of the delivery options we offer, please view our
                        Delivery information We hope you’ll love every purchase, but if
                        you ever need to return an item you can do so within a month of
                        receipt. For full details of how to make a return, please view
                        our Returns information
                    </p>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <h4>Reviews</h4>
                    <div className="review">
                        <div className='row no-gutters'>
                            <div className="col-auto">
                                <h4>John Doe</h4>
                                <div className="ratings-container">
                                    <Rating
                                        name="read-only"
                                        value={parseInt(product?.rating)}
                                        readOnly
                                    />
                                </div>
                                <span>6 days ago</span>
                            </div>
                            <div className="col">
                                <h4>Good, perfect size</h4>
                                <div className="review-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                </div>
                                <div className="review-actions">
                                    <span className='text-underline-hover'>Helpful (2)</span><span className='ms-3 text-underline-hover'>Unhelpful (0)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review">
                        <div className='row no-gutters'>
                            <div className="col-auto">
                                <h4>Samanta J.</h4>
                                <div className="ratings-container">
                                    <Rating
                                        name="read-only"
                                        value={parseInt(product?.rating)}
                                        readOnly
                                    />
                                </div>
                                <span>5 days ago</span>
                            </div>
                            <div className="col">
                                <h4>Very good</h4>
                                <div className="review-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                </div>
                                <div className="review-actions">
                                    <span className='text-underline-hover'>Helpful (2)</span><span className='ms-3 text-underline-hover'>Unhelpful (0)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="reply">
                        <AddReview></AddReview>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default ProductDescription;