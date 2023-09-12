import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Home, Shop, Category } from "@mui/icons-material";
import { CgProfile } from "react-icons/cg";
import { AiOutlineCloseCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

export default function MobileBottomNav() {
  const router = useRouter();
  const { route } = router;
  const [value, setValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { cart } = useSelector((state) => state?.cart);
  const user = useSelector((state) => state?.auth?.user);
  const seller = useSelector((state) => state?.auth?.seller);
  let totalProductQuantity = 0;
  for (const item of cart) {
    totalProductQuantity += item.quantity;
  }

  const handleOpenCategory = () => {
    setIsCategoryOpen(!isCategoryOpen); // Open the category sidebar
  };



  return (
    <Box className="d-lg-none d-xl-none d-xxl-none d-inline">
      <CssBaseline />

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "px 0",
        }}
        elevation={3}
      >
        <BottomNavigation
          style={{ height: 'auto' }}
          showLabels

        >
          <BottomNavigationAction onClick={handleOpenCategory} className="my-2" label="Category" icon={<Category />} />

          <BottomNavigationAction onClick={() => router.push('/')} className="my-2" label="Home" icon={<Home />} value="/" />

          <BottomNavigationAction
            className="my-2"
            label="Cart"
            onClick={() => router.push('/cart')}
            icon={
              <Badge badgeContent={totalProductQuantity ? totalProductQuantity : 'error'} color="error">
                <AiOutlineShoppingCart className="fs-1" />
              </Badge>
            }
          />

          {user?.profilePicture ? (
            <BottomNavigationAction
              className="my-2"
              label="Profile"
              onClick={() => router.push('/user/dashboard')}
              icon={<img src={user?.profilePicture} alt="User Profile" style={{ width: 32, height: 32, borderRadius: '50%' }} />}
            />
          ) : !seller?.email && (
            <BottomNavigationAction
              onClick={() => router.push('/user/dashboard')}
              className="my-2"
              label="Profile"
              icon={<CgProfile className="fs-1" />}
            />
          )}

          {seller?.email && (
            <BottomNavigationAction
              className="my-2"
              label="Profile"
              onClick={() => router.push('/seller/dashboard')}
              icon={<img src={seller?.profilePicture || 'https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png'} alt="seller profile" style={{ width: 32, height: 32, borderRadius: '50%' }} />}
            />
          )}

        </BottomNavigation>
      </Paper>

      {isCategoryOpen && (
        <div className="category-sidebar" style={{ transform: isCategoryOpen ? 'translateX(0%)' : 'translateX(-100%)' }}>
          <div className="close-category-sidebar">
            <AiOutlineCloseCircle onClick={handleOpenCategory} className="fs-2" />
          </div>
          <ul>
            <li>Category 1</li>
            <li>Category 2</li>
            <li>Category 3</li>
          </ul>
        </div>
      )}
    </Box>
  );
}
