import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";

import auth from "../../../firebase.init";

import { toast } from "react-hot-toast";
import Loading from "../../../components/Shared/Loading/Loading";

import Layout from "../../../components/Layout";
import ProfileSideNav from "../../../components/Profile/ProfileSideNav";
import { useUpdateProfileMutation } from "../../../features/auth/authApi";
import { fetchUser } from "../../../features/auth/authSlice";

const profile = () => {
  const router = useRouter();
  const [token, setToken] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
  }, []);
  const user = useSelector((state) => state.auth.user);
  const [updateProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();

  const handleUpdate = (e) => {
    e.preventDefault();
    const id = user?._id;
    const fullName = e.target.fullName.value;
    const email = user?.email;
    const contactNumber = e.target.contactNumber.value;
    const gender = e.target.gender.value;
    const address = e.target.address.value;
    const paymentMethod = e.target.paymentMethod.value;

    const data = { fullName, email, contactNumber, gender, address , paymentMethod };

    updateProfile({ id, token, data });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/profile')
      toast.success("Updated successful", { id: "updateProfile" });
      dispatch(fetchUser(token));
    }
  }, [isSuccess]);
  

  return (
    <Layout title="Edit Profile - Bangladesh Mart">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ProfileSideNav />
          </div>
          <div className="col-md-9">
            <div className="profile-content">
              <form
                onSubmit={handleUpdate}
                className="tab-pane fade show active"
                id="account-info"
              >
                <div className="d-flex justify-content-between">
                  <h2>Account Information</h2>
                  <input
                    type="submit"
                    value="Save"
                    className="bg-warning bg-opacity-75 text-xl text-white px-3 rounded py-2"
                  />
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="name">Full Name:</label>
                    <input
                      className="w-100 px-3 py-2 mb-3 border-0 "
                      style={{
                        backgroundColor: "#eff0f5",
                        borderRadius: "5px",
                      }}
                      name="fullName"
                      type="text"
                      defaultValue={user?.fullName}
                      placeholder="Enter Your Full Name"
                    />

                    <label htmlFor="name">Email:</label>
                    <input
                      className="w-100 px-3 py-2 mb-3 border-0 "
                      name="email"
                      style={{
                        backgroundColor: "#eff0f5",
                        borderRadius: "5px",
                      }}
                      type="text"
                      value={user?.email}
                      contentEditable="false"
                      readOnly
                    />

                    <label htmlFor="name">Contact Number:</label>
                    <input
                      className="w-100 px-3 py-2 mb-3 border-0"
                      name="contactNumber"
                      style={{
                        backgroundColor: "#eff0f5",
                        borderRadius: "5px",
                      }}
                      defaultValue={user?.contactNumber}
                      type="number"
                      placeholder="Enter Your Contact Number"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="name">Gender:</label>
                    <div className="d-flex mt-2 mb-4">
                      <input
                        type="radio"
                        className="d-inline me-2"
                        name="gender"
                        defaultValue={user?.gender}
                        value="male"
                      />{" "}
                      <span>Male</span>
                      <input
                        type="radio"
                        className="d-inline me-2 ms-3"
                        name="gender"
                        defaultValue={user?.gender}
                        value="female"
                      />{" "}
                      <span>Female</span>
                      <input
                        type="radio"
                        className="d-inline me-2 ms-3"
                        name="gender"
                        defaultValue={user?.gender}
                        value="Custom"
                      />{" "}
                      <span>Custom</span>
                    </div>
                    <label htmlFor="name">Address:</label>
                    <input
                      className="w-100 px-3 py-2 mb-3 border-0 text-capitalize"
                      style={{
                        backgroundColor: "#eff0f5",
                        borderRadius: "5px",
                      }}
                      type="text"
                      defaultValue={user?.address}
                      name="address"
                      placeholder="Enter Your Address"
                    />
                    <label htmlFor="name">Payment Method:</label>
                    <input
                      className="w-100 px-3 py-2 border-0"
                      style={{
                        backgroundColor: "#eff0f5",
                        borderRadius: "5px",
                      }}
                      name="paymentMethod"
                      defaultValue={user?.paymentMethod}
                      type="text"
                      placeholder="Enter Your Payment Method"
                    />
                  </div>
                </div>
              </form>

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

export default profile;
