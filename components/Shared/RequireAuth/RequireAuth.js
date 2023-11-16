import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";

const RequreAuth = (WrappedComponent) => {


  const AuthenticatedComponent = (props) => {

    const user = useSelector((state) => state.auth.user);
    const router = useRouter();

    if (!user?.email) {
      return (
        <Layout>
          <div className="text-center w-full d-flex justify-content-center  align-items-center mt-5 gap-3" style={{ flexDirection: 'column' }}>
            <p>You haven't logged in. Please login at first.</p>
            <button onClick={() => router.push({
              pathname: "/signin",
              query: { redirect: router.asPath },
            })} className='update-profile-button'>Please Login</button>
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
