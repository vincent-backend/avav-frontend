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
import { Intro } from "@/layouts/components/foundation/foundation-article";
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
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
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
          <section className="animate container pt-[90px] md:pt-[140px] pb-10 md:pb-20">
            <h3
              className={clsx(
                "text-cred mb-6 md:mb-10",
                locale == "en" && "font-secondary",
                locale != "en" && "font-primary font-bold"
              )}
            >
              {page.title_const}
            </h3>
            {/* Mobile */}
            <Intro page={page} handleAddrCopy={handleAddrCopy} />
          </section>
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
