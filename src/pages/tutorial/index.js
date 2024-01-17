import Base from "@/layouts/Baseof";

import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Loading from "@/layouts/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";
import Link from "next/link";

export default function Tutorial({ data }) {
  const { locale, setLocale } = useTranslation();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { tutorial, tutorial1, tutorial2, tutorial3 } = frontmatter;

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
        <section className="animate container mt-[90px] md:mt-[140px]">
          <h3
            className={clsx(
              "text-cred",
              locale == "en" && "font-secondary",
              locale != "en" && "font-primary font-bold"
            )}
          >
            {tutorial.title}
          </h3>
          <p className="text-cred text-[14px] md:text-[16px] font-secondary">
            AVAV = A Very Amazing Victory!
          </p>
          <div className="w-full h-[1px] bg-[#1B1B1B] my-5 md:my-10" />
          <div className="mb-[25px] md:mb-[50px]">
            <div className="flex flex-row gap-2">
              <Image
                src="/images/tutorial/list_ic_recover.svg"
                alt="icon"
                width={18}
                height={18}
              />
              <Link
                href="/tutorial/how-to-buy-avav-inscriptions"
                className="text-[18px] md:text-[20px] text-white hover:text-cred active:text-cred"
              >
                {tutorial1.title}
              </Link>
            </div>
            <div className="mt-2">
              {markdownify(tutorial1.content, "h6", "text-text leading-6")}
            </div>
          </div>
          <div className="mb-[25px] md:mb-[50px]">
            <div className="flex flex-row gap-2">
              <Image
                src="/images/tutorial/list_ic_recover.svg"
                alt="icon"
                width={18}
                height={18}
              />
              <div className="text-[18px] md:text-[20px] text-white hover:text-cred active:text-cred">
                {tutorial2.title}
              </div>
            </div>
            <div className="mt-2">
              {markdownify(tutorial2.content, "h6", "text-text leading-6")}
            </div>
          </div>
          <div className="mb-[25px] md:mb-[50px]">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/images/tutorial/list_ic_recover.svg"
                alt="icon"
                width={18}
                height={18}
              />
              <div className="text-[18px] md:text-[20px] text-white hover:text-cred active:text-cred">
                {tutorial3.title}
              </div>
            </div>
            <div className="mt-2">
              {markdownify(tutorial3.content, "h6", "text-text leading-6")}
            </div>
          </div>
        </section>
      )}
    </Base>
  );
}

// for tutorial data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/tutorial/index");

  return {
    props: {
      data,
    },
  };
};
