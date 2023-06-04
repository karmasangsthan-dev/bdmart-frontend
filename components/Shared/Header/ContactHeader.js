import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUpCurrency } from "../../../features/currency/currencySlice";
import {
  decryptCurrency,
  encryptCurrency,
} from "../../../config/cryptingCurrency";

require("dotenv").config();
export default function ContactHeader({ user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const FREE_CURRENCY_API_KEY = "Zj1a2acVZJE3CP9TCiDpMXPLAmFIgV5MkZlGG4vk";
  const { locale, locales, push } = router;
  const [countries, setCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [isSaved, setIsSaved] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currency, setCurrency] = useState(null);



  const handleChange = async (e) => {
    e.preventDefault();
    const locale = e.target.locale.value;
    const currentRoute = router.asPath;
    router.push(currentRoute, currentRoute, { locale });

    if (selectedCurrency === null) {
      localStorage.setItem("selectedCurrency", JSON.stringify('USD'));
    }
    if (selectedCurrency != null) {
      localStorage.setItem("selectedCurrency", JSON.stringify(selectedCurrency));
    }

    const currencyRate = currencies.find(item => item.code === selectedCurrency);
    
    
    localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
    encryptCurrency(currencyRate.rate);
    setIsSaved(isSaved + 1);
    dispatch(setUpCurrency({ currency: selectedCurrency, currencyRate : currencyRate.rate }));
    setShowDropdown(false);
  };

  useEffect(() => {
    const selectedCountry = localStorage.getItem("selectedCountry");
    const selectedCurrency = localStorage.getItem("selectedCurrency");

    if (selectedCountry === null) {
      localStorage.setItem("selectedCountry", JSON.stringify({
        name: {
          common: 'United States'
        },
        flags: {
          png: "https://flagcdn.com/w320/us.png"
        }
      }));
    }
    if (selectedCurrency === null) {
      localStorage.setItem("selectedCurrency", JSON.stringify("USD"));
      encryptCurrency(1);
      dispatch(setUpCurrency({ currency: selectedCurrency ? selectedCurrency : 'USD', currencyRate: 1 }));
    }
  }, [])

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedCurrency = localStorage.getItem("selectedCurrency");
    const data = JSON.parse(savedCountry);
    const currency = JSON.parse(savedCurrency);
    setSelectedState(data);
    setSelectedCountry(data)
    setCurrency(currency);
    setSelectedCurrency(currency)
  }, [isSaved]);

  useEffect(() => {
    // countries 
    const allCountriesData = localStorage.getItem("countries");
    const allCountries = JSON.parse(allCountriesData);
    setCountries(allCountries);
    // courency 
    const allCurrencyData = localStorage.getItem("currencyArray");
    const allCurrency = JSON.parse(allCurrencyData);
    setCurrencies(allCurrency);


    let currency = localStorage.getItem("selectedCurrency");
    currency = currency?.replace(/"/g, "");
    const currencyRate = decryptCurrency();
    dispatch(setUpCurrency({ currency: currency, currencyRate }));

  }, []);


  // data load after 12 hours 
  useEffect(() => {
    const fetchData = async () => {
      // Check if data is already stored in localStorage
      const countries = localStorage.getItem('countries');
      const currencyArray = localStorage.getItem('currencyArray');
      const storedTimestamp = localStorage.getItem('timestamp');
      const currentTime = new Date().getTime();

      if (countries && currencyArray && storedTimestamp && currentTime - storedTimestamp < 12 * 60 * 60 * 1000) {

      } else {
        const countriesResponse = await fetch('https://restcountries.com/v3.1/all');
        
        const countriesData = await countriesResponse.json();
        const sortedCountries = countriesData?.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        const currencyResponse = await fetch('https://api.freecurrencyapi.com/v1/latest?apikey=Zj1a2acVZJE3CP9TCiDpMXPLAmFIgV5MkZlGG4vk');
        const currencyData = await currencyResponse.json();

        const currencyArray = Object.entries(currencyData.data).map(([code, rate]) => ({
          code,
          rate,
        }));

        localStorage.setItem('countries', JSON.stringify(sortedCountries));
        localStorage.setItem('currencyArray', JSON.stringify(currencyArray));
        localStorage.setItem('timestamp', currentTime);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      if (hours === 0 && minutes === 0) {
        fetchData();
      }
    }, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);


  const truncateName = (name) => {
    const maxLength = 20;
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    handleToggle();
  };
  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
  };

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
                  src={selectedState?.flags?.png || "/images/flag.png"}
                  alt="country"
                  width={18}
                  height={14}
                  loading="eager"
                />
                <span>
                  /{locale === "en" && "English"}
                  {locale === "bn" && "বাংলা"}/{currency || "Currency"}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ zIndex: '99999' }} className="dropdown-menu" id="myDD">
                <Form onSubmit={handleChange}>
                  <li>
                    <span className="ship-text">Ship to</span>
                    <div className="drop-down" style={{ padding: "5px 0" }}>
                      <button
                        className="btn border-0 dropdown-toggle"
                        type="button"
                        onClick={handleToggle}
                      >
                        {selectedState ? (
                          <>
                            <img
                              className="flag-img"
                              src={
                                selectedCountry?.flags?.png ||
                                selectedState?.flags?.png
                              }
                              alt={
                                selectedCountry?.name?.common ||
                                selectedState?.name?.common
                              }
                              width={18}
                              height={14}
                              loading="eager"
                            />
                            {selectedCountry?.name?.common ||
                              selectedState?.name?.common}
                          </>
                        ) : (
                          <span>Select Country</span>
                        )}
                      </button>

                      {isOpen && (
                        <ul className="dropdown-menu show country-ul-header">
                          {countries?.map((country) => (
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
                      <select
                        className="English text-center"
                        onChange={(e) => handleCurrencySelect(e.target.value)}
                      >
                        <option value="">Select Currency</option>
                        {currencies?.map((curr) => (
                          <option
                            key={curr.code}
                            value={curr.code}
                            selected={currency === curr.code}
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