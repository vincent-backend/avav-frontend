import Base from "@/layouts/Baseof";
import config from "@/config/config.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";
import Link from "next/link";
import { ArtCategoryElement } from "@/layouts/components/art/ArtCategoryElement";
import artcategory from "@/content/art_category.json";
import Loading from "@/layouts/components/Loading";

export default function Art({ data, init_vdata }) {
  const { locale } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // votes
  const { api_root } = config.general;
  const [votes, setVotes] = useState(init_vdata);

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { page } = frontmatter;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(api_root);
        const vote_data = await response.json();

        setVotes(vote_data);
      } catch {
        console.log("API Server connection failed.");
      }
    }

    fetchData();

    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    const handleStart = (url) => {url !== router.asPath && setLoading(true); window.scrollTo({top: 0, behavior: 'smooth'});}
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
      {loading ? (
        <Loading />
      ) : (
        <section className="container pt-[90px] md:pt-[140px] pb-[50px] md:pb-[112px]">
          <h3
            className={clsx(
              "text-cred",
              locale == "en" && "font-secondary",
              locale != "en" && "font-primary font-bold"
            )}
          >
            {page.title}
          </h3>
          <div className="mt-[60px] mb-[25px] md:mt-[80px] md:mb-[50px] flex flex-wrap justify-center md:justify-normal gap-x-3 md:gap-x-4 gap-y-[54px] md:gap-y-16">
            {artcategory.map((category, index) => (
              <ArtCategoryElement
                key={index}
                category={category}
                c_vote={votes["vote_" + category.id]}
              />
            ))}
          </div>
        </section>
      )}
    </Base>
  );
}

// for tutorial data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/art");
  var init_vdata = {};

  return {
    props: {
      data,
      init_vdata,
    },
  };
};
