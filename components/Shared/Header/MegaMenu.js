import React, { useEffect } from "react";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
import { useRouter } from "next/router";
import Link from "next/link";

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
    {
      mainCategoryName: "Appliances",
      parentClassName: "nav-links here",
      childClassName: "mega_content",
      subCategories: [
        {
          name: "Small Appliances",
          childCategories: [
            {
              name: "Coffe,Espresso & Tea Makers",
            },
            {
              name: "Blenders & juicers",
            },
            {
              name: "Slow Cookers & Multi Pots",
            },
            {
              name: "Microwaves",
            },
            {
              name: "Electric Grills & Skillets",
            },
            {
              name: "Stand Mixers",
            },
          ],
        },
        {
          name: "Vacuum Sealers",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Large Appliances",
          childCategories: [
            {
              name: "Refurbished Vacuums",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Irons & Clothes Steamers",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Air Conditioners",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
          ],
        },
        {
          name: "Sewing Machines",
          childCategories: [
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
      ],
    },
    {
      mainCategoryName: "Automotive",
      parentClassName: "nav-links second",
      childClassName: "mega_content megas",
      htmlId: "mega_content",
      subCategories: [
        {
          name: "Water Purification",
          childCategories: [
            {
              name: "Upright Vacuums",
            },
            {
              name: "Vacuums & Floorcare",
            },
            {
              name: "Product Layout3",
            },
            {
              name: "Canister Vacuums",
            },
            {
              name: "Product Layout5",
            },
            {
              name: "Robot Vacuums",
            },
          ],
        },
        {
          name: "Heating, Cooling & Air Quality",
          childCategories: [
            {
              name: "Humidifiers",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Baby Food Makers",
            },
          ],
        },
        {
          name: "Baby Food & Bottle A...",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Baby Formula Makers",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Baby Formula Makers",
            },
            {
              name: "Handvacs",
            },
          ],
        },
        {
          name: "Pet Friendly Vacuums",
          childCategories: [
            {
              name: "Stick Vacuums",
            },
            {
              name: "Freezers & Ice Makers",
            },
            {
              name: "Product-Layout3",
            },
          ],
        },
        {
          name: "Refrigerators",
          childCategories: [
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
      ],
    },
    {
      mainCategoryName: "Baby",
      parentClassName: "nav-links second",
      childClassName: "mega_content megas2",
      htmlId: "mega_content",
      subCategories: [
        {
          name: "Specialty Appliances",
          childCategories: [
            {
              name: "Over-The-Range Microwaves",
            },
            {
              name: "Product Layout2",
            },
            {
              name: "Product Layout3",
            },
            {
              name: "Ovens & Ranges",
            },
            {
              name: "Product Layout5",
            },
            {
              name: "Product Layout6",
            },
          ],
        },
        {
          name: "Product Layout",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Product Layout",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Product Layout",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
          ],
        },
        {
          name: "Product Layout",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
          ],
        },
      ],
    },
    {
      mainCategoryName: "Clothing,Shoes & Accessories",
      parentClassName: "nav-links second",
      htmlId: "mega_content",
      childClassName: "mega_content megas3",
      subCategories: [
        {
          name: "Women",
          childCategories: [
            {
              name: "Shop all women's clothing",
            },
            {
              name: "Plus",
            },
            {
              name: "Product Layout3",
            },
            {
              name: "Product Layout4",
            },
            {
              name: "Handbags & wallets",
            },
            {
              name: "Product Layout6",
            },
          ],
        },
        {
          name: "Men",
          childCategories: [
            {
              name: "Shop all men's clothing",
            },
            {
              name: "Big & tall",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Wallets",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "kids",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Shoes",
          childCategories: [
            {
              name: "Shop all shoes",
            },
            {
              name: "Women's shoes",
            },
            {
              name: "Boys's shoes",
            },
          ],
        },
        {
          name: "Juellary",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
          ],
        },
      ],
    },
    {
      mainCategoryName: "Electronics",
      parentClassName: "nav-links second",
      htmlId: "mega_content",
      childClassName: "mega_content megas4",
      subCategories: [
        {
          name: "Specialty Appliances",
          childCategories: [
            {
              name: "Over-The-Range Microwaves",
            },
            {
              name: "Shop Rollback",
            },
            {
              name: "Product Layout3",
            },
            {
              name: "Ovens & Ranges",
            },
            {
              name: "Product Layout5",
            },
            {
              name: "Product Layout6",
            },
          ],
        },
        {
          name: "Product Layout",
          childCategories: [
            {
              name: "Shop Rollback",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Shop-Rollback",
            },
            {
              name: "Washers & Dryers",
            },
            {
              name: "Vacuum Sealers",
            },
          ],
        },
        {
          name: "Product Layout",
          childCategories: [
            {
              name: "Shop Rollback",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Shop Rollback",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Washers & Dryers",
            },
            {
              name: "Vacuum Sealers",
            },
          ],
        },
        {
          name: "Shoes",
          childCategories: [
            {
              name: "Shop all shoes",
            },
            {
              name: "Women's shoes",
            },
            {
              name: "Boys's shoes",
            },
          ],
        },
        {
          name: "Juellary",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
          ],
        },
      ],
    },
    {
      mainCategoryName: "Furniture",
      parentClassName: "nav-links second",
      htmlId: "mega_content",
      childClassName: "mega_content megas5",
      subCategories: [
        {
          name: "Bedroom Furniture",
          childCategories: [
            {
              name: "Shop all women's clothing",
            },
            {
              name: "Plus",
            },
            {
              name: "Product Layout3",
            },
            {
              name: "Product Layout4",
            },
            {
              name: "Handbags & wallets",
            },
            {
              name: "Product Layout6",
            },
          ],
        },
        {
          name: "Office Furniture",
          childCategories: [
            {
              name: "Shop all men's clothing",
            },
            {
              name: "Big & tall",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Wallets",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Living Room Furniture",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Kids Furniture",
          childCategories: [
            {
              name: "Shop all shoes",
            },
            {
              name: "Women's shoes",
            },
            {
              name: "Boys's shoes",
            },
          ],
        },
        {
          name: "Kitchen Furniture",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
          ],
        },
      ],
    },
    {
      mainCategoryName: "Gift & Holidays",
      parentClassName: "nav-links second",
      htmlId: "mega_content",
      childClassName: "mega_content megas6",
      subCategories: [
        {
          name: "Shop all gifts & holidays",
          childCategories: [
            {
              name: "Shop all women's clothing",
            },
            {
              name: "Plus",
            },
            {
              name: "Product Layout3",
            },
            {
              name: "Product Layout4",
            },
            {
              name: "Handbags & wallets",
            },
            {
              name: "Product Layout6",
            },
          ],
        },
        {
          name: "Fresh flower - delivered",
          childCategories: [
            {
              name: "Shop all men's clothing",
            },
            {
              name: "Big & tall",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Wallets",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Secrete Santa & gift exhange",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
            {
              name: "Product-Layout4",
            },
            {
              name: "Product-Layout5",
            },
            {
              name: "Product-Layout6",
            },
          ],
        },
        {
          name: "Product Layout",
          childCategories: [
            {
              name: "Shop all shoes",
            },
            {
              name: "Women's shoes",
            },
            {
              name: "Boys's shoes",
            },
          ],
        },
        {
          name: "Product Layout",
          childCategories: [
            {
              name: "Product-Layout1",
            },
            {
              name: "Product-Layout2",
            },
            {
              name: "Product-Layout3",
            },
          ],
        },
      ],
    },
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
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
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
                <ul className="m-0 p-0">
                  {megaMenuData?.map((menu) => (
                    <li className={menu?.parentClassName}>
                      <a href="#base" className="main-cata">
                        {menu?.mainCategoryName}
                      </a>
                      {
                        // console.log(menu)
                      }
                      <div className={menu?.childClassName} id={menu?.htmlId}>
                        <div className="content">
                          {menu?.subCategories?.map((category) => (
                            <div className="dropmenu">
                              <header className="con-head">
                                {category?.name}
                              </header>
                              <ul className="pro-nav">
                                {category?.childCategories?.map((child) => (
                                  <li className="drop-nav-link">
                                    <a href="#">{child?.name}</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
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
