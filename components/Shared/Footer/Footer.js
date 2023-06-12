import React from "react";
import { BiDollar, BiCreditCardFront } from "react-icons/bi";
import { GrDeliver } from "react-icons/gr";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="footer-section ">
      <div className="footer-main">
        <div className="footer-1">
          {[1, 2, 3, 4, 5, 6].map((item,index) => (
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
            <a className="footer-click" href="">
              Making Payments
            </a>
          </div>
          <div>
            <a href="">Deliver Options</a>
          </div>
          <div>
            <a href="">Buyer Protection</a>
          </div>
          <div></div>
        </div>
        <div className="footer-links">
          <div>
            <h6>Customer Services</h6>
          </div>
          <div>
            <a href="">Making Payments</a>
          </div>
          <div>
            <a href="">Deliver Options</a>
          </div>
          <div>
            <a href="">Buyer Protection</a>
          </div>
          <div></div>
        </div>
        <div className="footer-links">
          <div>
            <h6>Collaborate with us</h6>
          </div>
          <div>
            <a href="">Making Payments</a>
          </div>
          <div>
            <a href="">Deliver Options</a>
          </div>
          <div>
            <a href="">Buyer Protection</a>
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
