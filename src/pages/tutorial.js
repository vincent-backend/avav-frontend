import Base from "@/layouts/Baseof";

import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useEffect, useState } from "react";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";

export default function Home({ data }) {
  const { locale, setLocale } = useTranslation();

  if (locale === "undefined") console.log("WOW");

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { tutorial, tutorial1, tutorial2, tutorial3 } = frontmatter;

  const handleFaqToggle = (index) => {
    if (factive === index) {
      setFActive(null);
    } else {
      setFActive(index);
    }
  };

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.6 }
      )
        .fromTo(
          ".banner-content",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          ">-0.4"
        )
        .fromTo(
          ".banner-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.3"
        )
        .fromTo(
          ".top-graph",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          ">-0.2"
        );
    });

    return () => ctx.revert();
  }, [locale, data]);

  return (
    <Base>
      <Image
        alt="background"
        src="/images/tutorial/bg_top_pic.svg"
        width={1921}
        height={1080}
        className="-z-10 absolute w-full h-full top-0 left-0"
      ></Image>
      {/* Main content */}
      <section className="animate container mt-[90px] md:mt-[140px]">
        <h3 className="text-cred">{tutorial.title}</h3>
        <p className="text-cred text-[14px] md:text-[16px] font-secondary">AVAV = A Very Amazing Victory!</p>
        <div className="w-full h-[1px] bg-[#1B1B1B] my-5 md:my-10" />
        <div className="mb-[25px] md:mb-[50px]">
          <div className="flex flex-row gap-2">
            <Image
              src="/images/tutorial/list_ic_recover.svg"
              alt="icon"
              width={18}
              height={18}
            />
            <span className="text-[18px] md:text-[20px] text-white">
              {tutorial1.title}
            </span>
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
            <span className="text-[18px] md:text-[20px] text-white">
              {tutorial2.title}
            </span>
          </div>
          <div className="mt-2">
            {markdownify(tutorial2.content, "h6", "text-text leading-6")}
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
            <span className="text-[18px] md:text-[20px] text-white">
              {tutorial3.title}
            </span>
          </div>
          <div className="mt-2">
            {markdownify(tutorial3.content, "h6", "text-text leading-6")}
          </div>
        </div>
      </section>
    </Base>
  );
}

// for tutorial data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/tutorial");

  return {
    props: {
      data,
    },
  };
};
