import React from "react";
import Layout from "../components/Layout";
import ForgetPassword from "../components/Shared/Login/ForgetPassword";

const ForgetUserPassword = () => {
  return (
    <Layout>
      <main
        className="mainnnnn forget-margin"
        style={{ background: "#eff0f5", marginTop: "-15px" }}
      >
        <ForgetPassword />
      </main>
    </Layout>
  );
};

export default ForgetUserPassword;
