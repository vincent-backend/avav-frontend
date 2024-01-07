import Base from "@/layouts/Baseof";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";

import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import {AccessRightCard} from "@/layouts/components/art/ArtCategoryElement";

export default function Home({ data }) {
  const { locale } = useTranslation();

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
      <section className="animate container mt-[90px] md:mt-[140px] mb-[50px] md:mb-[112px]">
      <div className="flex flex-row justify-start items-center">
          <Link href="/art" className="me-1">
            <Image alt="back" src="/images/nav/home_nav_ic_back.svg" width={40} height={40} className="md:w-[50px] md:h-[50px]"/>
          </Link>
          <h3  className={clsx("text-cred",
              locale == "en" && "font-secondary",
              locale != "en" && "font-primary font-bold"
            )}>
            Physical Goods
          </h3>
        </div>

        <div className="mt-[25px] mb-[25px] md:mt-[50px] md:mb-[50px] flex flex-wrap justify-center md:justify-normal gap-x-[12px] md:gap-x-4 gap-y-2 md:gap-y-4">
        {imagelist.map((image, index) => (
            <Zoom key={index} zoomMargin={0}>
              <Image
                alt={image.name}
                src={`/images/art/physical_goods/${image.filename}`}
                width={256}
                height={256}
                className="max-w-[calc(50vw-28px)] aspect-auto md:w-[256px] md:h-[256px]"
              />
            </Zoom>
          ))}
        </div>
      </section>
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
