import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import ProfileSideNav from "../../../components/Profile/ProfileSideNav";
import { useGetAllOrdersByEmailQuery } from "../../../features/product/productApi";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import Loading from "../../../components/Shared/Loading/Loading";
import Footer from "../../../components/Shared/Footer/Footer";

const orderHistory = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading } = useSelector((state) => state.auth);
  const { data, isLoading: orderLoading } = useGetAllOrdersByEmailQuery(
    user.email
  );



  return (
    <Layout title="Order History - Bangladesh Mart">
      {
        !user?.email ?
          <>
            <div style={{ minHeight: '50vh' }}>
              <p className="text-danger text-center mb-3">Please login at first for track your order...!!</p>
              <button
                onClick={() => router.push({
                  pathname: "/signin",
                  query: { redirect: router.asPath },
                })}
                className="btn custom-back-to-homepage d-flex mx-auto "
              >
                <span>Login</span>
                <i className="icon-long-arrow-right"></i>
              </button>
              <p className="text-center my-3">or</p>
              <button
                onClick={() => router.push("/")}
                className="btn custom-back-to-homepage d-flex mx-auto "
              >
                <span>BACK TO HOMEPAGE</span>
                <i className="icon-long-arrow-right"></i>
              </button>
            </div>
          </> : <>
            {isLoading || orderLoading ? (
              <p>Loading..</p>
            ) : (
              <div className="container mb-3" style={{ minHeight: "120vh" }}>
                <div className="row">
                  <div className="col-md-3 orders-side-nav">
                    <ProfileSideNav />
                  </div>
                  <div className="col-md-9">
                    <div className="profile-content">
                      <div className="tab-pane fade show active" id="account-info">
                        <div className="d-flex justify-content-between align-items-center">
                          <h2>My Orders: {data?.length}</h2>
                        </div>
                        <div>
                          <div className="order-table table-responsive">
                            <table className="table table-bordered table-hover  ">
                              <thead className="thead-dark">
                                <tr>
                                  <th scope="col">ID</th>
                                  <th scope="col">Time</th>
                                  <th scope="col">Method</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Total</th>
                                  <th scope="col">Action</th>
                                  <th scope="col">Review</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data?.map((order, index) => {
                                  let totalAmount = 0;
                                  for (let i = 0; i < order?.products?.length; i++) {
                                    totalAmount =
                                      totalAmount + order?.products[i].quantity * order?.products[i].price;
                                  };

                                  return (
                                    <tr key={index}>
                                      <td><span className={`${order?.invoiceId ? `text-success` : `text-danger`}`}>#{order?.invoiceId ? order?.invoiceId : 'Not Found'}</span></td>
                                      <td style={{ minWidth: '112px' }}>May 28, 2023</td>
                                      <td>
                                        {order?.paymentMethod || "Not Found"}
                                      </td>
                                      {order?.status === 'successful' && <td className="text-success">Successful</td>}
                                      {order?.status !== 'successful' && <td className="">{order?.status}</td>}

                                      <td>${totalAmount}</td>
                                      <td>
                                        <button
                                          onClick={() =>
                                            router.push(
                                              `/profile/my-orders/${order?._id}`
                                            )
                                          }
                                          className="btn btn-warning "
                                        >
                                          Details
                                        </button>
                                      </td>
                                      <td>
                                        {order?.status === 'successful' ? <button
                                          onClick={() =>
                                            router.push(
                                              `/profile/my-review`
                                            )
                                          }
                                          className="btn btn-info "
                                        >
                                          Review
                                        </button> : <></>}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
      }
      <Footer></Footer>

    </Layout >
  );
};

export default orderHistory;
