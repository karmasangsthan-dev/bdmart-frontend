import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../firebase.init";
import { useEffect } from "react";
import { fetchUser } from "../../../features/auth/authSlice";
import Layout from "../../Layout";

const RequreAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      dispatch(fetchUser(token));
    }, [dispatch]);
    const [userSocial, loading, error] = useAuthState(auth);
    const user = useSelector((state) => state.auth.user);

    const router = useRouter();

    if (loading) {
      // You can show a loading spinner here
      return <p>Loading...</p>;
    }
    if (error) {
      console.error(error);
      return <p>Error!</p>;
    }

    if (!userSocial && !user?.email) {
      return (
        <Layout>
          <div className="text-center w-full d-flex justify-content-center  align-items-center h-50">
            <p
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
