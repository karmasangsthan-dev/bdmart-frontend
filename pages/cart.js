import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import CartProductRow from "../components/Cart/CartProductRow";
import { useRouter } from "next/router";

const cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.cart);
  const { cartProducts } = useSelector((state) => state?.cart);
  console.log({cart,cartProducts})
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((cartItem) => {
      const quantity = cartItem?.quantity;
      const product = cartProducts?.find((p) => p?._id === cartItem?.id);
      if (product?.price && quantity) {
        total += product.price * quantity;
      }
    });
    return total.toFixed(2);
  };
  console.log(cartProducts)

  return (
    <Layout title="Cart - Bangladesh Mart">
      <div style={{ minHeight: "120vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <table className="table table-cart table-mobile">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartProducts?.map((product, index) => {
                      return (
                        <CartProductRow product={product} key={index}></CartProductRow>
                      )
                    })
                  }
                </tbody>
              </table>

            </div>
            <aside className="col-lg-3">
              <div className="summary summary-cart ">
                <h3 className="summary-title">Cart Total</h3>
                <table className="table table-summary">
                  <tbody>
                    <tr className="summary-total">
                      <td>Total:</td>
                      <td>${calculateTotal()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
              onClick={()=> router.push('/checkout')}
                  className="mt-3 btn bg-dark border border-dark border-2 py-2 px-5 text-white text-decoration-none"
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
