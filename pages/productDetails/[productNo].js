import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { Breadcrumbs, Link, Rating } from '@mui/material';
import { Form, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';

const productNo = (props) => {
    const [quantity, setQuantity] = useState(1);
    const product = props?.data;
    const products = props?.products.products;
    const router = useRouter();
    function handleClick(event) {
        event.preventDefault();
    }


    const handleQunatityIncrement = (id) => {
        setQuantity(quantity + 1)
    }
    const handleQunatityDecrement = (id) => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <Layout>
            <div style={{ minHeight: '120vh' }} className="container">
                <div role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link onClick={() => router.push('/')} color="inherit" underline="hover" href="/">
                            Home
                        </Link>
                        <Link
                            onClick={() => router.push('/shop')}
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
                        <img src={product.thumbnail} alt="" />
                    </div>
                    <div className="col-md-6">
                        <h3>Name: {product?.title}</h3>
                        <div className="d-flex justiy-content-center">
                            <div className="ratings">
                                <Rating name="read-only" value={parseInt(product?.rating)} readOnly />
                            </div>
                            <div className="ratings-texts">
                                ( 2 Reviews )
                            </div>
                        </div>
                        <p>Product Id : {product?.id}</p>
                        <p>{product?.description}</p>
                        {product?.color && <p>{product?.color}</p>}
                        <div className='d-flex align-items-center gap-2'>
                            <h6 style={{ minWidth: '50px' }}>Size:</h6>
                            <Form.Select className='product-description-size' style={{ minWidth: '156px', maxWidth: '156px' }} aria-label="Default select example">
                                <option>Select Size</option>
                                <option value="XL">XL</option>
                                <option value="L">L</option>
                                <option value="M">M</option>
                                <option value="S">S</option>
                            </Form.Select>
                        </div>
                        <div className="product-quantity d-flex align-items-center gap-2 mt-2">
                            <h6 style={{ minWidth: '50px' }}>Qty:</h6>
                            <div class="">
                                <div class="qty-container">
                                    <button onClick={() => handleQunatityDecrement(product?.id)} class="qty-btn-minus btn-light" type="button"><i class="fa fa-minus"></i></button>
                                    <input type="text" name="qty" value={quantity} class="input-qty" />
                                    <button onClick={() => handleQunatityIncrement(product?.id)} class="qty-btn-plus btn-light" type="button"><i class="fa fa-plus"></i></button>
                                </div>
                            </div>

                        </div>
                        <div className='mt-2'>
                            <div id="cart-btn" >
                                <button onClick={() => toast.success('Product added to Cart')} style={{ minWidth: '214px !important' }} className="cart-btn w-auto px-3 py-1" >Add to Cart<i className="far plus-ico fa-plus-square"></i></button>
                            </div>

                        </div>
                        <div>
                            <h6>Category: {product?.category}</h6>
                        </div>
                        <div className="share">
                            <div className="d-flex align-items-center">
                                <h6>Share</h6>
                                <div class="share-buttons">
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com" target="_blank"><i class="fab fa-facebook"></i></a>
                                    <a href="https://twitter.com/intent/tweet?url=https://example.com" target="_blank"><i class="fab fa-twitter"></i></a>
                                    <a href="https://pinterest.com/pin/create/button/?url=https://example.com&media=https://example.com/image.jpg&description=Description%20here" target="_blank"><i class="fab fa-pinterest"></i></a>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div class="product-description">
                    <Tabs defaultActiveKey="product-info" id="product-tabs">
                        <Tab eventKey="product-info" title="Product Information">
                            <h2>Product Information</h2>

                        </Tab>

                        <Tab eventKey="additional-info" title="Additional Information">
                            <h2>Information</h2>
                            <ul>
                                <li>Cras pretium blandit magna a consequat.</li>
                                <li>Etiam vel lacus eget leo eleifend rutrum.</li>

                            </ul>
                        </Tab>
                        <Tab eventKey="shipping" title="Shipping & Returns">
                            <h2>Delivery & returns</h2> <br />
                            <p>We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information
                                We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our Returns information</p>
                        </Tab>
                        <Tab eventKey="reviews" title="Reviews">
                            <h2>Reviews</h2>
                            <div class="review">
                                <div class="review-header">
                                    <h3>John Doe</h3>
                                    <span class="review-date">May 1, 2023</span>
                                    <div class="rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                                </div>
                                <div class="review-body">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet dui euismod, eleifend turpis in, efficitur nisi.</p>
                                </div>
                            </div>
                            <div class="review">
                                <div class="review-header">
                                    <h3>Jane Smith</h3>
                                    <span class="review-date">April 25, 2023</span>
                                    <div class="rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                                </div>
                                <div class="review-body">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet dui euismod, eleifend turpis in, efficitur nisi.</p>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <h4 className='text-center my-4'>You May Also Like</h4>

                <div className="shop page-content">
                    <div className="container">
                        <div className="row gap-4">

                            <div className="col-lg-9">

                                <div className="products ">
                                    <div className="shop-product-details ">
                                        {
                                            products?.filter((d) => d.category === `${product?.category}`).map((d) => {
                                                return (
                                                    <div key={d?.id} className='shop-single-product'>
                                                        <figure className='product-media'>
                                                            <span className="product-label label-top">Top</span>

                                                            <div onClick={() => router.push(`/productDetails/${d.id}`)} style={{ width: '217px', height: '217px' }}>
                                                                <Image
                                                                    width={217}
                                                                    height={217}
                                                                    src={d?.thumbnail}
                                                                    className=""
                                                                    alt=""

                                                                />
                                                            </div>
                                                            <button onClick={(e) => {
                                                                e.preventDefault();
                                                                toast.success('product added in cart');

                                                            }} className='shop-add-to-cart-button'>Add to Cart<i class="far plus-ico fa-plus-square" aria-hidden="true"></i></button>





                                                        </figure>
                                                        <div className="product-body">
                                                            <div className="product-cat">
                                                                <Link href="/shop/?category=fruit">
                                                                    {d?.category}
                                                                </Link>
                                                            </div>
                                                            <div className="product-title">
                                                                <p className='cursor-pointer' onClick={() => router.push(`/productDetails/${d.id}`)}>
                                                                    {d?.title}
                                                                </p>
                                                            </div>
                                                            <div className="product-price d-flex gap-2 justify-content-center">
                                                                <div className="new-price">
                                                                    <p>${d?.price}</p>
                                                                </div>
                                                                <div className="shop-old-price">
                                                                    <p>$45</p>
                                                                </div>
                                                            </div>
                                                            <div className="ratings-container mb-3">
                                                                <div className="ratings">
                                                                    <Rating name="read-only" value={parseInt(d?.rating)} readOnly />
                                                                </div>
                                                                <div className="ratings-texts">
                                                                    ( 2 Reviews )
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Layout >
    )
}


export async function getServerSideProps(context) {
    const productNo = context.query.productNo;
    const res = await fetch(`https://dummyjson.com/products/${productNo}`);
    const resProducts = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    const dataProducts = await resProducts.json();
    return {
        props: {
            data,
            products: dataProducts,
        }
    };
}

export default productNo;
