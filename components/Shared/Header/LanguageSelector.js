import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrencyQuery, useUpdateCurrencyMutation } from '../../../features/currency/currencyApi';
import { Button, Dropdown, Form } from "react-bootstrap";
import { setUpCurrency } from '../../../features/currency/currencySlice';
import { countriesData } from "../../../utils/countryData";

const LanguageSelector = () => {
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
                                        {countriesData?.map((country, index) => (
                                            <li
                                                className="header-shipping-country-name px-2"
                                                key={index}
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
                        <li className='' >
                            <button type="submit" className=" language-selector-save">
                                Save
                            </button>
                        </li>
                    </Form>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default LanguageSelector;