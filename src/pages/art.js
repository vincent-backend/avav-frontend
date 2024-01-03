import Base from "@/layouts/Baseof";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";
import Link from "next/link";
import {ArtElement} from "@/layouts/components/art/ArtElement";

export default function Home({ data }) {
  const { locale } = useTranslation();

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { tutorial} = frontmatter;

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
        <h3 className={clsx("text-cred", locale=="en" && "font-secondary", locale != "en" && "font-primary font-bold")}>AVAV Art</h3>
        <div className="mt-[60px] mb-[25px] md:mt-[80px] md:mb-[50px] flex flex-wrap justify-start gap-x-3 md:gap-x-4 gap-y-[54px] md:gap-y-16">
          <ArtElement img="pic_1" caption="ART" link_url="" />
          <ArtElement img="pic_2" caption="MUSIC" link_url="" />
          <ArtElement img="pic_3" caption="Access Right" link_url="/art/access-right" />
          <ArtElement img="pic_4" caption="Game Props" link_url="" />
          <ArtElement img="pic_5" caption="Physical Goods" link_url="" />
          <ArtElement img="pic_6" caption="Standing" link_url="" />
          <ArtElement img="pic_7" caption="Web 2 Database" link_url="" />
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
