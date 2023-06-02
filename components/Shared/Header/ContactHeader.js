import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Dropdown, Form } from "react-bootstrap";
export default function ContactHeader({ user }) {
  const router = useRouter();
  const { locale, locales, push } = router;
  const [countries, setCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [isSaved, setIsSaved] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  console.log(currencies)
  const handleChange = (e) => {
    e.preventDefault();
    const locale = e.target.locale.value;
    router.push("/", "/", { locale });

    localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
    setIsSaved(isSaved + 1)
  };

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    const data = JSON.parse(savedCountry);
    setSelectedState(data)
  }, [selectedCountry, isSaved]);

  useEffect(() => {
    fetchCountries();
    fetchCurrencies();
  }, [])

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();

      // Sort countries alphabetically by name
      const sortedCountries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      setCountries(sortedCountries);
    } catch (error) {
      console.log("Error fetching countries:", error);
    }
  };
  const fetchCurrencies = async () => {
    try {
      const response = await fetch(
        "https://api.freecurrencyapi.com/v1/latest?apikey=Zj1a2acVZJE3CP9TCiDpMXPLAmFIgV5MkZlGG4vk"
      );
      const data = await response.json();

      // Transform the currency data into an array of objects
      const currencyArray = Object.entries(data.data).map(([code, rate]) => ({
        code,
        rate,
      }));

      setCurrencies(currencyArray);
    } catch (error) {
      console.log("Error fetching currencies:", error);
    }
  };
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
                  className="flag-img"
                  src={selectedState?.flags?.png || '/images/flag.png'}
                  alt="country"
                  width={18}
                  height={14}
                  loading="eager"
                />
                <span>/{locale === 'en' && "English"}{locale === 'bn' && "বাংলা"}/Currency</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu" id="myDD">

                <Form onSubmit={handleChange}>
                  <li>
                    <span className="ship-text">Ship to</span>
                    <div className="drop-down" style={{ padding: '5px 0' }}>
                      <button className="btn border-0 dropdown-toggle"
                        type="button"
                        onClick={handleToggle}>
                        {selectedState ? (
                          <>
                            <img
                              className="flag-img"
                              src={selectedState.flags.png}
                              alt={selectedState.name.common}
                              width={18}
                              height={14}
                              loading="eager"
                            />
                            {selectedState?.name?.common}
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
                                  width: '20px',
                                  marginRight: '10px',
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
                            {local === 'en' && 'English'}
                            {local === 'bn' && 'বাংলা'}
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
                        onChange={(e) =>
                          handleCurrencySelect(e.target.value)
                        }
                      >
                        <option value="">Select Currency</option>
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code}
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
