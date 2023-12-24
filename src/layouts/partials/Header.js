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
  const { main } = menu;

  // states declaration
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);
  const [direction, setDirection] = useState(null);

  const asPath = useRouter();
  const langParam = asPath.query.lang;

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

    if (langParam === "cn") {
      setLocale("cn");
    }
    else if (langParam === "zh") {
      setLocale("zh");
    }
    else if (langParam == "jp") {
      setLocale("jp");
    }
    else {
      setLocale("en");
    }

  }, [langParam]);

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
            <Logo src={logo}/>
          </div>

          <ul
            id="nav-menu"
            className={clsx(!showMenu && "hidden", "navbar-nav order-2 w-full justify-center md:justify-end md:mr-[114px] md:w-auto md:space-x-2 md:order-1 md:flex")}
          >
            <div className="w-full h-screen md:bg-none md:flex md:justify-end md:h-auto md:space-x-11">
              <div className="h-10 md:hidden" />
              <li className="nav-item md:hidden">
                <Link
                  href=""
                  className={clsx("nav-link block", asPath.pathname == "/" && "active")}
                  onClick={()=>setShowMenu(false)}
                >
                  Home
                </Link>
              </li>
              {main.map((menu, i) => (
                <React.Fragment key={`menu-${i}`}>
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      className={`nav-link block ${asPath.pathname === menu.url && "active"
                        }`}
                        onClick={()=>setShowMenu(false)}
                    >
                      {menu.name}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
              <li className="nav-item nav-dropdown group relative mt-[50%] md:mt-0">
                <span className="nav-link inline-flex items-center">
                  {locale == "jp" ? "日本語" : locale == "cn" ? "中文" : locale == "zh" ? "中文（台灣）" : "EN" }
                  <svg className="h-4 w-4 fill-current ml-1" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
                <ul className="nav-dropdown-list hidden max-h-0 w-[150px] mx-auto overflow-hidden border border-border-secondary py-0 transition-all duration-500 group-hover:block group-hover:max-h-[126px] group-hover:py-1 md:invisible md:absolute md:left-1/2 md:block md:w-auto md:-translate-x-1/2 md:group-hover:visible md:group-hover:opacity-100">
                  <li className="nav-dropdown-item" key={`children-EN`}>
                    <Link
                      href=""
                      className={clsx("nav-dropdown-link block transition-all", locale == "en" && "active")}
                      onClick={()=>setShowMenu(false)}
                    >
                      EN
                    </Link>
                  </li>
                  <li className="nav-dropdown-item" key={`children-CN`}>
                    <Link
                      href="/?lang=cn"
                      className={clsx("nav-dropdown-link block transition-all", locale == "cn" && "active")}
                      onClick={()=>setShowMenu(false)}
                    >
                      中文
                    </Link>
                  </li>
                  <li className="nav-dropdown-item" key={`children-ZH`}>
                    <Link
                      href="/?lang=zh"
                      className={clsx("nav-dropdown-link block transition-all", locale == "zh" && "active")}
                      onClick={()=>setShowMenu(false)}
                    >
                      中文（繁体）
                    </Link>
                  </li>
                  <li className="nav-dropdown-item" key={`children-JP`}>
                    <Link
                      href="/?lang=jp"
                      className={clsx("nav-dropdown-link block transition-all", locale == "jp" && "active")}
                      onClick={()=>setShowMenu(false)}
                    >
                      日本語
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
            <div className="hidden items-center pl-8">
              <Link className="nav-trade-btn" href={config.nav_button.link}>
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
