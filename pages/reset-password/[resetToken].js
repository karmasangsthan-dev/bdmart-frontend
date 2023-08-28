import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ResetPasswordForm from "../../components/Shared/Login/ResetPasswordForm";
import { useGetUserByTokenQuery } from "../../features/auth/authApi";
import { BiError } from "react-icons/bi";
import { DataArrayTwoTone } from "@mui/icons-material";

export default function ResetPassword() {
  const router = useRouter();
  const {
    query: { resetToken },
  } = router;
  const {
    data,
    isLoading = true,
    isSuccess,
    isError,
    error,
  } = useGetUserByTokenQuery(resetToken);
  let content;
  if (isLoading) {
    content = (
      <div className="d-flex justify-content-center">
        <div className=" spinner-border text-danger my-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (isSuccess) {
    content = <ResetPasswordForm resetToken={resetToken} />;
  }
  // else if (!isLoading && isError && error) {
  //   content = (
  //     <div className="text-center text-danger my-5">
  //       <BiError className="fs-1" />
  //       <h5> You are not authorized to reset password !!!</h5>
  //     </div>
  //   );
  // }
  console.log({ isLoading, isSuccess, isError, error });
  return (
    <Layout>
      <mainr
        className="mainnnnn forget-margin  "
        style={{ background: "#eff0f5", marginTop: "-15px" }}
      >
        {content}
      </mainr>
    </Layout>
  );
}
