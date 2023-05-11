import { Rating } from '@mui/material';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import AddReview from './AddReview';

const ProductDescription = ({ product }) => {

    return (
        <div className="product-description">
            <Tabs style={{ paddingLeft: '20px' }} defaultActiveKey="product-info" id="product-tabs">
                <Tab eventKey="product-info" title="Product Information">

                    <div class="container">
                        <div class="row">
                            <h4 className='mt-2'>Product Information:</h4>

                            {
                                product?.category === "smartphones" && <div class="col-lg-6 ">
                                    <p>Operating System: Android</p>
                                    <p>Display size (inches) : 08"06'
                                    </p>
                                    <p>Screen resolution (pixels) : 1020x1890px</p>
                                    <p>Processor type : Snapdragon</p>
                                    <p>RAM : 8gb</p>
                                    <p>Storage capacity : 128gb</p>
                                    <p>Rear camera resolution : 108 megapixels</p>
                                    <p>Front camera resolution : 16 megapixels</p>
                                    <p>Battery capacity : 6000 mAh</p>
                                </div>
                            }
                            {
                                product?.category === "smartphones" && <div class="col-lg-6 ">
                                    <p>SIM card type : Dual-SIM</p>
                                    <p>Network connectivity : 5G</p>
                                    <p>Bluetooth version : Not Specified'
                                    </p>
                                    <p>Water resistance rating : IP68</p>
                                    <p>Fingerprint : Yes</p>

                                </div>
                            }
                            {
                                product?.category === "laptops" && <div class="col-lg-6 ">
                                    <p>Brand : HP</p>
                                    <p>Model : Hp-300</p>
                                    <p>Processor : Intel Core i7
                                    </p>
                                    <p>Graphics Card : NVIDIA GeForce RTX 3060</p>
                                    <p>RAM : 16GB DDR4</p>
                                    <p>Storage : 512GB SSD</p>
                                </div>
                            }
                            {
                                product?.category === "fragrances" && <div class="col-lg-6 ">
                                    <p>Volume : 100 ml</p>
                                    <p>Scent : Floral</p>
                                    <p>Gender : Women</p>
                                    <p>Type : Eau de Parfum</p>
                                    <p>Top Notes : Bergamot, Lemon, Pear</p>

                                </div>
                            }
                            {
                                product?.category === "fragrances" && <div class="col-lg-6 ">
                                    <p>Heart Notes : Rose, Jasmine, Ylang-ylang</p>
                                    <p>Base Notes : Vanilla, Musk, Patchouli</p>
                                    <p>Longevity : Long Lasting</p>
                                    <p>Sillage : Moderate</p>
                                    <p>Occasion : Evening</p>
                                </div>
                            }
                            {
                                product?.category === "skincare" && (
                                    <div class="col-lg-6 ">
                                        <p>Product Type: Moisturizer</p>
                                        <p>Skin Type: Combination/Oily</p>
                                        <p>Ingredients: Aloe Vera, Hyaluronic Acid, Vitamin C</p>
                                        <p>Scent: Unscented</p>
                                        <p>Texture: Lightweight Cream</p>
                                    </div>
                                )
                            }
                            {
                                product?.category === "skincare" && (
                                    <div class="col-lg-6 ">
                                        <p>SPF: 30</p>
                                        <p>Volume: 50 ml</p>
                                        <p>Cruelty-Free: Yes</p>
                                        <p>Free From: Parabens, Sulfates, Fragrance</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>


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