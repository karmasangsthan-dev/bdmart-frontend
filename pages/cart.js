import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import CartProductRow from '../components/Cart/CartProductRow';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { useCartProductsTotal } from '../helperHooks/useCartProductsTotal';

const cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.cart);
  const { cartProducts } = useSelector((state) => state?.cart);
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );

  const total = useCartProductsTotal(cartProducts);

  return (
    <Layout title="Cart - Bangladesh Mart">
      <div style={{ minHeight: '120vh' }}>
        <div className="container">
          <div className="row cart-container">
            <div className="col-lg-9">
              {cart?.length < 1 ? (
                <div className='empty-cart-div'>
                  <div className='di1'>
                    <img width="48" height="48" src="https://img.icons8.com/color/48/high-priority.png" alt="high-priority" />
                  </div>
                  <div className='di2'>
                    <img width="35" height="35" src="https://img.icons8.com/color/48/add-shopping-cart--v1.png" alt="shopping-cart" />
                    <p>Your Cart Is Empty. Please add product at first</p>
                  </div>
                </div>
              ) : (
                <div className="cart-table table-responsive">
                  <table className="table table-cart table-mobile ">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!cartProducts ? (
                        <>
                          <tr>
                            <td className="product-col ">
                              <div className="d-flex align-items-center">
                                <Skeleton
                                  style={{ width: '60px', height: '60px' }}
                                ></Skeleton>
                                <p className="product-title mb-0 ms-3">
                                  <Skeleton
                                    style={{ width: '50px' }}
                                  ></Skeleton>
                                </p>
                              </div>
                            </td>
                            <td className="cart-price-col">
                              <p
                                style={{ height: '60px' }}
                                className="d-flex align-items-center"
                              >
                                <Skeleton style={{ width: '50px' }}></Skeleton>
                              </p>
                            </td>
                            <td className="quantity-col">
                              <div
                                style={{ height: '60px' }}
                                className="product-quantity  d-flex align-items-center"
                              >
                                <div className="qty-container">
                                  <Skeleton
                                    style={{ width: '80px' }}
                                  ></Skeleton>
                                </div>
                              </div>
                            </td>
                            <td className="total-col">
                              <p
                                className="mb-0 d-flex align-items-center"
                                style={{ height: '60px' }}
                              >
                                <Skeleton style={{ width: '40px' }}></Skeleton>
                              </p>
                            </td>
                            <td className="remove-col">
                              <div
                                style={{ height: '60px' }}
                                className="d-flex  align-items-center"
                              >
                                <Skeleton style={{ width: '50px' }}></Skeleton>
                              </div>
                            </td>
                          </tr>
                        </>
                      ) : (
                        cartProducts?.map((product, index) => {
                          return (
                            <CartProductRow product={product} key={index} />
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <aside className="col-lg-3">
              <div className="summary summary-cart ">
                <h3 className="summary-title">Cart Total</h3>
                <table className="table table-summary">
                  <tbody>
                    <tr className="summary-total">
                      <td>Total:</td>
                      <td>
                        {(total * currencyRate).toFixed(2)} {currency}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => router.push('/')}
                className="btn px-5 py-2 continue-shopping"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push('/checkout')}
                className="confirm-order-button d-flex align-items-center gap-2 mt-3"
              >
                Proceed to checkout
              </button>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default cart;
