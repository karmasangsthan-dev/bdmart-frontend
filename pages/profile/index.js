import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import auth from "../../firebase.init";
import Loading from "../../components/Shared/Loading/Loading";

import RequreAuth from "../../components/Shared/RequireAuth/RequireAuth";
import Layout from "../../components/Layout";

import ProfileSideNav from "../../components/Profile/ProfileSideNav";
import { useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";

const profile = () => {
  const router = useRouter();
  const {user,isLoading} = useSelector((state) => state.auth);


  return (
    <Layout title="Profile - Bangladesh Mart">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ProfileSideNav />
          </div>
          <div className="col-md-9">
            <div className="profile-content">
              <div className="tab-pane fade show active" id="account-info">
                <div className="d-flex justify-content-between align-items-center">
                  <h2>Account Information</h2>
                  <p 
                    onClick={() => {
                      router.push("/profile/account-info/edit");
                    }}
                    className=" text-xl bg-warning bg-opacity-75 px-3 rounded py-2 edit-profile-btn"
                  >
                    <BsPencil className="" />{" "}
                    <span className="ms-1 ">Edit Profile</span>
                  </p>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <p className="">
                      <strong className="">Name:</strong> {user?.fullName}
                    </p>
                    <p>
                      <strong>Email:</strong> {user?.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user?.contactNumber}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Address:</strong> {user?.address}
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {user?.paymentMethod ? user?.paymentMethod : 'Visa **** **** **** 1234'}
                    </p>
                    <p>
                      <strong>Account Status :</strong> <span style={{color:'#0bc911'}} className="">Active</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="order-history">
                <h2>Order History</h2>
                <hr />

                <p>Your order history is empty.</p>
              </div>

              <div className="tab-pane fade" id="settings">
                <h2>Settings</h2>
                <hr></hr>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value="john.doe@gmail.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value="123-456-7890"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value="123 Main St, Anytown USA 12345"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payment-method">Payment Method</label>
                    <input
                      type="text"
                      className="form-control"
                      id="payment-method"
                      value="Visa **** **** **** 1234"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequreAuth(profile);
