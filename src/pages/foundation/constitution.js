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
          <div className="relative pt-[80px] md:pt-[140px] pb-[70vw] md:pb-[320px]">
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

            <section className="container">
              {/* Mobile */}
              <div className="">
                <div className="flex flex-row justify-start items-center mb-2">
                  <Link href="/foundation" className="me-1">
                    <Image
                      alt="back"
                      src="/images/nav/home_nav_ic_back.svg"
                      width={40}
                      height={40}
                      priority
                      className="-ml-2 w-10 h-10"
                    />
                  </Link>
                  <h3
                    className={clsx(
                      "text-cred",
                      locale == "en" && "font-secondary",
                      locale != "en" && "font-primary font-bold"
                    )}
                  >
                    {page.intro}
                  </h3>
                </div>
                {markdownify(page.intro_des, "", "found-description")}
                <p className="text-cred font-[500]">{page.intro_donation}</p>
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
            </section>
            <section className="container mt-[50px] md:mt-[70px]">
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
