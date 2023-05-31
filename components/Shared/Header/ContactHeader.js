import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
export default function ContactHeader({ user }) {
  const router = useRouter();
  const { locale, locales, push } = router;

  const handleChange = (e) => {
    e.preventDefault();
    const locale = e.target.locale.value;
    router.push("/", "/", { locale });
  };

  const t = locale === "en" ? en : bn;
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
            <div class="dropdown">
              <button
                class="btn  border-0  dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: "none" }}
              >
                <Image
                  className="flag-img"
                  src="/images/flag.png"
                  alt="country"
                  width={18}
                  height={14}
                  loading="eager"
                />
                <span>/{t.homePage.header.contactHeader.countryCurrency}</span>
              </button>

              <form
                onSubmit={handleChange}
                style={{ zIndex: "99999" }}
                class="dropdown-menu"
              >
                <li>
                  {" "}
                  <span className="ship-text">Ship to</span>
                  <div className="drop-down">
                    <select className="English" id="">
                      <option value="Bangladesh">Country 1</option>
                      <option value="Bangladesh">Country 2</option>
                      <option value="Bangladesh">Country 3</option>
                    </select>
                  </div>
                </li>
                <li>
                  {" "}
                  <span className="ship-text">Language</span>
                  <div className="drop-down">
                    <select
                      className="text-capitalize border-0"
                      id=""
                      name="locale"
                      defaultValue={locale}
                    >
                      {locales.map((local) => (
                        <option className="text-capitalize" value={local}>
                          {local === "en" && "English"}
                          {local === "bn" && "বাংলা"}
                        </option>
                      ))}
                    </select>
                  </div>
                </li>
                <li>
                  {" "}
                  <span className="ship-text">Currency</span>
                  <div className="drop-down">
                    <select className="English" id="">
                      <option value="Bangladesh">Currency 1</option>
                      <option value="Bangladesh">Currency 2</option>
                      <option value="Bangladesh">Currency 3</option>
                    </select>
                  </div>
                </li>
                <button type="submit" className="btn save btn-danger">
                  {" "}
                  Save
                </button>
              </form>
            </div>
          </div>
          <div className="user-sign ">
            <div className="sign-icons ">
              {!user?.providerId && (
                <div>
                  <Link href="/signin" prefetch={false}>
                    <i className="fas fa-user"></i>
                    <span className="sign-text ">
                      {" "}
                      &nbsp; {t.homePage.header.contactHeader.signInTitle}&nbsp;
                    </span>
                  </Link>{" "}
                  | &nbsp;
                  <Link href="/signup">
                    <i className="fas fa-user-plus"></i>
                    <span className="sign-text">
                      &nbsp; {t.homePage.header.contactHeader.singUpTitle}&nbsp;
                    </span>
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
