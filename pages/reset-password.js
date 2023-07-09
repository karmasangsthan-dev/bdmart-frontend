import Layout from "../components/Layout";
import ResetPasswordForm from "../components/Shared/Login/ResetPassword";

export default function ResetPassword() {
  return (
    <Layout>
      <main
        className="mainnnnn forget-margin"
        style={{ background: "#eff0f5", marginTop: "-15px" }}
      >
        <ResetPasswordForm />
      </main>
    </Layout>
  );
}
