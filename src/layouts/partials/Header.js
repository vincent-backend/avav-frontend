import Logo from "../components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import clsx from "clsx";
import useTranslation from "@/hooks/useTranslation";

const MobileMenu = ({ menu, setShowMenu }) => {
  const [isActive, setActive] = useState(false);
  const { locale, setLocale } = useTranslation();
  return (
    <>
      {menu.hasChildren ? (
        <>
          <div
            className="flex flex-row items-center justify-center gap-4"
            onClick={() => setActive(!isActive)}
          >
            <p className="nav-link block cursor-pointer">{menu.name[locale]}</p>
            <div
              className={clsx(
                "bg-[url('/images/nav/nav_ic_arrow_unfold.svg')] w-[10px] h-[10px] transition-all duration-200",
                isActive && "rotate-180"
              )}
            />
          </div>
          <div
            className={clsx(
              "flex flex-col overflow-y-hidden transition-all duration-100 ease-out h-0",
              isActive && "h-auto"
            )}
          >
            {menu.children.map((child, index) => (
              <Link
                key={index}
                href={child.url}
                target={child.target}
                onClick={() => setShowMenu(false)}
              >
                <p className="text-text text-[16px] leading-10  text-center">
                  {child.name[locale]}
                </p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Link
          href={menu.url}
          target={menu.target}
          onClick={() => setShowMenu(false)}
        >
          <p className="nav-link block text-center">{menu.name[locale]}</p>
        </Link>
      )}
    </>
  );
};

const MobileLangMenu = ({ language, onChangeLocale }) => {
  const [isActive, setActive] = useState(false);
  const { locale, setLocale } = useTranslation();
  return (
    <>
      <div
        className="flex flex-row items-center justify-center gap-4"
        onClick={() => setActive(!isActive)}
      >
        <p className="nav-link block cursor-pointer">{language.name[locale]}</p>
        <div
          className={clsx(
            "bg-[url('/images/nav/nav_ic_arrow_unfold.svg')] w-[10px] h-[10px] transition-all duration-200",
            isActive && "rotate-180"
          )}
        />
      </div>
      <div
        className={clsx(
          "flex flex-col overflow-y-hidden transition-all duration-100 ease-out h-0",
          isActive && "h-auto"
        )}
      >
        <ul className="text-center cursor-pointer leading-8">
          <li onClick={() => onChangeLocale("en")}>
            EN
          </li>
          <li  onClick={() => onChangeLocale("zh-CN")}>
            中文
          </li>
          <li onClick={() => onChangeLocale("zh")}>
            繁体
          </li>
          <li onClick={() => onChangeLocale("ja")}>
            日本語
          </li>
          <li onClick={() => onChangeLocale("ko")}>
            Korean
          </li>
          <li onClick={() => onChangeLocale("vi")}>
            Tiếng Việt
          </li>
        </ul>
      </div>
    </>
  );
};

const Header = () => {
  const { locale, setLocale } = useTranslation();

  // distructuring the main menu from menu object
  const { main, home, language } = menu;

  // states declaration
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);
  const [direction, setDirection] = useState(null);

  const asPath = useRouter();

  const onChangeLocale = (l) => {
    setLocale(l);
    setShowMenu(false);
  };

  //sticky header
  useEffect(() => {
    const header = headerRef.current;
    const headerHeight = header.clientHeight + 60;
    let prevScroll = 0;

    if (showMenu) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      scrollY > 0 ? setSticky(true) : setSticky(false);
      if (scrollY > headerHeight) {
        prevScroll > scrollY ? setDirection(-1) : setDirection(1);
        prevScroll = scrollY;
      } else {
        setDirection(null);
      }
    });
  }, [locale, showMenu]);

  // logo source
  const { logo } = config.site;

  return (
    <>
      <header
        className={`header ${sticky && "header-sticky"} ${
          !showMenu && direction === 1 && "unpinned"
        }`}
        ref={headerRef}
      >
        <nav className={clsx("navbar nav-container")}>
          {/* logo */}
          <div className="order-0" onClick={() => setShowMenu(false)}>
            <Logo src={logo} lang={locale} />
          </div>

          {/* Main menu */}
          <ul className="menu-items">
            {main.map((menu, index) => (
              <React.Fragment key={`menu-${index}`}>
                {menu.hasChildren ? (
                  <li className="dropdown">
                    <p className="menu-item first-item expand-btn cursor-pointer">
                      {menu.name[locale]}
                    </p>
                    <ul className="dropdown-menu">
                      {menu.children.map((child, c_index) => (
                        <React.Fragment key={`submenu-${index}-${c_index}`}>
                          {child.hasChildren ? (
                            <li className="dropdown dropdown-right">
                              <p className="menu-item expand-btn">
                                {child.name[locale]}
                              </p>
                              <ul className="menu-right">
                                {child.children.map((grandson, g_index) => (
                                  <React.Fragment key={`lastmenu-${g_index}`}>
                                    <li>
                                      <Link
                                        href={grandson.url}
                                        target={grandson.target}
                                        className="menu-item"
                                      >
                                        {grandson.name[locale]}
                                      </Link>
                                    </li>
                                  </React.Fragment>
                                ))}
                              </ul>
                            </li>
                          ) : (
                            <li>
                              <Link
                                href={child.url}
                                target={child.target}
                                className={clsx(
                                  "menu-item",
                                  asPath.pathname == child.url && "active"
                                )}
                              >
                                {child.name[locale]}
                              </Link>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li>
                    <Link
                      href={menu.url}
                      target={menu.target}
                      className={clsx(
                        "menu-item",
                        asPath.pathname == menu.url && "active"
                      )}
                    >
                      {menu.name[locale]}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}

            {/* Language */}
            <li className="dropdown">
              <div className="menu-item first-item expand-btn cursor-pointer">
                {language.name[locale]}
                <ul className="dropdown-menu">
                  <li
                    className="menu-item"
                    onClick={() => onChangeLocale("en")}
                  >
                    EN
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => onChangeLocale("zh-CN")}
                  >
                    中文
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => onChangeLocale("zh")}
                  >
                    繁体
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => onChangeLocale("ja")}
                  >
                    日本語
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => onChangeLocale("ko")}
                  >
                    Korean
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => onChangeLocale("vi")}
                  >
                    Tiếng Việt
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="order-1 flex items-center md:ml-0">
            {/* navbar toggler */}
            {showMenu ? (
              <button
                className="h-8 w-8 text-3xl text-white md:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <CgClose />
              </button>
            ) : (
              <button
                className="text-dark md:hidden -mr-3"
                onClick={() => setShowMenu(!showMenu)}
              >
                <svg
                  width="60px"
                  height="60px"
                  viewBox="0 0 88 88"
                  version="1.1"
                >
                  <title>home_menu@2x</title>
                  <g
                    id="页面-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="$avav_h5"
                      transform="translate(-657.000000, -94.000000)"
                    >
                      <g
                        id="Navigation-Bar"
                        transform="translate(0.000000, 88.000000)"
                      >
                        <g
                          id="home_menu"
                          transform="translate(657.000000, 6.000000)"
                        >
                          <rect
                            id="矩形"
                            fill="#EAEAEA"
                            opacity="0"
                            x="0"
                            y="0"
                            width="88"
                            height="88"
                          ></rect>
                          <path
                            d="M63,55 L63,59 L25,59 L25,55 L63,55 Z M63,42 L63,46 L25,46 L25,42 L63,42 Z M63,29 L63,33 L25,33 L25,29 L63,29 Z"
                            id="ic"
                            fill="#FFFFFF"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            )}
            {/* /navbar toggler */}
          </div>
        </nav>
      </header>
      <div
        className={clsx(
          "md:hidden absolute w-[100vw] h-[100vh] bg-[url('/images/home/bg-menu.png')] top-0 bg-cover transition-all duration-100 ease-linear z-10",
          showMenu && "left-0",
          !showMenu && "-left-[100vw]"
        )}
      >
        <div
          className="flex container h-full justify-center mt-16  overflow-y-scroll"
          id="mobile-menu"
        >
          <div className="flex flex-col">
            <Link
              href="/"
              className={clsx(
                "nav-link text-center block",
                asPath.pathname == "/" && "active"
              )}
              onClick={() => setShowMenu(false)}
            >
              {home.name[locale]}
            </Link>
            {main.map((menu, index) => (
              <MobileMenu key={index} menu={menu} setShowMenu={setShowMenu} />
            ))}
            <MobileLangMenu
              language={language}
              onChangeLocale={onChangeLocale}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
