import React, { useEffect } from 'react';
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
import { useRouter } from 'next/router';
import Link from 'next/link';

const MegaMenu = () => {
    useEffect(() => {
        window.addEventListener("scroll", function () {
            let header = this.document.querySelector("#strip2");
            let bar = this.document.querySelector("#nav_Bar");
            let strip = this.document.querySelector("#strip");
            let bod = document.querySelector("#accordion_body");
            let stick = this.document.querySelector("#sec_bar");

            bar?.classList.toggle("removeBar", window.scrollY > 50);
            header?.classList.toggle("sticky", window.scrollY > 50);
            stick?.classList.toggle("stic", window.scrollY > 50);
            bod?.classList.toggle("main-bod", window.scrollY > 50);
            strip?.classList.toggle("strip-2-mar", window.scrollY > 50);
        });
    }, []);
    const megaMenuData = [

    ];

    const router = useRouter();
    const { locale } = router;
    const t = locale === "en" ? en : bn;
    return (
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
                                <span style={{ fontSize: "15px" }}>
                                    {" "}
                                    {t.homePage.header.megaMenuTitle}
                                </span>
                            </button>
                        </h2>
                        <div
                            id="panelsStayOpen-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingThree"
                        >
                            <div id="accordion_body" className="accordion-body p-0">
                                <ul className='m-0 p-0'>
                                    <li className="nav-links here">
                                        <a href="#about" className="main-cata  go-down">
                                            Appliances
                                        </a>
                                        <div  className="mega_content">
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
                    <div
                        className=" d-flex justify-content-end "
                        style={{ width: "78%" }}
                    >
                        <div className="frombar">
                            <ul>
                                {t.homePage.header.nav.map((navItem) => (
                                    <Link href={navItem?.link}>
                                        <li className="inner-li">{navItem?.title}</li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;