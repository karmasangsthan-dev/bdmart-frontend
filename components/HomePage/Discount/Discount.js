import React from 'react';
import { useGetAllProductsQuery } from '../../../features/product/productApi';
import Slider from 'react-slick';
import { Rating } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

const SampleNextArrow = (props) => {
    const { onClick } = props
    return (
        <div className='control-btn' onClick={onClick}>
            <button className='next'>
                <i className='fa fa-long-arrow-alt-right'></i>
            </button>
        </div>
    )
}
const SamplePrevArrow = (props) => {
    const { onClick } = props
    return (
        <div className='control-btn' onClick={onClick}>
            <button className='prev'>
                <i className='fa fa-long-arrow-alt-left'></i>
            </button>
        </div>
    )
}


const Discount = () => {
    const { data, isLoading } = useGetAllProductsQuery();
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    console.log(data?.data)
    return (

        <div>
            <section className=''>
                <div style={{ maxWidth: '1240px' }} className='mx-auto '>
                    <div className="">
                        <div className="col-lg-12 col-md-12 col-sm-12 w">
                            <div className="gal-head">
                                <h2>Big Discount</h2>
                            </div>
                        </div>
                    </div>

                    {
                        isLoading ? (
                            <div>
                                <Slider {...settings}>
                                    {
                                        [1, 2, 3, 4, 5, 6].map((product, i) => {
                                            return (
                                                <div key={i} className='mb-1' >
                                                    <div className='product-link bestselling-product-container  border px-3 py-2 m-3  rounded-3 shadow' >
                                                        <div className=''>
                                                            <Skeleton style={{ width: '100%', height: '139px' }} ></Skeleton>
                                                        </div>

                                                        <p className="item-name mt-2 mb-0"><Skeleton></Skeleton></p>

                                                        <Skeleton className='mt-0' style={{ width: '50px' }}></Skeleton>

                                                        <div className="old-price">
                                                            <del style={{ display: 'inline-block' }}><Skeleton className='mt-0' style={{ width: '50px' }}></Skeleton></del><span className='ms-2'><Skeleton className='mt-0' style={{ width: '50px' }}></Skeleton></span>
                                                        </div>

                                                        <div className='d-flex align-items-center'>
                                                            <Skeleton style={{ width: '80px' }}></Skeleton>
                                                            <p className='mb-0 ms-1' style={{ fontSize: '13px' }}><Skeleton style={{ width: '30px' }}></Skeleton></p>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        ) : (
                            <div>
                                <Slider {...settings}>
                                    {
                                        data?.data?.map(product => {
                                            return (
                                                <div className='mb-1' key={product?._id}>
                                                    <div className='product-link bestselling-product-container  border p-3 m-3  rounded-3 shadow' >
                                                        <div className=''>
                                                            <img className='border' style={{ width: '100%', height: '139px' }} src={product?.thumbnail} alt='' />
                                                        </div>
                                                        <p style={{ minHeight: '42px' }} className="item-name mt-2 mb-0">{product?.title.length > 37 ? `${product?.title.slice(0, 30)} ...` : product?.title}</p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className='item-price'>${product?.price}</span>

                                                        </div>
                                                        <div className="old-price">
                                                            <del>{product?.oldPrice ? product?.oldPrice : 40}.00$</del><span className='ms-2'>-61%</span>
                                                        </div>
                                                        <div className='d-flex align-items-center'>
                                                            <Rating
                                                                style={{ fontSize: '15px', marginLeft: '-3px' }}
                                                                name="read-only"
                                                                value={parseInt(product?.rating)}
                                                                readOnly
                                                            />
                                                            <p className='mb-0 ms-1' style={{ fontSize: '13px' }}>({parseInt(product?.rating)})</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    );
};

export default Discount;