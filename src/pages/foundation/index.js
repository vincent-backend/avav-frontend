import Base from "@/layouts/Baseof";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import f_stars from "@/content/foundation_star.json";
import clsx from "clsx";
import Link from "next/link";
import Loading from "@/layouts/components/Loading";
import { Waypoint } from "react-waypoint";
import CopyToClipboard from "@/hooks/useClipboard";
import { Store } from "react-notifications-component";

export default function Foundation({ data }) {
  const { locale, setLocale } = useTranslation();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);
  let { page } = frontmatter;

  // waypoint
  const [menuId, setMenuId] = useState(1);
  const refContent = useRef();
  const refIntro = useRef();
  const handleEnter = (e_id) => {
    if (e_id == 1) {
      setMenuId(1);
    }
  };

  const handleLeave = (l_id) => {
    if (l_id == 1) {
      setMenuId(2);
    }
  };

  const handleLink = (lid) => {
    if (lid == 2) refContent.current.scrollTo(0, refIntro.current.clientHeight);
    if (lid == 1) refContent.current.scrollTo(0, 0);
  };

  // copy address
  const handleAddrCopy = () => {
    if (CopyToClipboard(page.donate_addr, locale)) {
      Store.addNotification({
        message: "AVAV donation address has been copied.",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        message:
          "AVAV donation address copy failed. Your web browser does not support copy functionality.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  };

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    const handleStart = (url) => {
      url !== router.asPath && setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [locale, data]);

  return (
    <Base>
      <Image
        alt="background"
        src="/images/tutorial/bg_top_pic.svg"
        width={1921}
        height={1080}
        className="-z-10 absolute top-0 left-0"
      ></Image>
      {/* Main content */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Image
            alt="bg-top"
            src="/images/foundation/md/bg_top.png"
            width={1334}
            height={788}
            className="-z-10 hidden md:block absolute top-0 right-[120px]"
          />
          <Image
            alt="bg-top"
            src="/images/foundation/bg_top.png"
            width={750}
            height={788}
            className="-z-10 absolute md:hidden top-0 right-0"
          />
          {/* bg-bottom */}
          <div className="relative pt-[90px] md:pt-[140px] pb-[70vw] md:pb-[320px]">
            <Image
              alt="bg-bottom"
              src="/images/foundation/bg_bottom.png"
              width={750}
              height={567}
              className="-z-10 md:hidden absolute bottom-0 left-0"
            />
            <Image
              alt="bg-bottom"
              src="/images/foundation/md/bg_bottom.png"
              width={1420}
              height={518}
              className="-z-10 hidden md:block absolute bottom-0 left-0 2xl:left-[calc(50%-710px)]"
            />

            <section className="animate container">
              <h3
                className={clsx(
                  "text-cred",
                  locale == "en" && "font-secondary",
                  locale != "en" && "font-primary font-bold"
                )}
              >
                {page.title}
              </h3>
              {/* Pc intro */}
              <div className="hidden md:block pt-[60px] mb-[25px] md:pt-[80px] md:mb-[50px]">
                <div className="flex flex-row w-full h-[600px] gap-[34px]">
                  <ul className="w-[200px] h-full border-r-[1px] border-r-[#D8D8D8]">
                    <li
                      className={clsx(
                        "w-full h-[46px] leading-[46px] text-[16px] font-[500] text-right pr-3 cursor-pointer",
                        menuId == 1 &&
                          "text-cred font-bold bg-gradient-to-r from-transparent to-[#430B0C] border-r-4 border-r-cred"
                      )}
                      onClick={() => handleLink(1)}
                    >
                      {page.intro}
                    </li>
                    <li
                      className={clsx(
                        "w-full h-[46px] leading-[46px] text-[16px] font-[500] text-right pr-3 cursor-pointer",
                        menuId == 2 &&
                          "text-cred font-bold bg-gradient-to-r from-transparent to-[#430B0C] border-r-4 border-r-cred"
                      )}
                      onClick={() => handleLink(2)}
                    >
                      {page.rescue_object}
                    </li>
                    <li
                      className={clsx(
                        "w-full h-[46px] leading-[46px] text-[16px] font-[500] text-right pr-3 cursor-pointer",
                        menuId == 3 &&
                          "text-cred font-bold bg-gradient-to-r from-transparent to-[#430B0C] border-r-4 border-r-cred"
                      )}
                      onClick={() => handleLink(2)}
                    >
                      {page.rescue_terms}
                    </li>
                    <li
                      className={clsx(
                        "w-full h-[46px] leading-[46px] text-[16px] font-[500] text-right pr-3 cursor-pointer",
                        menuId == 4 &&
                          "text-cred font-bold bg-gradient-to-r from-transparent to-[#430B0C] border-r-4 border-r-cred"
                      )}
                      onClick={() => handleLink(2)}
                    >
                      {page.contact_info}
                    </li>
                    <li
                      className={clsx(
                        "w-full h-[46px] leading-[46px] text-[16px] font-[500] text-right pr-3 cursor-pointer",
                        menuId == 5 &&
                          "text-cred font-bold bg-gradient-to-r from-transparent to-[#430B0C] border-r-4 border-r-cred"
                      )}
                      onClick={() => handleLink(2)}
                    >
                      {page.constitution}
                    </li>
                  </ul>
                  <div className="w-full h-full text-white overflow-y-auto no-scrollbar scroll-smooth" ref={refContent}>
                    <Waypoint
                      onEnter={() => handleEnter(1)}
                      onLeave={() => handleLeave(1)}
                    >
                      <div id="intro" className="pb-5" ref={refIntro}>
                        <p className="found-subtitle">{page.intro}</p>
                        {markdownify(page.intro_des, "", "found-description")}
                        <p className="text-cred font-[500]">
                          {page.intro_donation}
                        </p>
                        <div className="mt-3 flex flex-col md:flex-row items-center">
                          <div className="relative flex flex-row items-center justify-between h-[60px] md:h-[70px] bg-[#1A1C1F] mt-4 md:mt-0">
                            <p className="text-white font-primary text-[14px] px-[10px] md:px-[20px] break-all">
                              {page.donate_addr}
                            </p>
                            <button
                              className="bg-cred min-w-[60px] md:w-[70px] h-full pl-[18px] md:pl-[22px]"
                              onClick={() => handleAddrCopy()}
                            >
                              <Image
                                alt="copy"
                                src="/images/footer/copy_nor.svg"
                                width={22}
                                height={22}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Waypoint>
                    <Waypoint
                      onEnter={() => handleEnter(2)}
                      onLeave={() => handleLeave(2)}
                    >
                      <div id="rescue_object" className="pb-10">
                        <p className="found-subtitle">{page.rescue_object}</p>
                        {markdownify(
                          page.rescue_object_des,
                          "",
                          "found-description"
                        )}
                      </div>
                    </Waypoint>
                    <Waypoint
                      onEnter={() => handleEnter(3)}
                      onLeave={() => handleLeave(3)}
                    >
                      <div id="rescue_terms" className="pb-10">
                        <p className="found-subtitle">{page.rescue_terms}</p>
                        <ul>
                          <li className="flex flex-row items-start">
                            <Image
                              alt="list-symbol"
                              src="/images/foundation/ellipse.svg"
                              width={7}
                              height={7}
                              className="mt-[10px] mr-2"
                            />
                            {page.terms_1}
                          </li>
                          <li className="flex flex-row items-start">
                            <Image
                              alt="list-symbol"
                              src="/images/foundation/ellipse.svg"
                              width={7}
                              height={7}
                              className="mt-[10px] mr-2"
                            />
                            {page.terms_2}
                          </li>
                          <li className="flex flex-row items-start">
                            <Image
                              alt="list-symbol"
                              src="/images/foundation/ellipse.svg"
                              width={7}
                              height={7}
                              className="mt-[10px] mr-2"
                            />
                            {page.terms_3}
                          </li>
                          <li className="flex flex-row items-start">
                            <Image
                              alt="list-symbol"
                              src="/images/foundation/ellipse.svg"
                              width={7}
                              height={7}
                              className="mt-[10px] mr-2"
                            />
                            {page.terms_4}
                          </li>
                        </ul>
                      </div>
                    </Waypoint>
                    <Waypoint
                      onEnter={() => handleEnter(4)}
                      onLeave={() => handleLeave(4)}
                    >
                      <div id="contact_info" className="pb-10">
                        <p className="found-subtitle">{page.contact_info}</p>
                        {markdownify(
                          page.contact_info_des,
                          "",
                          "found-description"
                        )}
                      </div>
                    </Waypoint>
                  </div>
                </div>
              </div>
              {/* Mobile */}
              <div className="md:hidden pt-[60px] mb-[25px] md:pt-[80px] md:mb-[50px]">
                <div className="flex flex-wrap gap-4 w-full">
                  <Link href="/foundation/intro" className="bg-[#FD2C2F] bg-opacity-10 border border-[#FD2C2F] text-white text-center leading-10 w-[calc(50%-9px)] h-10">{page.intro}</Link>
                  <Link href="/foundation/rescue-object" className="bg-[#FD2C2F] bg-opacity-10 border border-[#FD2C2F] text-white text-center leading-10 w-[calc(50%-9px)] h-10">{page.rescue_object}</Link>
                  <Link href="/foundation/rescue-terms" className="bg-[#FD2C2F] bg-opacity-10 border border-[#FD2C2F] text-white text-center leading-10 w-[calc(50%-9px)] h-10">{page.rescue_terms}</Link>
                  <Link href="/foundation/contact-info" className="bg-[#FD2C2F] bg-opacity-10 border border-[#FD2C2F] text-white text-center leading-10 w-[calc(50%-9px)] h-10">{page.contact_info}</Link>
                  <button className="bg-[#FD2C2F] bg-opacity-10 border border-[#FD2C2F] text-white text-center leading-10 w-[calc(50%-9px)] h-10">{page.constitution}</button>
                </div>

              </div>
            </section>
            <section className="animate container mt-[50px] md:mt-[70px]">
              <h3
                className={clsx(
                  "text-[18px] md:text-[26px] text-cred",
                  locale == "en" && "font-secondary",
                  locale != "en" && "font-primary font-bold"
                )}
              >
                {page.resident_star}
              </h3>
              <div className="mt-7 md:mt-15 mx-6 flex flex-wrap justify-center md:justify-start gap-x-[70px] gap-y-[40px]">
                {f_stars.map((star) => {
                  return (
                    <div
                      key={star.id}
                      className="flex flex-col justify-center gap-[18px]"
                    >
                      <Image
                        alt={star.name}
                        src={`/images/foundation/stars/${star.photo}`}
                        width={106}
                        height={106}
                        className="rounded-full"
                      />
                      <p className="text-[16px] text-center">{star.name}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </>
      )}
    </Base>
  );
}

// for tutorial data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/foundation");

  return {
    props: {
      data,
    },
  };
};
