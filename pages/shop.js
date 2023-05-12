import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Rating, Slider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Button, Collapse, Container, Navbar,Nav } from "react-bootstrap";
import ShopProduct from "../components/Product/ShopProduct";
import ShopSideBar from "../components/Shop/ShopSideBar/ShopSideBar";
import {
  useGetAllProductsQuery,
  useGetProductsQuery,
} from "../features/product/productApi";
import Pagination from "../components/Shared/Pagination/Pagination";
import Loading from "../components/Shared/Loading/Loading";
import { useSelector } from "react-redux";
import NavMenu from "../components/Shared/NavMenu/NavMenu";

// https://dummyjson.com/products
// export async function getServerSideProps() {
//   const res = await fetch(
//     ${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/bulk
//   );
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

const shop = () => {
  const user = useSelector((state) => state.auth.user);
  // const [pageNumber, setPageNumber] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [sort, setSort] = useState({
    perPage: 15,
    pageNumber: 1,
    priceSort: 0,
  });

  const [filter, setFilter] = useState({
    category: [],
    size: "",
    brand: [],
    price: [],
  });

  const { data, isLoading } = useGetAllProductsQuery(sort);
  const {
    data: products,
    isSuccess,
    isLoading: loading,
    isError,
    error,
  } = useGetProductsQuery({ sort, filter });

  useEffect(() => {
    if (
      sort.perPage !== 15 ||
      sort.priceSort ||
      sort.pageNumber !== 1 ||
      filter.category.length ||
      filter.brand.length ||
      filter.price.length
    ) {
      setAllProducts(products);
    } else if (
      sort.perPage === 15 ||
      !sort.priceSort ||
      sort.pageNumber === 1 ||
      !filter.category.length ||
      !filter.brand.length ||
      !filter.price.length
    ) {
      setAllProducts(data);
    }
  }, [
    products,
    data,
    sort.pageNumber,
    sort.perPage,
    sort.priceSort,
    filter.category,
    filter.brand,
    filter.price,
  ]);




  return (
    <Layout title="Shop - Bangladesh Mart">
      <div id="strip2">
      <div id="nav_Bar" className="navBar ">
        <div className="strip-1 ">
          <div className="contact-area">
            <div className="phone">
              <i className="fas fa-phone-alt"></i>
              <p>012345678</p>
            </div>
            <div className="email">
              <i className="far fa-envelope"></i>
              <p>contact@bangladeshmart.com.bd</p>
            </div>
          </div>
          <div className="user-area">
            <div className="language-selector">
              <div className="dropdown">
                <button
                  className="btn  dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image
                    className="flag-img"
                    src="/images/flag.png"
                    alt="country"
                    width={18}
                    height={14}
                    loading="eager"
                  />

                  <span className="lan-head">/Country/Currency</span>
                </button>
                <div id="drop-nav-down" className="dropdown-menu-1">
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      {" "}
                      <span className="ship-text">Ship to</span>
                      <div className="drop-down">
                        <select className="English" id="">
                          <option value="Bangladesh">Country 1</option>
                          <option value="Bangladesh">Country 2</option>
                          <option value="Bangladesh">Country 3</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <span className="ship-text">Language</span>
                      <div className="drop-down">
                        <select className="English" id="">
                          <option value="Bangladesh">Language 1</option>
                          <option value="Bangladesh">Language 2</option>
                          <option value="Bangladesh">Language 3</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <span className="ship-text">Currency</span>
                      <div className="drop-down">
                        <select className="English" id="">
                          <option value="Bangladesh">Currency 1</option>
                          <option value="Bangladesh">Currency 2</option>
                          <option value="Bangladesh">Currency 3</option>
                        </select>
                      </div>
                    </li>
                    <button className="btn save btn-danger"> Save</button>
                  </ul>
                </div>
              </div>
            </div>
            <div className="user-sign ">
              <div className="sign-icons ">
                {!user?.providerId && (
                  <div>
                    <Link href="/signin" prefetch={false}>
                      <i className="fas fa-user"></i>
                      <span className="sign-text "> &nbsp; Sign in &nbsp;</span>
                    </Link>{" "}
                    | &nbsp;
                    <Link href="/signup">
                      <i className="fas fa-user-plus"></i>
                      <span className="sign-text">&nbsp; Sign up &nbsp;</span>
                    </Link>
                  </div>
                )}

                {user?.providerId && (
                  <div className="d-flex ">
                    <p className="text-warning px-2 rounded-2 text-capitalize ">
                      {user?.fullName}
                    </p>
                  </div>
                )}
              </div>
              <div></div>
            </div>
          </div>
        </div>

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
              <form className="example" action="action_page.php">
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
            <div className="d-flex ">
              <div className="cart-icon ms-3">
                {user?.email && <NavMenu></NavMenu>}
              </div>
              <div className="cart-icon ms-4">
                <Link href="/cart">
                  <Image
                    className="flag-img"
                    src="/images/cart.png"
                    alt="country"
                    width={45}
                    height={40}
                    loading="eager"
                  />
                </Link>
                {user?.cart?.length ? (
                  <span
                    className=" d-inline-block text-white rounded-circle bg-danger fs-6  fw-semibold border"
                    style={{
                      padding: "1px 5px",
                      margin: "0 -15px",
                    }}
                  >
                    {" "}
                    {user?.cart?.length < 10
                      ? `0${user?.cart?.length}`
                      : user?.cart.length}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        {/* for mobile */}
        <div className="main-strip-2 d-sm-block d-lg-none">
          {/* <div id="strip" className="strip-2 ">
            <div className="nav-bar">
              <i className="fas bar fa-bars"></i>
            </div>
            
            <div className="search-box">
              <form className="example" action="action_page.php">
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
            <div className="d-flex ">
              <div className="cart-icon ms-3">
                {user?.email && <NavMenu></NavMenu>}
              </div>
              <div className="cart-icon ms-4">
                <Link href="/cart">
                  <Image
                    className="flag-img"
                    src="/images/cart.png"
                    alt="country"
                    width={45}
                    height={40}
                    loading="eager"
                  />
                </Link>
                {user?.cart?.length ? (
                  <span
                    className=" d-inline-block text-white rounded-circle bg-danger fs-6  fw-semibold border"
                    style={{
                      padding: "1px 5px",
                      margin: "0 -15px",
                    }}
                  >
                    {" "}
                    {user?.cart?.length < 10
                      ? `0${user?.cart?.length}`
                      : user?.cart.length}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div> */}

          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
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
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                  <div className="search-box">
                    <form className="example" >
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
                </Nav>


              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

        {/* header start from here  */}

        {/* second nav from here  */}

        <div id="sec_bar" className="sec_nav ">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div
                style={{ minHeight: "67px" }}
                className="accordion w-auto"
                id="accordionPanelsStayOpenExample"
              >
                <h2
                  className="accordion-header"
                  id="panelsStayOpen-headingThree"
                >
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    <span style={{ fontSize: "15px" }}> Departments</span>
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree"
                >
                  <div id="accordion_body" className="accordion-body ">
                    <ul>
                      <li className="nav-links here">
                        <a href="#about" className="main-cata  go-down">
                          Appliances
                        </a>
                        <div className="mega_content">
                          <div className="content">
                            <div className="dropmenu">
                              <header className="con-head">
                                Small Appliances
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Coffee, Espresso & Tea Makers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Blenders & juicers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Slow Cookers & Multi Pots</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Microwaves</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Electric Grills & Skillets</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Stand Mixers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Vacuum Sealers
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Large Appliances
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Refurbished Vacuums</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Irons & Clothes Steamers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Air Conditioners
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Sewing Machines
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="nav-links second">
                        <a href="#base" className="main-cata">
                          Automotive
                        </a>
                        <div className="mega_content megas" id="mega_content">
                          <div className="content">
                            <div className="dropmenu">
                              <header className="con-head">
                                Water Purification
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Upright Vacuums</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Vacuums & Floorcare</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Canister Vacuums</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Robot Vacuums</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Heating, Cooling & Air Quality
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Humidifiers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Baby Food Makers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header
                                title="Baby Food & Bottle Appliances"
                                className="con-head"
                              >
                                Baby Food & Bottle A...
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Baby Formula Makers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Baby Formula Makers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Handvacs</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Pet Friendly Vacuums
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Stick Vacuums</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Freezers & Ice Makers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Refrigerators
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-links second">
                        <a href="#blog" className="main-cata">
                          Baby
                        </a>
                        <div className="mega_content megas2" id="mega_content">
                          <div className="content">
                            <div className="dropmenu">
                              <header className="con-head">
                                Specialty Appliances
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Over-The-Range Microwaves</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Ovens & Ranges</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-links third">
                        <a href="#contact" className="main-cata">
                          Clothing,Shoes & Accessories
                        </a>
                        <div className="mega_content megas3" id="mega_content">
                          <div className="content">
                            <div className="dropmenu">
                              <header className="con-head">Women</header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Shop all women's clothing</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Plus</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Handbags & wallets</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">Men</header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Shop all men's clothing</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Big & tall</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Wallets</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">Kids</header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">Shoes</header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Shop all shoes</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Women's shoes</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Boys's shoes</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">Juellary</header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-links">
                        <a href="#custom" className="main-cata">
                          Electronics
                        </a>
                        <div className="mega_content megas4" id="mega_content">
                          <div className="content">
                            <div className="dropmenu">
                              <header className="con-head">
                                Specialty Appliances
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Over-The-Range Microwaves</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Ovens & Ranges</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Washers & Dryers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Vacuum Sealers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Washers & Dryers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Vacuum Sealers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Washers & Dryers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Vacuum Sealers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-links">
                        <a href="#support" className="main-cata">
                          Furniture
                        </a>
                        <div className="mega_content megas5" id="mega_content">
                          <div className="content">
                            <div className="dropmenu">
                              <header className="con-head">
                                Bedroom Furniture
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Over-The-Range Microwaves</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Ovens & Ranges</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Office Furniture
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Washers & Dryers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Vacuum Sealers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Living Room Furniture
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Shop Rollback</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Washers & Dryers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Vacuum Sealers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Kids Furniture
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Washers & Dryers</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Vacuum Sealers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Kitchen Furniture
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-links last-cata">
                        <a href="#tools" className="main-cata">
                          Gift & Holidays
                        </a>
                        <div className="mega_content megas6" id="mega_content">
                          <div className="content">
                            <div className="dropmenu">
                              <header className="con-head">
                                Shop all gifts & holidays
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Over-The-Range Microwaves</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Boxing Day</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout3</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Ovens & Ranges</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Fresh Flowers - Delivered
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Electronic gifts</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Gifts for babies</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Gifts for grandparents</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu">
                              <header className="con-head">
                                Secret Santa & gift exchange
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Christmas</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Gifts for women</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout1</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout2</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout3</a>
                                </li>
                              </ul>
                            </div>
                            <div className="dropmenu" id="dropmenu">
                              <header className="con-head">
                                Product Layout
                              </header>
                              <ul className="pro-nav">
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout4</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout5</a>
                                </li>
                                <li className="drop-nav-link">
                                  <a href="#">Product-Layout6</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-auto">
                <div className="frombar">
                  <ul>
                    <Link href="/shop">
                      <li className="inner-li">Top Products</li>
                    </Link>
                    <Link href="/shop">
                      <li className="inner-li">Top Products</li>
                    </Link>
                    <Link href="/shop">
                      <li className="inner-li">Shop</li>
                    </Link>

                    <a href="">
                      <li className="inner-li">Track your Order</li>
                    </a>
                    <a href="">
                      <li className="inner-li">Submit RFQ</li>
                    </a>
                    <Link href="/productDetails">
                      <li className="inner-li">ProductDetails</li>
                    </Link>
                    <Link href="/profile">
                      <li className="inner-li">My Account</li>
                    </Link>
                    <Link href="/shop">
                      <li className="inner-li">Contact Us</li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      {
        isLoading || loading ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "42vh"
          }}>
            <div className="spinner1"></div>
          </div>
        ) : (
          <div className="shop page-content">
            <div className="container">
              <div className="row ">
                <aside className="col-lg-2 order-lg-first">
                  <ShopSideBar data={data} filter={filter} setFilter={setFilter} />
                </aside>
                <div className="col-lg-10 pl-lg-5">
                  <div className="">
                    <div className="widget w-100 widget-clean d-flex justify-content-between align-items-center">
                      <p className="fs-6">Total Products: {data?.total}</p>
                      <div className="d-flex gap-4">
                        <div className="d-flex py-1">
                          <span>Per page : </span>
                          <select
                            onChange={(e) =>
                              setSort({ ...sort, perPage: Number(e.target.value) })
                            }
                            className="ms-1 rounded px-2 border"
                          >
                            <option value={15}>15</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                          </select>
                        </div>
                        <div className="d-flex py-1">
                          <span>Sort by : </span>
                          <select
                            onChange={(e) =>
                              setSort({
                                ...sort,
                                priceSort: Number(e.target.value),
                              })
                            }
                            className="ms-1 border rounded px-2 "
                          >
                            <option value={0}>Default</option>
                            <option value={-1}>Highest to lowest</option>
                            <option value={1}>Lowest to Highest</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="products">
                      {
                        loading || isLoading ? (
                          <Loading></Loading>
                        ) : (
                          <div className="shop-products">
                            {allProducts?.data?.map((product) => (
                              <ShopProduct product={product} key={product?._id} />
                            ))}
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className="my-5">
                    <Pagination
                      setSort={setSort}
                      sort={sort}
                      data={data}
                      pageFound={products?.pageFound}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Layout >
  );
};

export default shop;