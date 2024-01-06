import Base from "@/layouts/Baseof";
import config from "@/config/config.json";
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

  // votes
  const {api_root} = config.general;
  const [votes, setVotes] = useState({art: 0, music:0, access_right:0, game_props: 0, physical_goods: 0, standing: 0, web_2_database: 0});

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { tutorial} = frontmatter;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(api_root);
        const vote_data = await response.json();
        setVotes(vote_data);
      }
      catch {
        console.log("API Server connection failed.");
      }
    }

    fetchData();
    
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
        <div className="mt-[60px] mb-[25px] md:mt-[80px] md:mb-[50px] flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-[54px] md:gap-y-16">
          <ArtElement img="pic_1" vote="art" votes = {votes} caption="ART" link_url="" />
          <ArtElement img="pic_2" vote="music" votes = {votes} caption="MUSIC" link_url="" />
          <ArtElement img="pic_3" vote="access_right" votes = {votes} caption="Access Right" link_url="/art/access-right" />
          <ArtElement img="pic_4" vote="game_props" votes = {votes} caption="Game Props" link_url="" />
          <ArtElement img="pic_5" vote="physical_goods" votes = {votes} caption="Physical Goods" link_url="/art/physical_goods" />
          <ArtElement img="pic_6" vote="standing" votes = {votes} caption="Standing" link_url="" />
          <ArtElement img="pic_7" vote="web_2_database" votes = {votes} caption="Web 2 Database" link_url="" />
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
