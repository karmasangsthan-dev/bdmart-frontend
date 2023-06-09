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

  console.log(router.isFallback);
  // if (!router.isFallback) {

  //   const locale = JSON.parse(localStorage.getItem("locale"));
  //   const currentRoute = router.asPath;

  //   // router.push(currentRoute, currentRoute, { locale });
  //   router.push({ ...currentRoute, locale });
  // }

  return (
    <>
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
            <Dropdown show={showDropdown} onToggle={setShowDropdown}>
              <Dropdown.Toggle
                className="btn border-0"
                variant="transparent"
                id="dropdown-button"
              >
                <img
                  className="flag-img mx-auto"
                  src={shipTo?.flags?.png || "/images/flag.png"}
                  alt="country"
                  width={18}
                  height={14}
                  loading="eager"
                />
                <span>
                  /{locale === "en" && "English"}
                  {locale === "bn" && "বাংলা"}/{code || "Currency"}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{ zIndex: "99999" }}
                className="dropdown-menu"
                id="myDD"
              >
                <Form onSubmit={handleChange}>
                  <li>
                    <span className="ship-text">Ship to</span>
                    <div className="drop-down" style={{ padding: "5px 0" }}>
                      <button
                        className="btn border-0 dropdown-toggle"
                        type="button"
                        onClick={handleToggle}
                      >
                        {shipTo ? (
                          <>
                            <img
                              className="flag-img"
                              src={shipTo?.flags?.png}
                              alt={shipTo?.name?.common}
                              width={18}
                              height={14}
                              loading="eager"
                            />
                            {shipTo?.name?.common}
                          </>
                        ) : (
                          <span>Select Country</span>
                        )}
                      </button>

                      {isOpen && (
                        <ul className="dropdown-menu show country-ul-header">
                          {countriesData?.map((country) => (
                            <li
                              className="header-shipping-country-name px-2"
                              key={country.name.common}
                              onClick={() => handleCountrySelect(country)}
                            >
                              <img
                                className="flag-icon"
                                src={country.flags.png}
                                alt={country.name.common}
                                style={{
                                  width: "20px",
                                  marginRight: "10px",
                                }}
                              />
                              {country.name.common}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                  <li>
                    <span className="ship-text">Language</span>
                    <div className="drop-down">
                      <select
                        className="text-capitalize border-0"
                        id=""
                        name="locale"
                        defaultValue={locale}
                      >
                        {locales.map((local) => (
                          <option
                            key={local}
                            className="text-capitalize"
                            value={local}
                          >
                            {local === "en" && "English"}
                            {local === "bn" && "বাংলা"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li>
                    <span className="ship-text">Currency</span>
                    <div className="drop-down">
                      <select className="English text-center" name="currency">
                        <option value="USD">Select Currency</option>
                        {data?.data?.map((curr) => (
                          <option
                            key={curr.code}
                            value={curr.code}
                            selected={code === curr.code}
                          >
                            {curr.code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <Button type="submit" className="btn save btn-danger">
                    Save
                  </Button>
                </Form>
              </Dropdown.Menu>
            </Dropdown>
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
    </>
  );
}
