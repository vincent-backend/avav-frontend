import Base from "@/layouts/Baseof";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";
import Link from "next/link";
import {AccessRightElement} from "@/layouts/components/art/ArtElement";

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
        <h3 className={clsx("text-cred", locale=="en" && "font-secondary", locale != "en" && "font-primary font-bold")}>Access Right</h3>
        <div className="mt-[25px] mb-[25px] md:mt-[50px] md:mb-[50px] flex flex-wrap gap-x-[12px] md:gap-x-4 gap-y-2 md:gap-y-4">
          <AccessRightElement img="pic_1" caption="Access Right" link_url="" />
          <AccessRightElement img="pic_2" caption="Access Right" link_url="" />
          <AccessRightElement img="pic_3" caption="Access Right" link_url="" />
          <AccessRightElement img="pic_4" caption="Access Right" link_url="" />
          <AccessRightElement img="pic_5" caption="Access Right" link_url="" />
          <AccessRightElement img="pic_6" caption="Access Right" link_url="" />
          <AccessRightElement img="pic_7" caption="Access Right" link_url="" />
          <AccessRightElement img="pic_8" caption="Access Right" link_url="" />
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
