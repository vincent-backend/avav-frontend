import Base from "@/layouts/Baseof";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function Home({ data }) {
  const { locale } = useTranslation();

  if (locale === "undefined") console.log("WOW");

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { tutorial } = frontmatter;

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);
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
      <section className="animate container mt-[90px] md:mt-[140px] mb-[60px] md:mb-[100px]">
        <h3
          className={clsx(
            "text-cred",
            locale == "en" && "font-secondary",
            locale != "en" && "font-primary font-bold"
          )}
        >
          {tutorial.title}
        </h3>
        <div className="w-full h-[1px] bg-[#1B1B1B] my-5 md:my-10" />
        {markdownify(
          tutorial.description,
          "h6",
          "banner-content text-[15px] text-text leading-6"
        )}

        <div className="animate mt-[30px]">
          <div className="text-[15px] text-white">
            {markdownify(tutorial.step1, "", "")}
          </div>
          <Zoom zoomMargin={0}>
            <Image
              alt="Step 1"
              src="/images/tutorial/1/details_pic_1.png"
              width={284}
              height={584}
              className="mt-[20px] w-full aspect-auto md:w-[284px] md:h-[584px]"
            />
          </Zoom>
        </div>

        <div className="animate mt-[30px]">
          <p className="text-[15px] text-white">
            {markdownify(tutorial.step2, "", "")}
          </p>
          <Zoom zoomMargin={0}>
            <Image
              alt="Step 2"
              src="/images/tutorial/1/details_pic_2.png"
              width={284}
              height={564}
              className="mt-[20px] w-full aspect-auto md:w-[284px] md:h-[564px]"
            />
          </Zoom>
        </div>

        <div className="animate mt-[30px]">
          <p className="text-[15px] text-white">
            {markdownify(tutorial.step3, "", "")}
          </p>
          <Zoom zoomMargin={0}>
            <Image
              alt="Step 3"
              src="/images/tutorial/1/details_pic_3.png"
              width={284}
              height={310}
              className="mt-[20px] w-full aspect-auto md:w-[284px] md:h-[310px]"
            />
          </Zoom>
        </div>

        <div className="animate mt-[30px]">
          <p className="text-[15px] text-white">
            {markdownify(tutorial.step4, "", "")}
          </p>
          <Zoom zoomMargin={0}>
            <Image
              alt="Step 4"
              src="/images/tutorial/1/details_pic_4.png"
              width={284}
              height={560}
              className="mt-[20px] w-full aspect-auto md:w-[284px] md:h-[560px]"
            />
          </Zoom>
        </div>

        <div className="animate mt-[30px]">
          <p className="text-[15px] text-white">
            {markdownify(tutorial.step5, "", "")}
          </p>
          <Zoom zoomMargin={0}>
            <Image
              alt="Step 5"
              src="/images/tutorial/1/details_pic_5.png"
              width={284}
              height={568}
              className="mt-[20px] w-full aspect-auto md:w-[284px] md:h-[568px]"
            />
          </Zoom>
        </div>

        <div className="animate mt-[30px]">
          <p className="text-[15px] text-white">
            {markdownify(tutorial.step6, "", "")}
          </p>
          <Zoom zoomMargin={0}>
            <Image
              alt="Step 6"
              src="/images/tutorial/1/details_pic_6.png"
              width={284}
              height={176}
              className="mt-[20px] w-full aspect-auto md:w-[284px] md:h-[176px]"
            />
          </Zoom>
        </div>

        <div className="animate mt-[30px]">
          <p className="text-[15px] text-white">
            {markdownify(tutorial.step7, "", "")}
          </p>
        </div>
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
