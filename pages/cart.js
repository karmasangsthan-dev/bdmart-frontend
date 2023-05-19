import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Header from "../components/Shared/Header/Header";
import Layout from "../components/Layout";
import Image from "next/image";
import { useSelector } from "react-redux";
import CartProductRow from "../components/Cart/CartProductRow";
import { useGetAllProductsQuery } from "../features/product/productApi";
import { useUpdateCartMutation } from "../features/auth/authApi";
import { toast } from "react-hot-toast";

const cart = () => {
  const [subTotal, setSubtotal] = useState(0);
  const [cart, setCart] = useState([]);
  const user = useSelector((state) => state?.auth?.user);
  const { data, isSuccess, isError } = useGetAllProductsQuery();
  const [updateCart, { isSuccess: success, isLoading: loading }] =
    useUpdateCartMutation();
  const products = data?.data;

  const handleUpdateCart = () => {
    const token = localStorage.getItem("accessToken");
    const updatedProducts = user?.cart?.map((item) => {
      return { product: item?.product?._id, quantity: item?.quantity };
    });
    updateCart({ token, userId: user?._id, cartProducts: updatedProducts });
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...", { id: "updateCart" });
    }

    if (success) {
      toast.success("Updated successful", { id: "updateCart" });
    }
  }, [success, loading]);

  useEffect(() => {
    let subTotal_ = 0;

    if (user?.cart?.length) {
      for (let i = 0; i < user.cart.length; i++) {
        subTotal_ += user.cart[i].product.price;
      }
    }

    setSubtotal(subTotal_);
  }, [user]);
  return (
    <Layout title="Cart - Bangladesh Mart">
      <div style={{ minHeight: "120vh" }}>
        <div className="container">
          <Table responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {user?.cart?.map((item) => (
                <CartProductRow item={item} key={item} />
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Link
              className="btn bg-dark py-2 px-4 text-white text-decoration-none"
              href="/"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="mr-[5px]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke-linecap="square"
                  stroke-miterlimit="10"
                  stroke-width="48"
                  d="M244 400L100 256l144-144M120 256h292"
                ></path>
              </svg>{" "}
              Continue Shopping
            </Link>
            <button
              className=" btn bg-white border border-dark border-2 py-2 px-4 text-dark text-decoration-none"
              href="/"
              onClick={handleUpdateCart}
            >
              Save Cart
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <div className="coupon mt-5">
              <h4>Coupon Discount</h4>
              <h6>Enter your coupon code if you have one.</h6>
              <input
                style={{ border: "1px solid #ddd", outline: "none" }}
                className="px-4 py-2 "
                type="text"
                placeholder="Coupon code"
              />{" "}
              <br />
              <button
                className="mt-3 btn bg-dark border border-dark border-2 py-2 px-4 text-white text-decoration-none"
                href="/"
              >
                Apply Coupon
              </button>
            </div>
            <div>
              <div
                style={{ minWidth: "250px", border: "1px solid #ddd" }}
                className="subtotal mt-5 px-4 py-3"
              >
                <li className="d-flex justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>${subTotal}</span>
                </li>
                <hr />
                <li className="d-flex justify-content-between">
                  <span className="fw-bold">Total:</span>
                  <span>${subTotal + 100}</span>
                </li>
              </div>
              <button
                className="mt-3 btn bg-dark border border-dark border-2 py-2 px-5 text-white text-decoration-none"
                href="/"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default cart;
