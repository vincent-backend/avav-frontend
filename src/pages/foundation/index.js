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
import {
  Constitution,
  Intro,
} from "@/layouts/components/foundation/foundation-article";

export default function Foundation({ data }) {
  const { locale, setLocale } = useTranslation();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);
  let { page } = frontmatter;

  // sub menu
  const [menuId, setMenuId] = useState(1);
  const refContent1 = useRef();
  const refContent2 = useRef();

  const handleLink = (lid) => {
    setMenuId(lid);
    refContent1.current.scrollTo({top: 0, behavior: "smooth"});
    refContent2.current.scrollTo({top: 0, behavior: "smooth"});
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
                {menuId == 1 ? page.title : page.title_const}
              </h3>
              {/* Pc intro */}
              <div className="hidden md:block pt-[60px] mb-[25px] md:pt-[80px] md:mb-[50px]">
                <div className="flex flex-row w-full h-[900px] gap-[34px]">
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
                      {page.constitution}
                    </li>
                  </ul>
                  <div
                      className={clsx(
                        "w-full h-full text-white overflow-y-auto no-scrollbar scroll-smooth", menuId != 1 && "hidden"
                      )}
                      ref={refContent1}
                    >
                      <Intro page={page} handleAddrCopy={handleAddrCopy} />
                    </div>
                    <div
                      className={clsx(
                        "w-full h-full text-white overflow-y-auto no-scrollbar scroll-smooth", menuId != 2 && "hidden"
                      )}
                      ref={refContent2}
                    >
                      <Constitution page={page} />
                    </div>
                </div>
              </div>
              {/* Mobile */}
              <div className="md:hidden pt-10 mb-[25px] md:pt-[80px] md:mb-[50px] w-full">
                <div className="flex flex-col w-full">
                  <Link href="/foundation/intro">
                    <div className="bg-[#FD2C2F] bg-opacity-10 border border-[#FD2C2F] text-white text-center leading-10 w-full h-10 mb-5">
                      {page.intro}
                    </div>
                  </Link>
                  <Link href="/foundation/constitution">
                    <div className="bg-[#FD2C2F] bg-opacity-10 border border-[#FD2C2F] text-white text-center leading-10 w-full h-10 mb-5">
                      {page.constitution}
                    </div>
                  </Link>
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
              <div className="mt-7 md:mt-15 mx-6 flex flex-wrap justify-center gap-x-[70px] gap-y-[40px]">
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
