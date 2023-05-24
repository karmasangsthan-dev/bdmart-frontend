import React from 'react';

const OrderCard = ({ order }) => {
    
    return (
        <>
            <div className="list-group mb-5 shadow" >

                <div className="list-group-item p-3 bg-snow" style={{ position: "relative" }}>
                    <div className="row w-100 no-gutters">

                        <div className="col-6 col-md">
                            <h6 className="text-charcoal mb-0 w-100">Order Id</h6>
                            <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">#<span className='text-primary'>A42D</span></p>
                        </div>
                        <div className="col-6 col-md">
                            <h6 className="text-charcoal mb-0 w-100">Date</h6>
                            <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">Monday</p>
                        </div>


                        <div className="col-6 col-md">
                            <h6 className="text-charcoal mb-0 w-100">Payment Method</h6>
                            <p className="text-danger mb-0 w-100 mb-2 mb-md-0">{order?.paymentMethod ? order?.paymentMethod : 'Not Found'}</p>
                        </div>

                        <div className="col-3 col-md">
                            <h6 className="text-charcoal mb-0 w-50">Status</h6>
                            <p className="text-danger mb-0 w-100 mb-2 mb-md-0">{order?.status ? order?.status : 'Not Found'}</p>
                        </div>


                        <div className="col-12 col-md-3">
                            <button disabled className="btn btn-success w-100">Your Order was pending...</button>

                        </div>
                    </div>
                    <div className="row w-100 mt-1">
                        <div className="col-6 col-md">
                            <h6 className="text-charcoal mb-0 w-100">Total Price: $100</h6>
                        </div>
                    </div>

                </div>
                <div className="list-group-item p-3 bg-white">
                    {
                        order?.products.map((product, i) => {
                            return (
                                <div key={i} className="row p-2 pe-0">
                                    <div style={{ border: '1px solid #ddd', borderRadius: '7px' }} className="row g-2 ">
                                        <div className="col-3 col-md-1">
                                            <img width={50} height={40} className=" pr-3" src={product?.thumbnail} alt="" />
                                        </div>
                                        <div className="col-9 col-md-4 pr-0 pr-md-3 d-flex align-items-center">
                                            <div>
                                                <h6 className="text-charcoal mb-2 mb-md-1">Name: {product?.title}
                                                </h6>
                                                <h6 className="text-charcoal text-left mb-0 mb-md-2"><b>Price: ${product?.price}</b></h6>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex align-items-center">
                                            <h6>Quantity : {product?.quantity}</h6>
                                        </div>
                                        <div className="col-md-4 d-flex align-items-center">
                                            <h6>Total Price : ${product?.price * product?.quantity}</h6>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default OrderCard;