import Base from "@/layouts/Baseof";
import FaqItem from "@/layouts/components/FaqItem";
import faqs from "@/content/faqs.json";
import Dashboard from "@/layouts/components/home/Dashboard";
import Entrance from "@/layouts/components/home/Entrance";

import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";

export default function Home({ data }) {
  const { locale } = useTranslation();
  const [factive, setFActive] = useState(null);

  const [c_faq, setFaq] = useState(locale === "cn" ? faqs.fcn : locale == "zh" ? faqs.fzh : locale == "jp" ? faqs.fjp : faqs.fen);
  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);
  //
  let { banner, blog_1, blog_2, blog_3, blog_4, home } = frontmatter;

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
    if (locale === "cn") setFaq(faqs.fcn);
    else if (locale === "zh") setFaq(faqs.fzh);
    else if (locale === "jp") setFaq(faqs.fjp);
    else setFaq(faqs.fen);

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
      {/*background*/}
      <div className="absolute w-full h-[1602px] md:h-[1187px] top-0 left-0 overflow-x-hidden -z-10">
        <div className="absolute w-full min-w-[400px] aspect-[0.592] md:aspect-auto md:w-[1920px] md:h-[1187px] top-0 sm:-left-0 md:left-auto md:right-[-350px] lg:right-[-300px] xl:right-0 bg-contain bg-center bg-no-repeat bg-[url('/images/home/bg_top_pic.png')] md:bg-[url('/images/home/md/bg_top_pic.png')] -z-30">
          {/* top graph */}
          <div className="top-graph absolute w-full min-w-[400px] aspect-square md:w-[750px] -bottom-[26.73%] right-0 md:top-[150px] md:right-[150px] bg-contain bg-center bg-no-repeat bg-[url('/images/home/top_graph.gif')] md:bg-[url('/images/home/md/top_graph.gif')] -z-10" />
        </div>
      </div>

      {/*Top left*/}
      <div className="absolute w-[50%] md:w-[358px] h-[670px] bg-contain bg-no-repeat bg-[url('/images/home/top_left_line.svg')] -z-10" />
      {/*Right light*/}
      <div className="right-light absolute w-[80%] md:w-[1100px] h-[925px] md:h-[1658px] top-[650px] md:top-[400px] right-0 bg-contain bg-center bg-no-repeat bg-[url('/images/home/bg_right_light.svg')] md:bg-[url('/images/home/md/bg_right_light.svg')] opacity-70 -z-10" />
      {/*Left line*/}
      <div className="absolute w-[55%] h-[804px] md:w-[1000px] top-[1400px] md:top-[1689px] left-0 bg-contain bg-center bg-no-repeat bg-[url('/images/home/line.gif')] md:bg-[url('/images/home/md/line.gif')] -z-10" />

      
      
      {/* Banner */}
      <section className="min-h-[120%] md:min-h-[1000px] pt-[100px] md:pt-[254px]">
        <div className="container">
          <div className="banner flex flex-col justify-start md:max-w-[670px]">
            <div className="banner-title">
              <h2 className="whitespace-nowrap">{banner.title}</h2>
              <div className="relative">
                <h1 className="text-cred">$AVAV</h1>
                <div className="absolute w-[100px] h-[26px] bg-[url('/images/home/top_tag.svg')] top-[13px] left-[165px] md:top-[35px] md:left-[425px]" />
              </div>
            </div>
            <div className="banner-content mt-[10px] md:mt-[136px]">
              {markdownify(banner.content, "h6", "text-white leading-6")}
            </div>
            <Link
              href="https://avascriptions.com/market/token?tick=avav" target="_blank"
              className="banner-btn bg-[url('/images/home/banner_btn_bg.svg')] w-[200px] h-[50px] text-center text-white leading-[50px] mt-[20px] md:mt-[30px]"
            >
              {banner.btn_con}
            </Link>
          </div>
          <Link
            href="/"
            className="hidden right-[20px] bottom-[50px] w-[50px] h-[50px] bg-contain bg-no-repeat bg-[url('/images/home/arrow.svg')] z-10"
          />
          {/* Site Link */}
          <Entrance text={home} />
        </div>
      </section>
      <Dashboard />

      <section className="animate mt-[50px] md:mt-[200px] relative">
        <div className="container">
          {/* BUILD IT YOUR WAY */}
          <div className="flex flex-col justify-start md:flex-row md:gap-[80px] xl:gap-[106px] z-10">
          <Image
              alt="bg_coin"
              src="/images/home/bg_coin.png"
              width={220}
              height={220}
              className="bg-coin"
            />
            <div className="bd-blog">
              <p className={clsx("title", locale == "cn" && "font-primary font-bold", locale == "en" && "font-secondary",  locale == "zh" && "font-primary font-bold", locale == "jp" && "font-primary font-bold")}>{blog_1.title}</p>
              <div className="underline"></div>
              <p className="subtitle">{blog_1.subtitle}</p>
              <p className="description">{blog_1.description}</p>
            </div>
          </div>
          {/* THE BLOCKCHAIN BUILT TO SCALE */}
          <div className="flex flex-col mx-auto max-w-[890px]">
            <div className="relative w-full h-[400px] sm:h-[450px] md:h-[155px] ">
              <Image
                alt="pic_1"
                src="/images/home/pic_1.png"
                width={390}
                height={512}
                className="absolute right-0 bottom-0 md:top-0 -z-10"
              />
            </div>
            <div className="bd-blog">
            <p className={clsx("title", locale == "cn" && "font-primary font-bold", locale == "en" && "font-secondary",  locale == "zh" && "font-primary font-bold", locale == "jp" && "font-primary font-bold")}>{blog_2.title}</p>
              <div className="underline"></div>
              <p className="subtitle">{blog_2.subtitle}</p>
              <p className="description">{blog_2.description}</p>
            </div>
          </div>
        </div>
      </section>
      {/* JOIN WEB3's MOST VIBRANT COMMUNITY */}
      <section className="animate mt-12 md:mt-[212px] relative">
        <div className="-z-20 absolute w-[100%] h-[566px] md:w-[1000px] md:h-[800px] top-0 right-0 bg-contain bg-no-repeat bg-[url('/images/home/bg_Decoration_2.gif')] md:bg-[url('/images/home/md/bg_Decoration_2.gif')]" />
        <div className="container">
          <div className="flex flex-col mx-auto max-w-[890px]">
            <div className="flex justify-end">
              <div className="bd-blog bd-blog-right relative">
                <Image
                  alt="decoration_1"
                  src="/images/home/bg_ic.gif"
                  width={253}
                  height={280}
                  className="-z-10 hidden lg:block absolute -top-10 -right-32"
                />
                <p className={clsx("title", locale == "cn" && "font-primary font-bold", locale == "en" && "font-secondary",  locale == "zh" && "font-primary font-bold", locale == "jp" && "font-primary font-bold")}>{blog_3.title}</p>
                <div className="underline"></div>
                <p className="subtitle">{blog_3.subtitle}</p>
                <p className="description">{blog_3.description}</p>
              </div>
            </div>
            <div className="flex justify-start md:relative md:h-[240px]">
              <Image
                alt="pic_2"
                src="/images/home/pic_2.png"
                width={532}
                height={632}
                className="-z-10 md:absolute md:-bottom-[176px] md:-left-[100px] lg:-left-[250px] md:min-w-[532px] md:min-h-[632px]"
              />
            </div>
            <div className="flex flex-row justify-start">
              <div className="bd-blog relative">
                <Image
                  alt="decoration_1"
                  src="/images/home/bg_ic.gif"
                  width={253}
                  height={280}
                  className="-z-20 lg:hidden absolute -top-24 -right-5"
                />
                <p className={clsx("title", locale == "cn" && "font-primary font-bold", locale == "en" && "font-secondary",  locale == "zh" && "font-primary font-bold", locale == "jp" && "font-primary font-bold")}>{blog_4.title}</p>
                <div className="underline"></div>
                <p className="subtitle">{blog_4.subtitle}</p>
                <p className="description">{blog_4.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Connect To AVAX, FAQ */}
      <section className="animate mt-16 md:mt-20 lg:mt-40 relative">
        <Image alt="Decoration_3" src="/images/home/bg_Decoration_3.png" width={234} height={430} className="absolute right-0 top-0 md:top-[260px] -z-10" />
        <div className="container">
          <Link href="https://avascriptions.com/market/token?tick=avav" target="_blank">
            <div className="flex items-center justify-start w-full aspect-[4.6] md:aspect-[8] bg-contain bg-center bg-no-repeat bg-[url('/images/home/banner_bg.png')] md:bg-[url('/images/home/md/banner_bg.png')]">
              <h3 className={clsx("pl-4 md:pl-20 pr-1", locale == "cn" && "font-primary font-bold", locale == "en" && "font-secondary",  locale == "zh" && "font-primary font-bold", locale == "jp" && "font-primary font-bold")}>{banner.btn_con}</h3>
              <Image
                alt="arrow"
                src="/images/home/banner_ic_arrow.svg"
                width={28}
                height={28}
                className="w-4 h-4 md:w-7 md:h-7"
              />
            </div>
          </Link>
          {/* FAQ */}
          <div className="my-16 md:my-20 lg:my-40">
            <h3 className="text-[25px] md:text-[40px] text-cred">FAQS</h3>
            <div className="divide-y divide-[#1B1B1B]">
              {c_faq.map((faq, index) => {
                return (
                  <FaqItem
                    key={index}
                    faq={faq}
                    active={factive}
                    handleToggle={handleFaqToggle}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/home");

  return {
    props: {
      data,
    },
  };
};
