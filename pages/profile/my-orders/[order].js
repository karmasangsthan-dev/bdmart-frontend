import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import Layout from "../../../components/Layout";
import { useGetSingleOrderByIdQuery } from "../../../features/product/productApi";
import Loading from "../../../components/Shared/Loading/Loading";
import Image from "next/image";
import { Table } from "react-bootstrap";

const Order = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { order },
  } = router;

  const { data, isLoading: orderLoading } = useGetSingleOrderByIdQuery(order);
  let totalAmount = 0;
  for (let i = 0; i < data?.products?.length; i++) {
    totalAmount =
      totalAmount + data.products[i].quantity * data.products[i].price;
  }
  return (
    <Layout title="Order">
      {orderLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            className="order-container mx-5 px-5 my-3 py-4 rounded-2"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <div className="d-flex justify-content-between">
              <div>
                <h4>INVOICE</h4>
                <p>STATUS</p>
              </div>
              <div>
                <img
                  src="https://bangladeshmart.com.bd/_ipx/w_256,q_75/%2Fimages%2Flogo2.jpg?url=%2Fimages%2Flogo2.jpg&w=256&q=75"
                  alt="dashtar"
                  width={150}
                />
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-5 align-items-start">
              <div>
                <h6>DATE</h6>
                <p>May 1, 2023</p>
              </div>
              <div>
                <h6>INVOICE NO</h6>
                <p>#15454</p>
              </div>
              <div className="text-end">
                <h6>INVOICE TO</h6>
                <p>{data?.name}</p>
                <p>
                  {data?.postcode}, {data?.city} - {data?.state}
                </p>

                <p>
                  {data?.city}, {data?.country}
                </p>
              </div>
            </div>
            <div className="mt-4 ">
              <Table
                responsive
                style={{
                  background: "white",
                }}
                className="rounded-2"
              >
                <thead className="" style={{ backgroundColor: "" }}>
                  <tr>
                    <th>SR.</th>
                    <th>PRODUCT TITLE</th>
                    <th>QUANTITY</th>
                    <th>ITEM PRICE</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products.map((product, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{product?.title}</td>
                      <td>{product?.quantity}</td>
                      <td>{product?.price}</td>
                      <td>{product?.price * product?.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div
              className="d-flex justify-content-between mt-5 align-items-start p-4 rounded-2"
              style={{ background: "white" }}
            >
              <div>
                <h6>PAYMENT METHOD</h6>
                <p>{data?.paymentMethod || "Not Found"}</p>
              </div>
              <div>
                <h6>SHIPPING COST</h6>
                <p>20 $</p>
              </div>
              <div className="text-start">
                <h6>DISCOUNT</h6>
                <p>$0.00</p>
              </div>
              <div className="text-start">
                <h6>TOTAL AMOUNT</h6>
                <p className="text-danger fw-bold">${totalAmount}</p>
              </div>
            </div>
          </div>
          <div className="m-5 d-flex justify-content-between">
            <button className="btn btn-success">Download Invoice</button>
            <button className="btn btn-success">Print Invoice</button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Order;
