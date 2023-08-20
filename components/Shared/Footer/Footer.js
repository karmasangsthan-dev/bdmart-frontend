import React from "react";
import { BiDollar, BiCreditCardFront } from "react-icons/bi";
import { GrDeliver } from "react-icons/gr";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="footer-section ">
      <div className="footer-main">
        <div className="footer-1">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className="footer-icons">
              <div className="footer-icon round-icon">
                <BiDollar className="fs-2" />
              </div>
              <div className="logo-heading">Best Value</div>
              <div className="logo-des">
                We offer competitive prices on over 100 million prices
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-2 ">
        <div className="social-area">
          <div className="">
            <h6 className="ms-1 ">Stay Connected</h6>
          </div>
          <div className="social-icons">
            <ul className="ps-0">
              <a href="">
                <li>
                  <i className="fab fa-facebook-square"></i>
                </li>
              </a>
              <a href="">
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
              </a>

              <a href="">
                <li>
                  <i className="fab fa-whatsapp"></i>
                </li>
              </a>
              <a href="">
                <li>
                  <i className="fab fa-facebook-messenger"></i>
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h6>Shopping with us</h6>
          </div>
          <div>
            <Link className="footer-click" href="">
              Product Categories
            </Link>
          </div>
          <div>
            <Link href="">New Arrivals</Link>
          </div>
          <div>
            <Link href="">Best Sellers</Link>
          </div>
          <div></div>
        </div>
        <div className="footer-links">
          <div>
            <h6>Customer Services</h6>
          </div>
          <div>
            <a href="">Contact Us</a>
          </div>
          <div>
            <a href="">FAQs</a>
          </div>
          <div>
            <a href="">Returns & Exchanges</a>
          </div>
          <div></div>
        </div>
        <div className="footer-links">
          <div>
            <h6>Collaborate with us</h6>
          </div>
          <div>
            <a href="">Affiliate Program</a>
          </div>
          <div>
            <a href="">Wholesale Inquiries</a>
          </div>
          <div>
            <a href="">Brand Partnerships</a>
          </div>
          <div></div>
        </div>
      </div>
      <div className="footer-3 ">
        <ul className="last-ul copy-right ps-0">
          <a href="">
            <li className="">Terms of use</li>
          </a>{" "}
          |
          <a href="">
            <li>Privacy Policy</li>
          </a>{" "}
          |
          <a href="">
            <li>Interest-Based ads</li>
          </a>
        </ul>
        <div className="copy-right">
          <p>
            @ {new Date().getFullYear()} - {new Date().getFullYear() + 1} by
            Developers, Bangladesh Mart
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
