import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import ProfileSideNav from "../../../components/Profile/ProfileSideNav";
import { useGetAllOrdersByEmailQuery } from "../../../features/product/productApi";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const orderHistory = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading } = useSelector((state) => state.auth);
  const { data, isLoading: orderLoading } = useGetAllOrdersByEmailQuery(
    user.email
  );
  



  return (
    <Layout title="Order History - Bangladesh Mart">
      {isLoading || orderLoading ? (
        <p>Loading..</p>
      ) : (
        <div className="container" style={{ minHeight: "120vh" }}>
          <div className="row">
            <div className="col-md-3">
              <ProfileSideNav />
            </div>
            <div className="col-md-9">
              <div className="profile-content">
                <div className="tab-pane fade show active" id="account-info">
                  <div className="d-flex justify-content-between align-items-center">
                    <h2>My Orders: {data?.length}</h2>
                  </div>
                  <div>
                    <div className="row">
                      <div className="">
                        <div class=" table-responsive">
                          <table class="table table-bordered table-hover  ">
                            <thead class="thead-dark">
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Order Time</th>
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
                                    <td>829D</td>
                                    <td>May 28, 2023</td>
                                    <td>
                                      {order?.paymentMethod || "Not Found"}
                                    </td>
                                    <td>{order?.status}</td>
                                    <td>${totalAmount}</td>
                                    <td>
                                      <button
                                        onClick={() =>
                                          router.push(
                                            `/profile/my-orders/${order?._id}`
                                          )
                                        }
                                        className="btn btn-success "
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
          </div>
        </div>
      )}
    </Layout>
  );
};

export default orderHistory;
