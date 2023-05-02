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
const NavMenu = () => {
  const router = useRouter();
  const [signOut, loading, error] = useSignOut(auth);
  // const [userSocial, loading2, error2] = useAuthState(auth);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    if (user?.providerId === "custom") {
      localStorage.removeItem("accessToken");
      dispatch(logOut());
      toast.success("Logout Successful", { id: "logout" });
    }
    if (user?.providerId === "firebase") {
      console.log("success00");
      try {
        console.log("success11");
        const success = signOut().then(() => {
          console.log("success333");
          localStorage.removeItem("accessToken");
          dispatch(logOut());
          toast.success("Logout successful", { id: "logout" });
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const avatar = user?.profilePicture
    ? user?.profilePicture
    : "https://i.ibb.co/x258KZb/profile.jpg";
  return (
    <div>
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
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
        <Menu 
        style={{zIndex:'999999'}}
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: "6px",
              padding: "6px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* <img
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              margin: "auto",
              display: "flex",
            }}
            src={
              user?.profilePicture
                ? user?.profilePicture
                : "https://i.ibb.co/x258KZb/profile.jpg"
            } */}

          <div style={{ height: '56px', position: 'relative' }}>
            <Image
              style={{ height: '100%', borderRadius: '50%', margin: 'auto' }}
              className="d-block "
              width={56}
              height={56}
              src={avatar}
              loading="eager"
              alt='profile-pic'
            />
          </div>
          <h4 className="text-center">{user?.fullName}</h4>
          <MenuItem onClick={() => router.push("/profile")}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={() => router.push("/profile/order-history")}>
            <Avatar /> My Orders
          </MenuItem>
          <MenuItem onClick={() => router.push("/dashboard")}>
            <Avatar /> Admin Panel
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    </div>
  );
};

export default NavMenu;
