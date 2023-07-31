import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUpCurrency } from "../../../features/currency/currencySlice";
import { countriesData } from "../../../utils/countryData";
import {
  useGetCurrencyQuery,
  useUpdateCurrencyMutation,
} from "../../../features/currency/currencyApi";
import ContactHeaderLogOut from "./ContactHeaderLogOut";

require("dotenv").config();
export default function ContactHeader({ user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { locale, locales, push } = router;
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shipTo, setShipTo] = useState(null);

  const { code, rate } = useSelector((state) => state.currency);

  // query to db
  const { data, isSuccess: success } = useGetCurrencyQuery();
  const [updateCurrency, { isSuccess, isError, isLoading }] =
    useUpdateCurrencyMutation();

  // save changes for currency shipping and language
  const handleChange = async (e) => {
    e.preventDefault();
    const locale = e.target.locale.value;
    const currentRoute = router.asPath;
    const currency = e.target.currency.value;

    router.push(currentRoute, currentRoute, { locale });
    setShowDropdown(false);
    const currencyWithRate = data?.data.find((cur) => cur.code === currency);
    dispatch(setUpCurrency(currencyWithRate));
    localStorage.setItem("shipTo", JSON.stringify(shipTo));
    localStorage.setItem("locale", JSON.stringify(locale));
    localStorage.setItem("currency", JSON.stringify(currency));
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (country) => {
    setShipTo(country);
    handleToggle();
  };

  // fetch data in page mount
  useEffect(() => {
    const shipTo = JSON.parse(localStorage.getItem("shipTo"));
    setShipTo(shipTo);
    const currency = JSON.parse(localStorage.getItem("currency"));
    const locale = JSON.parse(localStorage.getItem("locale"));
    const currentRoute = router.asPath;
    // router.push(currentRoute, currentRoute, { locale });
    if (success && currency) {
      const currencyWithRate = data?.data?.find((cur) => cur.code === currency);
      dispatch(setUpCurrency(currencyWithRate));
    }
  }, [data?.data, success]);



  return (
    <>
      <div className="contact-header">
        <div className="content-header">
          <div className="content-hd">
            <span className="wrapper-hd">
              <svg

                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="me-2"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              We are available 24/7, Need help? Call Us :
              <a href="tel:+012345609" className="contact-tel">
                +01234560352
              </a>
            </span>
            <div className="contact-right-part">
              <a className="font-medium hover:text-emerald-600" href="/about-us">
                {" "}
                About Us
              </a>
              <span className="mx-2">|</span>
              <a className="font-medium hover:text-emerald-600" href="/contact-us">
                {" "}
                Contact Us
              </a>
              <span className="mx-2">|</span>
              <button className="font-medium hover:text-emerald-600">
                My account
              </button>
              <span className="mx-2">|</span>
              {!user?.email && <button onClick={() => router.push({
                pathname: "/signin",
                query: { redirect: router.asPath },
              })} className="d-flex align-items-center ">
                <span className="me-1 d-flex align-items-center">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                </span>
                Login
              </button>}

              {user?.email &&  <ContactHeaderLogOut></ContactHeaderLogOut>}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
