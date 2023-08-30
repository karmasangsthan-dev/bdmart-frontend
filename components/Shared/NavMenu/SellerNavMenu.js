import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const SellerNavMenu = () => {
    const router = useRouter();
    const seller = useSelector((state) => state.auth.seller);

    const handleClick = (event) => {
        const route = router.pathname;
        if (!route.includes('/seller')) {
            router.push('/seller/dashboard');
        }
    };
    const avatar = seller?.profilePicture || "https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png";
    return (
        <div>
            <>
                <Box
                    sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
                >
                    <Tooltip title="Seller Profile">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                {" "}
                                {/* {<img className="img-fluid" src={avatar} alt="" />}{" "} */}
                                <Image
                                    layout="responsive"
                                    width={100}
                                    height={100}
                                    src={avatar}
                                    className=" "
                                    alt=""
                                />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>

            </>
        </div>
    );
};

export default SellerNavMenu;