import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import NavMenu from '../NavMenu/NavMenu';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';

import { Avatar, Badge, TextField, Tooltip } from '@mui/material';
import { useGetSearchProductQuery } from '../../../features/product/productApi';
import ContactHeader from './ContactHeader';
import { en } from '../../../locales/en';
import { bn } from '../../../locales/bn';
import MegaMenu from './MegaMenu';

import { AiOutlineMenu } from 'react-icons/ai';
import NavMenuLogin from '../NavMenuLogin/NavMenuLogin';
import SellerNavMenu from '../NavMenu/SellerNavMenu';
const Header = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : bn;
  const user = useSelector((state) => state?.auth?.user);
  const seller = useSelector((state) => state.auth.seller);
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );
  const [searchText, setSearchText] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSearchInput, setMobileSearchInput] = useState(null);
  const [desktopSearchInput, setDesktopSearchInput] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const { cart } = useSelector((state) => state?.cart);
  const suggestionRef = useRef(null);
  const inputRef = useRef(null);


  const { data, isLoading, isError, error, refetch } =
    useGetSearchProductQuery(searchText);
  const searchProduct = data?.data;

  useEffect(() => {
    if (searchProduct?.length !== undefined) {
      setShowSuggestions(true)
    }
  }, [searchText]);


  let totalProductQuantity = 0;

  for (const item of cart) {
    totalProductQuantity += item.quantity;
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  }

  const handleInputChange = (event) => {
    setSearchText(event.target.value)
    if (searchText.length > 0) {
      setInputFocused(true); // Set inputFocused to true if there are search results.
    } else {
      setInputFocused(false); // Reset inputFocused if there are no results.
    }
  }
  useEffect(() => {
    setMobileSearchInput(document.getElementById('mobile-search-input'));
    setDesktopSearchInput(document.getElementById('desktop-search-input'));
  }, []);

  const handleClearInput = () => {
    setSearchText('');
    if (mobileSearchInput) {
      mobileSearchInput.value = '';
    }
    if (desktopSearchInput) {
      desktopSearchInput.value = '';
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const isLoginPage = router.asPath === '/signin';
  const isRegisterPage = router.asPath === '/signup';

  useEffect(() => {
    if (inputFocused === true) {
      setShowSuggestions(true)
    }
  }, [inputFocused])

  const handleClickOutside = (e) => {
    if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {

      if (inputRef.current && inputRef.current.contains(e.target)) {
        if (searchProduct?.length > 0) {
          setShowSuggestions(true);
        }
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleNavigateHome = () => {
    if (router.asPath !== '/') {
      router.push('/')
    }
  }
  const handleNavigateCart = () => {
    if (router.asPath !== '/cart') {
      router.push('/cart')
    }
  }


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);




  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} style={{ display: isLoginPage || isRegisterPage ? 'none' : 'block' }}>
      <ContactHeader user={user} />

      <div
        className={`search-cart-header ${isScrolled ? 'sticky' : ''}`}
        id="strip2"
      >
        <div id="nav_Bar" className="navBar ">
          <div className="main-strip-2 d-sm-none d-lg-block">
            <div id="strip" className="strip-2">
              <div onClick={handleNavigateHome} className="logo ms-2">
                <Image
                  style={{ cursor: 'pointer' }}
                  className="flag-img "
                  src="/images/logo2.jpg"
                  alt="country"
                  width={190}
                  height={70}
                />
              </div>
              <div className="search-box">
                <form onSubmit={handleSearchSubmit} className="example">
                  <input
                    id="desktop-search-input"
                    onChange={handleInputChange}
                    type="text"
                    placeholder={t.homePage.header.searchTitle}
                    name="search"
                    ref={inputRef}
                    autoComplete="off"
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                  />
                  <div
                    style={{ position: 'relative' }}
                    className="d-flex align-items-center"
                  >
                    {searchText?.length > 0 && (
                      <span
                        title="Clear"
                        onClick={() => handleClearInput()}
                        className="px-1 text-danger"
                        style={{
                          position: 'absolute',
                          right: '15px',
                          fontSize: '20px',
                          cursor: 'pointer',
                        }}
                      >
                        x
                      </span>
                    )}
                  </div>

                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>

                {showSuggestions && searchText?.length > 0 && searchProduct?.length > 0 && (
                  <form ref={suggestionRef} className="example">
                    <div
                      style={{
                        display: 'block',
                        minWidth: '841px',
                        zIndex: '999',
                      }}
                      className="dropdown-menu search-content-box shadow px-2"
                    >
                      <div className="search-details">
                        <div>
                          {searchProduct?.length > 0 && searchProduct?.map((product, i) => {
                            const lowestPrice = Math.min(
                              ...product.variants.map((variant) => variant.price)
                            );
                            const highestPrice = Math.max(
                              ...product.variants.map((variant) => variant.price)
                            );
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
                                    {lowestPrice !== highestPrice && <span
                                      style={{ fontWeight: '600' }}
                                      className="text-danger"
                                    >
                                      {(lowestPrice * currencyRate).toFixed(
                                        2
                                      )} {currency}{' '}{'-'}{' '}{(highestPrice * currencyRate).toFixed(
                                        2
                                      )}{' '}
                                      <span> {currency}</span>
                                    </span>}
                                    {lowestPrice === highestPrice && <span
                                      style={{ fontWeight: '600' }}
                                      className="text-danger"
                                    >
                                      {(lowestPrice * currencyRate).toFixed(
                                        2
                                      )}
                                      <span> {currency}</span>
                                    </span>}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    </div>
                  </form>
                )}
              </div>

              <div className="d-flex ">
                <div className="cart-icon ms-3">
                  {user?.email && !seller?.email && <NavMenu />}
                  {!user?.email && !seller?.email && <NavMenuLogin />}
                  {!user?.email && seller?.email && <SellerNavMenu></SellerNavMenu>}
                </div>
                <div className="cart-icon ms-4">
                  <Tooltip onClick={handleNavigateCart} title="Cart">
                    <Badge badgeContent={totalProductQuantity ? totalProductQuantity : '0'} color="error">
                      <Image
                        style={{ cursor: 'pointer' }}
                        className="flag-img"
                        src="/images/cart.png"
                        alt="country"
                        width={45}
                        height={40}
                        loading="eager"
                      />
                    </Badge>
                  </Tooltip>
                </div>

              </div>
            </div>
          </div>

          {/* for mobile */}
          <div className="main-strip-2 d-sm-block d-lg-none" >
            <div className="">
              <form className="example col-12 p-2">
                <input
                  id="mobile-search-input"
                  style={{ borderTopRightRadius: '5px' }}
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder=" What are you looking for?"
                  name="search"
                />
                <div
                  style={{ position: 'relative' }}
                  className="d-flex align-items-center"
                >
                  {searchText?.length > 0 && (
                    <span
                      onClick={() => handleClearInput()}
                      className="px-1 text-danger"
                      style={{
                        position: 'absolute',
                        right: '70px',
                        fontSize: '20px',
                      }}
                    >
                      x
                    </span>
                  )}
                  <button
                    type="submit"
                    style={{
                      position: 'absolute',
                      right: '0px',
                      fontSize: '14px',
                      padding: '0 25px',
                      height: '100%',
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>

              {data?.data?.length > 0 && (
                <form className="example justify-content-center">
                  <div
                    style={{
                      display: 'block',
                      zIndex: '999',
                    }}
                    className="dropdown-menu search-content-box shadow px-2 w-100"
                  >
                    <div className="search-details">
                      <div>
                        {searchProduct?.map((product, i) => {
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
                                    style={{ fontWeight: '600' }}
                                    className="text-danger"
                                  >
                                    {(product?.price * currencyRate).toFixed(2)}{' '}
                                    <span> {currency}</span>
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
          </div>

          {/* header start from here  */}

          {/* second nav from here  */}

          <MegaMenu></MegaMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
