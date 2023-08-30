import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";
import Loading from "../Loading/Loading";

const RequreAuthSeller = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {

        const { seller, isLoading, isSuccess } = useSelector((state) => state.auth);
        const router = useRouter();
        // if (isLoading) {
        //     return <Loading></Loading>
        // }
        if (!seller?.email) {
            return (
                <Layout>
                    <div className="text-center w-full d-flex justify-content-center  align-items-center ">

                        <button onClick={() => router.push({
                            pathname: "/seller/login",
                            query: { redirect: router.asPath },
                        })} className='update-profile-button'>Please Login</button>
                    </div>
                </Layout>
            );
        }

        if (isSuccess) {
            return <WrappedComponent {...props} />;
        }
    };

    return AuthenticatedComponent;
};

export default RequreAuthSeller;
