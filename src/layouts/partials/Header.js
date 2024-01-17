import Logo from "../components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import clsx from "clsx";
import useTranslation from "@/hooks/useTranslation";

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
  }

  //sticky header
  useEffect(() => {
    const header = headerRef.current;
    const headerHeight = header.clientHeight + 60;
    let prevScroll = 0;
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

  }, [locale]);

  // logo source
  const { logo } = config.site;

  return (
    <>
      <header
        className={`header ${sticky && "header-sticky"} ${!showMenu && direction === 1 && "unpinned"
          }`}
        ref={headerRef}
      >
        <nav className={clsx("navbar nav-container", showMenu && "bg-[url('/images/home/bg-menu.png')] bg-cover md:bg-none overscroll-y-none")}>
          {/* logo */}
          <div className="order-0"  onClick={()=>setShowMenu(false)}>
            <Logo src={logo} lang={locale}/>
          </div>

          <ul
            id="nav-menu"
            className={clsx(!showMenu && "hidden", "navbar-nav order-2 w-full justify-center md:justify-end md:w-auto md:order-1 md:flex")}
          >
            <div className="w-full h-screen md:bg-none md:flex md:justify-end md:h-auto md:space-x-1 xl:space-x-3">
              <li className="nav-item md:hidden">
                <Link
                  href="/"
                  className={clsx("nav-link block", asPath.pathname == "/" && "active")}
                  onClick={()=>setShowMenu(false)}
                >
                  {home.name[locale]}
                </Link>
              </li>
              {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name[locale]}
                      <svg className="h-4 w-4 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden max-h-0 w-[240px] mx-auto overflow-hidden border border-[#979797] border-opacity-20 px-2 py-0 transition-all duration-500 group-hover:block group-hover:max-h-[246px] group-hover:py-1 md:invisible md:absolute md:left-1/2 md:block md:w-auto md:-translate-x-1/2 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          {menu.url == "/foundation" ? (
                            <Link
                            href={child.url}
                            className={`nav-dropdown-link block transition-all ${
                              asPath.pathname === child.url && "active"
                            }`}
                          >
                            {child.name[locale]}
                          </Link>
                          ) : (
                            <Link
                            href={child.url} target="_blank"
                            className={`nav-dropdown-link block transition-all ${
                              asPath.pathname === child.url && "active"
                            }`}
                          >
                            {child.name}
                          </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    {menu.url === "/tutorial" || menu.url === "/art" ?
                    (
                      <Link
                      href={menu.url} 
                      className={`nav-link block ${
                        asPath.pathname === menu.url && "active"
                      }`}
                    >
                      {menu.name[locale]}
                    </Link>
                    ) : (
                      <Link
                      href={menu.url} 
                      target="_blank"
                      className={`nav-link block ${
                        asPath.pathname === menu.url && "active"
                      }`}
                    >
                      {menu.name[locale]}
                    </Link>
                    )
                    }
                    
                  </li>
                )}
              </React.Fragment>
            ))}

              {/* Language support */}
              <li className="nav-item nav-dropdown group relative md:mt-0">
                <span className="nav-link inline-flex items-center">
                  {language.name[locale]}
                  <svg className="h-4 w-4 fill-current ml-1" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
                <ul className="nav-dropdown-list hidden max-h-0 w-[150px] mx-auto overflow-hidden border border-[#979797] border-opacity-20 py-0 transition-all duration-500 group-hover:block group-hover:max-h-[196px] group-hover:py-1 md:invisible md:absolute md:left-1/2 md:block md:w-auto md:-translate-x-1/2 md:group-hover:visible md:group-hover:opacity-100">
                  <li className="nav-dropdown-item" key={`en`}>
                    <button
                      className={clsx("nav-dropdown-link block transition-all w-full", locale == "en" && "active")}
                      onClick={()=>onChangeLocale("en")}
                    >
                      EN
                    </button>
                  </li>
                  <li className="nav-dropdown-item" key={`cn`}>
                    <button
                      className={clsx("nav-dropdown-link block transition-all w-full", locale == "cn" && "active")}
                      onClick={()=>onChangeLocale("cn")}
                    >
                      中文
                    </button>
                  </li>
                  <li className="nav-dropdown-item" key={`zh`}>
                    <button
                      className={clsx("nav-dropdown-link block transition-all w-full", locale == "zh" && "active")}
                      onClick={()=>onChangeLocale("zh")}
                    >
                      繁体
                    </button>
                  </li>
                  <li className="nav-dropdown-item" key={`jp`}>
                    <button
                      className={clsx("nav-dropdown-link block transition-all w-full", locale == "jp" && "active")}
                      onClick={()=>onChangeLocale("jp")}
                    >
                      日本語
                    </button>
                  </li>
                  <li className="nav-dropdown-item" key={`kr`}>
                    <button
                      className={clsx("nav-dropdown-link block transition-all w-full", locale == "kr" && "active")}
                      onClick={()=>onChangeLocale("kr")}
                    >
                      Korean
                    </button>
                  </li>
                  <li className="nav-dropdown-item" key={`vt`}>
                    <button
                      className={clsx("nav-dropdown-link block transition-all w-full", locale == "vt" && "active")}
                      onClick={()=>onChangeLocale("vt")}
                    >
                      Tiếng Việt
                    </button>
                  </li>
                </ul>
              </li>
            </div>
            <div className="hidden items-center pl-8">
              <Link className="nav-trade-btn" href={config.nav_button.link} target="_blank">
                {locale == "en" ? `Trade Now`:`立即交易`}
              </Link>
            </div>
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
                <svg width="60px" height="60px" viewBox="0 0 88 88" version="1.1">
                  <title>home_menu@2x</title>
                  <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="$avav_h5" transform="translate(-657.000000, -94.000000)">
                      <g id="Navigation-Bar" transform="translate(0.000000, 88.000000)">
                        <g id="home_menu" transform="translate(657.000000, 6.000000)">
                          <rect id="矩形" fill="#EAEAEA" opacity="0" x="0" y="0" width="88" height="88"></rect>
                          <path d="M63,55 L63,59 L25,59 L25,55 L63,55 Z M63,42 L63,46 L25,46 L25,42 L63,42 Z M63,29 L63,33 L25,33 L25,29 L63,29 Z" id="ic" fill="#FFFFFF"></path>
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
    </>
  );
};

export default Header;
