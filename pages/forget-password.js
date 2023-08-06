import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ForgetPassword from "../components/Shared/Login/ForgetPassword";
import ResetEmailSent from "../components/Shared/Login/ResetEmailSent";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const ForgetUserPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [content, setContent] = useState();

  useEffect(() => {
    if (!emailSent) {
      setContent(<ForgetPassword setEmailSent={setEmailSent} />);
    } else if (emailSent) {
      setContent(<ResetEmailSent />);
    }
  }, [emailSent]);

  return (
    <Layout>
      <main
        className="mainnnnn forget-margin py-5"
        style={{ background: "#eff0f5", marginTop: "-15px" }}
      >
        {content}
      </main>
    </Layout>
  );
};

export default ForgetUserPassword;
