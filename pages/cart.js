import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import CartProductRow from "../components/Cart/CartProductRow";

const cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.cart);

  const { cartProducts } = useSelector((state) => state?.cart);

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((cartItem) => {
      const quantity = cartItem?.quantity;
      const product = cartProducts?.find((p) => p?._id === cartItem?.id);
      console.log({ product })
      if (product?.price && quantity) {
        total += product.price * quantity;
      }
    });
    return total.toFixed(2);
  };

  return (
    <Layout title="Cart - Bangladesh Mart">
      <div style={{ minHeight: "120vh" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-9">
              <table class="table table-cart table-mobile">
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
            <aside class="col-lg-3">
              <div class="summary summary-cart ">
                <h3 class="summary-title">Cart Total</h3>
                <table class="table table-summary">
                  <tbody>
                    <tr class="summary-total">
                      <td>Total:</td>
                      <td>${calculateTotal()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
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
