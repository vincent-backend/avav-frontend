import Base from "@/layouts/Baseof";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import f_stars from "@/content/foundation_star.json";
import clsx from "clsx";
import Link from "next/link";
import Loading from "@/layouts/components/Loading";

export default function Foundation({ data }) {
  const { locale, setLocale } = useTranslation();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { page } = frontmatter;

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    const handleStart = (url) => url !== router.asPath && setLoading(true);
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
        alt="bg-2"
        src="/images/bg/bg_foundation.png"
        width={1334}
        height={788}
        className="-z-10 absolute top-0 right-0 md:right-[120px]"
      />
          <section className="animate container mt-[90px] md:mt-[140px]">
            <h3
              className={clsx(
                "text-cred",
                locale == "en" && "font-secondary",
                locale != "en" && "font-primary font-bold"
              )}
            >
              {page.title}
            </h3>
            <div className="mt-[60px] mb-[25px] md:mt-[80px] md:mb-[50px]">
              <div className="text-white font-primary text-[14px] leading-[20px]">
                {markdownify(page.description, "", "")}
              </div>
            </div>
          </section>
          <section className="animate container my-[60px] md:my-[110px]">
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
