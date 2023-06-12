import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import NavMenu from "../NavMenu/NavMenu";

import Image from "next/image";
import { useRouter } from "next/router";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";

import { Avatar, Badge, TextField, Tooltip } from "@mui/material";
import { useGetSearchProductQuery } from "../../../features/product/productApi";
import ContactHeader from "./ContactHeader";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
import MegaMenu from "./MegaMenu";

import { AiOutlineMenu } from "react-icons/ai";
const Header = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : bn;
  const user = useSelector((state) => state?.auth?.user);
  const [searchText, setSearchText] = useState("");
  const { cart } = useSelector((state) => state?.cart);
  const { data, isLoading, isError, error, refetch } =
    useGetSearchProductQuery(searchText);

  useEffect(() => {
    refetch();
  }, [searchText]);

  let totalProductQuantity = 0;

  for (const item of cart) {
    totalProductQuantity += item.quantity;
  }

  return (
    <div id="strip2">
      <div id="nav_Bar" className="navBar ">
        <ContactHeader user={user} />

        <div className="main-strip-2 d-sm-none d-lg-block">
          <div id="strip" className="strip-2 ">
            <div className="nav-bar">
              <i className="fas bar fa-bars"></i>
            </div>
            <div className="logo">
              <Link href="/">
                <Image
                  className="flag-img"
                  src="/images/logo2.jpg"
                  alt="country"
                  width={190}
                  height={70}
                />
              </Link>
            </div>
            <div className="search-box">
              <form className="example">
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="text"
                  placeholder={t.homePage.header.searchTitle}
                  name="search"
                  autoComplete="off"
                />

                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>

              {data?.data?.length > 0 && (
                <form className="example">
                  <div
                    style={{
                      display: "block",
                      minWidth: "841px",
                      zIndex: "999",
                    }}
                    className="dropdown-menu search-content-box shadow px-2"
                  >
                    <div className="search-details">
                      <div>
                        {data?.data?.map((product, i) => {
                          return (
                            <div
                              onClick={() =>
                                router.push(`/productDetails/${product._id}`)
                              }
                              key={i}
                              className="search-item-header d-flex align-items-center border-bottom py-2"
                            >
                              <div className="image">
                                <img
                                  width={60}
                                  height={60}
                                  src={product?.thumbnail}
                                />
                              </div>
                              <div className="ms-3">
                                <div className="name">{product?.title}</div>
                                <div className="price">
                                  <span
                                    style={{ fontWeight: "600" }}
                                    className="text-danger"
                                  >
                                    ${product?.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="d-flex justify-content-center my-3">
                        <span className="btn btn-info text-center ">
                          See All Results
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            <div className="d-flex ">
              <div className="cart-icon ms-3">{user?.email && <NavMenu />}</div>
              <div className="cart-icon ms-4">
                <Tooltip title="Cart">
                  <Link href="/cart">
                    <Badge badgeContent={totalProductQuantity} color="error">
                      <Image
                        className="flag-img"
                        src="/images/cart.png"
                        alt="country"
                        width={45}
                        height={40}
                        loading="eager"
                      />
                    </Badge>
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* for mobile */}
        <div className="main-strip-2 d-sm-block d-lg-none">
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <div className="d-flex align-items-center row w-100  justify-content-center">
              <Navbar.Toggle
                className="col-2 border-0 position-relative"
                aria-controls="responsive-navbar-nav"
              >
                <AiOutlineMenu size={20} className=" " />
              </Navbar.Toggle>

              {/* <div className="logo">
                <Link href="/">
                  <Image
                    className="flag-img"
                    src="/images/logo2.jpg"
                    alt="country"
                    width={190}
                    height={70}
                  />
                </Link>
              </div> 
          <div className="cart-item">
                <Tooltip title="Cart">
                  <Link href="/cart">
                    <Badge badgeContent={totalProductQuantity} color="error">
                      <Image
                        className="flag-img"
                        src="/images/cart.png"
                        alt="country"
                        width={45}
                        height={40}
                        loading="eager"
                      />
                    </Badge>
                  </Link>
                </Tooltip>
              </div> */}

              <form className="example  col-10">
                <input
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder=" What are you looking for?"
                  name="search"
                />

                {/* <button type="submit" className="py-2 my-auto">
                  <i className="fa fa-search"></i>
                </button> */}
              </form>

              {data?.data?.length > 0 && (
                <form className="example">
                  <div
                    style={{
                      display: "block",
                      minWidth: "98%",
                      zIndex: "999",
                    }}
                    className="dropdown-menu search-content-box shadow px-2 mx-3"
                  >
                    <div className="search-details">
                      <div>
                        {data?.data?.map((product, i) => {
                          return (
                            <div
                              onClick={() =>
                                router.push(`/productDetails/${product._id}`)
                              }
                              key={i}
                              className="search-item-header d-flex align-items-center border-bottom py-2"
                            >
                              <div className="image">
                                <img
                                  width={60}
                                  height={60}
                                  src={product?.thumbnail}
                                />
                              </div>
                              <div className="ms-3">
                                <div className="name">{product?.title}</div>
                                <div className="price">
                                  <span
                                    style={{ fontWeight: "600" }}
                                    className="text-danger"
                                  >
                                    ${product?.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="d-flex justify-content-center my-3">
                        <span className="btn btn-info text-center ">
                          See All Results
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            <Navbar.Collapse id="responsive-navbar-nav">
              {/* <Nav>
                <div className="search-box search-box-mobile">
                  <form className="example">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      name="search"
                    />

                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
              </Nav> */}

              <Nav className="ps-2">
                {t.homePage.header.nav.map((navItem, index) => (
                  <Link
                    key={index}
                    className="nav-item-mobile"
                    href={navItem?.link}
                  >
                    <li className="inner-li">{navItem?.title}</li>
                  </Link>
                ))}
              </Nav>
              <Nav className="nav-item-mobile ps-2">
                {user?.email && (
                  <div className="d-flex align-items-center my-2">
                    <Avatar sx={{ width: 25, height: 25 }}>
                      <Image
                        onClick={() => router.push("/profile")}
                        layout="responsive"
                        width={100}
                        height={100}
                        src={user?.profilePicture}
                        className=" "
                        alt=""
                      />
                    </Avatar>
                    <p onClick={() => router.push("/profile")} className="ms-1">
                      {user?.fullName}
                    </p>
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        {/* header start from here  */}

        {/* second nav from here  */}

        <MegaMenu></MegaMenu>
      </div>
    </div>
  );
};

export default Header;
