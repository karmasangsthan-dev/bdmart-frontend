import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../firebase.init";
import { useEffect } from "react";
import { fetchUser } from "../../../features/auth/authSlice";
import Layout from "../../Layout";
import Loading from "../Loading/Loading";

const RequreAuth = (WrappedComponent) => {


  const AuthenticatedComponent = (props) => {
    const user = useSelector((state) => state.auth.user);
    const router = useRouter();
    
    if (!user?.email) {
      return (
        <Layout>
          <div className="text-center w-full d-flex justify-content-center  align-items-center h-50">
            <p style={{ cursor: 'pointer' }}
              onClick={() => router.push("/signin")}
              className=" border-0 bg-warning d-inline-block px-3 py-2 rounded"
            >
              Please Login
            </p>
          </div>
        </Layout>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  return AuthenticatedComponent;
};

export default RequreAuth;
