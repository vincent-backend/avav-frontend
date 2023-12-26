import Base from "@/layouts/Baseof";

import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useEffect, useState } from "react";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";
import Link from "next/link";

export default function Home({ data }) {
  const { locale, setLocale } = useTranslation();

  if (locale === "undefined") console.log("WOW");

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { tutorial } = frontmatter;

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
        <div className="w-full h-[1px] bg-[#1B1B1B] my-5 md:my-10" />
       
        
      </section>
    </Base>
  );
}

// for tutorial data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/tutorial/1");

  return {
    props: {
      data,
    },
  };
};
