import Logo from "../components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import clsx from "clsx";
import useTranslation from "@/hooks/useTranslation";
import useOutsideAlerter from "@/hooks/useOutsideAlterter";

const MobileMenu = ({
  c_menu,
  setShowMenu,
  setTelegramShow,
  setTwitterShow
}) => {
  const [isActive, setActive] = useState(false);
  const { locale, setLocale } = useTranslation();
  const asPath = useRouter();

  return (
    <>
      {c_menu.hasChildren ? (
        <>
          <div
            className="flex flex-row items-center justify-center gap-4"
            onClick={() => setActive(!isActive)}
          >
            <p className="nav-link block cursor-pointer">
              {c_menu.name[locale]}
            </p>
            <div
              className={clsx(
                "bg-[url('/images/nav/nav_ic_arrow_unfold.svg')] w-[10px] h-[10px] transition-all duration-200",
                isActive && "rotate-180"
              )}
            />
          </div>
          <div
            className={clsx(
              "flex flex-col overflow-y-hidden transition-all duration-200 ease-out h-0",
              isActive && `h-auto`
            )}
          >
            {c_menu.children.map((child, index) => (
              <React.Fragment key={index}>
                {child.name["en"] == "Telegram" ? (
                  <button
                    className="text-text text-[16px] leading-8 text-center"
                    onClick={() => setTelegramShow(true)}
                  >
                    {child.name[locale]}
                  </button>
                ) : (
                  <React.Fragment>
                    {child.name["en"] == "Twitter" ? (
                      <button
                        className="text-text text-[16px] leading-8 text-center"
                        onClick={() => setTwitterShow(true)}
                      >
                        {child.name[locale]}
                      </button>
                    ) : (
                      <Link
                        href={child.url}
                        target={child.target}
                        onClick={() => setShowMenu(false)}
                      >
                        <p className="text-text text-[16px] leading-8  text-center">
                          {child.name[locale]}
                        </p>
                      </Link>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <Link
          href={c_menu.url}
          target={c_menu.target}
          onClick={() => setShowMenu(false)}
        >
          <p
            className={clsx(
              "nav-link block text-center",
              asPath.pathname == c_menu.url && "active"
            )}
          >
            {c_menu.name[locale]}
          </p>
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
          <li
            className={clsx("mobile-lang-menu", locale == "en" && "active")}
            onClick={() => onChangeLocale("en")}
          >
            EN
          </li>
          <li
            className={clsx("mobile-lang-menu", locale == "zh-CN" && "active")}
            onClick={() => onChangeLocale("zh-CN")}
          >
            中文
          </li>
          <li
            className={clsx("mobile-lang-menu", locale == "zh" && "active")}
            onClick={() => onChangeLocale("zh")}
          >
            繁体
          </li>
          <li
            className={clsx("mobile-lang-menu", locale == "ja" && "active")}
            onClick={() => onChangeLocale("ja")}
          >
            日本語
          </li>
          <li
            className={clsx("mobile-lang-menu", locale == "ko" && "active")}
            onClick={() => onChangeLocale("ko")}
          >
            Korean
          </li>
          <li
            className={clsx("mobile-lang-menu", locale == "vi" && "active")}
            onClick={() => onChangeLocale("vi")}
          >
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
  const { main, home, footer, language } = menu;

  // states declaration
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);
  const [direction, setDirection] = useState(null);

  const asPath = useRouter();

  // telegram
  const refTelegramHeader = useRef();
  const [isTelegramMobileMenu, setTelegramMobileMenu] = useState(false);
  useOutsideAlerter(refTelegramHeader, setTelegramMobileMenu);

  // twitter
  const refTwitterHeader = useRef();
  const [isTwitterMobileMenu, setTwitterMobileMenu] = useState(false);
  useOutsideAlerter(refTwitterHeader, setTwitterMobileMenu);

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

    const onScroll = () => {
      const scrollY = window.scrollY;
      scrollY > 0 ? setSticky(true) : setSticky(false);
      if (scrollY > headerHeight) {
        prevScroll > scrollY ? setDirection(-1) : setDirection(1);
        prevScroll = scrollY;
      } else {
        setDirection(null);
      }
    }
    window.addEventListener("scroll", onScroll);
    
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
                    <ul className="dropdown-menu z-[100]">
                      {menu.children.map((child, c_index) => (
                        <React.Fragment key={`submenu-${index}-${c_index}`}>
                          {child.hasChildren ? (
                            <li className="dropdown dropdown-right group">
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
                    className={clsx("menu-item", locale == "en" && "active")}
                    onClick={() => onChangeLocale("en")}
                  >
                    EN
                  </li>
                  <li
                    className={clsx("menu-item", locale == "zh-CN" && "active")}
                    onClick={() => onChangeLocale("zh-CN")}
                  >
                    中文
                  </li>
                  <li
                    className={clsx("menu-item", locale == "zh" && "active")}
                    onClick={() => onChangeLocale("zh")}
                  >
                    繁体
                  </li>
                  <li
                    className={clsx("menu-item", locale == "ja" && "active")}
                    onClick={() => onChangeLocale("ja")}
                  >
                    日本語
                  </li>
                  <li
                    className={clsx("menu-item", locale == "ko" && "active")}
                    onClick={() => onChangeLocale("ko")}
                  >
                    Korean
                  </li>
                  <li
                    className={clsx("menu-item", locale == "vi" && "active")}
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
          "md:hidden absolute w-[100vw] h-[100vh] bg-[url('/images/home/bg-menu.png')] top-0 bg-cover transition-all duration-100 ease-linear z-10 overflow-y-scroll",
          showMenu && "left-0",
          !showMenu && "-left-[100vw]"
        )}
      >
        <div
          className="flex container min-h-full justify-center pt-16 py-8"
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
              <MobileMenu
                key={index}
                c_menu={menu}
                setShowMenu={setShowMenu}
                setTelegramShow={setTelegramMobileMenu}
                setTwitterShow={setTwitterMobileMenu}
              />
            ))}
            <MobileLangMenu
              language={language}
              onChangeLocale={onChangeLocale}
            />
          </div>
        </div>
      </div>
      {/* Telegram */}
      <div
        className={clsx(
          "absolute z-20 overflow-y-hidden opacity-0 bg-[#1E2126] w-full md:w-[230px] h-0 rounded-lg border-[#2f2f2f] border-2 px-[14px] py-2 text-[12px] bottom-[10px] left-0 transition-all duration-200 ease-linear",
          isTelegramMobileMenu && "opacity-100 h-[350px]"
        )}
        ref={refTelegramHeader}
      >
        {footer.telegram.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.url}
              target="_blank"
              className="block text-white text-[15px] hover:text-cred active:text-cred py-2 border-b-[1px] border-b-[#ffffff] border-opacity-10"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      {/* Twitter */}
      <div
        className={clsx(
          "absolute z-20 overflow-y-hidden opacity-0 bg-[#1E2126] w-full md:w-[230px] h-0 rounded-lg border-[#2f2f2f] border-2 px-[14px] py-2 text-[12px] bottom-[10px] left-0 transition-all duration-200 ease-linear",
          isTwitterMobileMenu && "opacity-100 h-[102px]"
        )}
        ref={refTwitterHeader}
      >
        {footer.twitter.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.url}
              target="_blank"
              className="block text-white text-[15px] hover:text-cred active:text-cred py-2 border-b-[1px] border-b-[#ffffff] border-opacity-10"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Header;
