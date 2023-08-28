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
const NavMenu = () => {
  const router = useRouter();
  const [signOut, loading, error] = useSignOut(auth);
  // const [userSocial, loading2, error2] = useAuthState(auth);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    const route = router.pathname;

    if (!route.includes('/user')) {
      router.push('/user/dashboard');
    }
  };

  const handleLogout = () => {
    if (user?.providerId === "custom") {
      localStorage.removeItem("accessToken");
      dispatch(logOut());
      toast.success("Logout Successful", { id: "logout" });
    }
    if (user?.providerId === "firebase") {
      try {
        const success = signOut().then(() => {
          localStorage.removeItem("accessToken");
          dispatch(logOut());
          toast.success("Logout successful", { id: "logout" });
        });
      } catch (error) { }
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { locale } = useRouter();
  const t = locale === "en" ? en : bn;
  const avatar = user?.profilePicture || "https://i.ibb.co/x258KZb/profile.jpg";
  return (
    <div>
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Profile">
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
                  layout="fixed"
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

export default NavMenu;
