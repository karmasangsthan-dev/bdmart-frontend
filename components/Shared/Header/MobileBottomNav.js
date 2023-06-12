import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Home, Shop } from "@mui/icons-material";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

export default function MobileBottomNav() {
  const router = useRouter();
  const { route } = router;
  const [value, setValue] = useState("");
  const { cart } = useSelector((state) => state?.cart);

  let totalProductQuantity = 0;
  for (const item of cart) {
    totalProductQuantity += item.quantity;
  }
  const handleRouteChange = (path) => {
    router.push(path);
  };
  useEffect(() => {
    setValue(route);
  }, []);
  return (
    <Box sx={{ pb: 7 }} className="d-lg-none d-xl-none d-xxl-none d-inline">
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            handleRouteChange(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} value="/" />
          <BottomNavigationAction label="Shop" icon={<Shop />} value="/shop" />
          <BottomNavigationAction
            label="Profile"
            value="/profile"
            icon={<CgProfile className="fs-1" />}
          />
          <BottomNavigationAction
            label="Cart"
            value="/cart"
            icon={
              <Badge badgeContent={totalProductQuantity} color="error">
                <AiOutlineShoppingCart className="fs-1" />
              </Badge>
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
