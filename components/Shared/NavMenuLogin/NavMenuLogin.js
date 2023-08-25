import { Logout, Settings } from "@mui/icons-material";
import {
    Avatar,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../features/auth/authSlice";
import auth from "../../../firebase.init";
import { useSignOut } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
const NavMenuLogin = () => {
    const router = useRouter();
    const handleNavigate = () => {
        console.log({ router })
        if (router.pathname !== '/signin' && router.pathname !== '/signup') {
            router.push({
                pathname: "/signin",
                query: { redirect: router.asPath },
            });

        } else {
            console.log('Button clicked');
        }
    }
    return (
        <div>
            <>
                <Box
                    sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
                >
                    <Tooltip title="Login/Register">
                        <IconButton
                            onClick={() => handleNavigate()}
                            size="small"
                            sx={{ ml: 2 }}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>

                                <Image
                                    layout="responsive"
                                    width={100}
                                    height={100}
                                    src='https://i.ibb.co/x258KZb/profile.jpg'
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

export default NavMenuLogin;
