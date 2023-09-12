import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";
import toast from "react-hot-toast";

const RequreAuthSeller = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {

        const { seller, isLoading, isSuccess } = useSelector((state) => state.auth);
        const { user, isLoading: userLoading } = useSelector((state) => state.auth);
        const router = useRouter();
        // if (isLoading) {
        //     return <Loading></Loading>
        // }

        const handleSellerLoginNavigate = () => {
            if (user?.email) {
                toast.error('User logged in')
            }
            else {
                router.push({
                    pathname: "/seller/login",
                    query: { redirect: router.asPath },
                })
            }
        }
        if (!seller?.email) {


            return (
                <Layout>

                    {userLoading &&
                        <div className="require-auth-container">
                            <button className='update-profile-button'>Loading...</button>
                        </div>}

                    {!userLoading &&
                        <div className="require-auth-container ">
                            <h4 className="">Bangladesh Mart Seller Dashboard</h4>
                            <h6><AiFillWarning></AiFillWarning> Seller must be logged in to view seller dashboard</h6>
                            <button onClick={handleSellerLoginNavigate} className='update-profile-button'>Login</button>
                        </div>
                    }

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
