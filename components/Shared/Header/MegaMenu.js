import React, { useEffect, useState } from "react";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
import { useRouter } from "next/router";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { useDispatch, useSelector } from "react-redux";
import { useSignOut } from 'react-firebase-hooks/auth';
import { logOut } from "../../../features/auth/authSlice";
import auth from "../../../firebase.init";
import { toast } from "react-hot-toast";

const MegaMenu = () => {


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
          name: "Heating, Cooling & Air...",
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
          name: "Laptop and computers",
          childCategories: [
            {
              name: "Laptop"
            },
            {
              name: "Keyboard And Mouce",
            },
            {
              name: "Computer Monitor",
            },
            {
              name: "Pc Gaming",
            },
            {
              name: "Hard Drive and Storage",
            },
            {
              name: "Networking",
            }
          ],
        },
        {
          name: "Computers and Accessories",
          childCategories: [
            {
              name: "Monitors",
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
          name: "Gift exhange",
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
  const { seller, isLoading } = useSelector((state => state.auth))
  const { user } = useSelector((state => state.auth))
  const [isMegaMenuOn, setIsMegaMenuOn] = useState(false);
  const [signOut, loading] = useSignOut(auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : bn;

  const handleMegaMenu = () => {
    setIsMegaMenuOn(!isMegaMenuOn)
  }
  const handleNavigateForSeller = () => {
    if (user?.email) {
      const success = window.confirm('Are you sure want to log out as a customer ?');

      if (success) {
        localStorage.removeItem('accessToken');
        if (user?.providerId === "custom") {
          localStorage.removeItem("accessToken");
          dispatch(logOut());
          toast.success("Logout Successful", { id: "logout" });
          router.push('/seller/login')
        }
        if (user?.providerId === "firebase") {
          try {
            const success = signOut().then(() => {
              localStorage.removeItem("accessToken");
              dispatch(logOut());
              toast.success("Logout successful", { id: "logout" });
              router.push('/seller/login')
            });
          } catch (error) { }
        }
      }
      else {
        router.push('/')
      }

    }
    else{
      router.push('/seller/login')
    }
  }
  useEffect(() => {

  }, [])

  return (
    <div id="sec_bar" className="sec_nav ">
      <div className="container-fluid">
        <div className="row align-items-center">

          <div className="d-flex justify-content-between">
            <div
              className="first-part d-flex justify-content-start "

            >
              <div className="frombar">
                <ul className="mb-0" >
                  <span onClick={handleMegaMenu} className="cateogries-megamenu">
                    <span className=" d-inline-block">
                      <li className="inner-li">Categories</li>

                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="ml-1 h-3 w-3 group-hover:text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                  {isMegaMenuOn && <div id="accordion_body" className="accordion-body p-0">
                    <ul className="m-0 p-0">
                      {megaMenuData?.map((menu, index) => (
                        <li key={index} className={menu?.parentClassName}>
                          <a href="#base" className="main-cata">
                            {menu?.mainCategoryName}
                          </a>
                          <div className={menu?.childClassName} id={menu?.htmlId}>
                            <div className="content">
                              {menu?.subCategories?.map((category, index) => (
                                <div key={index} className="dropmenu">
                                  <header className="con-head">
                                    {category?.name}
                                  </header>
                                  <ul className="pro-nav ps-0 ">
                                    {category?.childCategories?.map((child, index) => (
                                      <li key={index} className="drop-nav-link">
                                        <Link href={`/shop?category=${menu?.mainCategoryName}&subCategory=${category?.name}&childCategory=${child?.name}`}>
                                          {child?.name}
                                        </Link>


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
                  </div>}
                  {t.homePage.header.nav.map((navItem, index) => (
                    <Link key={index} href={navItem?.link}>
                      <li className="inner-li">{navItem?.title}</li>
                    </Link>
                  ))}
                  {!seller?.email && <p onClick={handleNavigateForSeller} className="become-seller">
                    <span className="inner-li">Become a seller</span>
                  </p>}
                </ul>
              </div>
            </div>
            <div className="frombar right-part-nav">
              <div className=" ">
                <ul className="mb-0 d-flex justify-content-center align-items-center">
                  <LanguageSelector></LanguageSelector>
                  <li onClick={() => router.push('/privacy-policy')} className="inner-li">Privacy Policy</li>
                  <li className="inner-li">Terms & Conditions</li>
                </ul>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;