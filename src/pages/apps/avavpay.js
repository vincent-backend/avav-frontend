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
import ModalVideo from "@/layouts/components/home/ModalVideo";

export default function AVAPAY({ data }) {
  const { locale, setLocale } = useTranslation();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isVideoShow, setVideoShow] = useState(false);

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { umate } = frontmatter;

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    const handleStart = (url) => {
      url !== router.asPath && setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
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
        <section className="animate pt-[90px] md:pt-[140px] pb-[50px] md:pb-[100px] overflow-x-hidden">
          {/* Background */}
          <Image
            alt="banner-bg"
            src="/images/apps/umate/banner_bg.gif"
            width={750}
            height={1480}
            className="-z-10 absolute md:hidden top-0 left-0 w-full h-auto"
          />
          <div className="absolute hidden md:block -z-10 w-[1922px] h-[660px] top-0 left-[calc(50vw-961px)] bg-[url('/images/apps/umate/md/banner.gif')]" />

          <div className="container h-[calc(100vh-50px)] md:h-[550px]">
            {/* banner */}
            {markdownify(
              umate.title,
              "",
              `${locale == "en" ? "font-secondary" : "font-primary font-bold"}`
            )}
            <div className="flex flex-col w-full items-center justify-center mt-[30px] md:mt-[60px]">
              <Image
                alt="banner-logo"
                src="/images/apps/umate/banner_logo.png"
                width={126}
                height={38}
              />
              {markdownify(
                umate.banner_content,
                "",
                "mt-[16px] md:mt-[24px] text-center text-[20px]"
              )}
              {/* Banner link button */}
              <div className="flex w-full h-[60px] mx-auto items-center">
                <Link
                  href="https://umate.me"
                  target="_blank"
                  className="mt-[20px] md:mt-[30px] mx-auto"
                >
                  <div className="group flex items-center justify-center relative banner-btn w-[200px] h-[50px] hover:w-[240px] hover:h-[60px] transition-all duration-200 ease-linear">
                    <Image
                      alt="connect"
                      src="/images/home/banner_btn_bg.svg"
                      width={240}
                      height={60}
                      className="-z-10 absolute left-0 top-0 opacity-100 w-[200px] h-[50px] group-hover:w-[240px] group-hover:h-[60px] group-hover:opacity-70 group-active:w-[240px] group-active:h-[60px] group-active:opacity-70 transition-all duration-200 ease-linear"
                    />
                    <p className="text-center text-white leading-[50px]">
                      {umate.banner_button}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Portfolio */}
          <div className="relative w-full justify-center md:justify-between mt-[10px] md:mt-[20px]">
            {/* Background */}
            <Image
              alt="flower-1"
              src="/images/apps/umate/pic_flowers_1.gif"
              width={250}
              height={400}
              className="-z-20 md:hidden absolute right-0 top-[50%]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[50px] md:gap-y-[100px] mx-auto max-w-[960px]">
              <div className="umate-portfolio">
                {markdownify(
                  umate.port_1,
                  "",
                  `text-center text-[20px] md:text-[40px] ${
                    locale == "en" ? "font-secondary" : "font-primary font-bold"
                  }`
                )}
                <Image
                  alt="portfolio"
                  src="/images/apps/umate/umate_graph_1.svg"
                  width={336}
                  height={336}
                  className="w-full h-full md:w-[336px] md:h-[336px]"
                />
              </div>
              <div className="umate-portfolio">
                {markdownify(
                  umate.port_2,
                  "",
                  `text-center text-[20px] md:text-[40px] ${
                    locale == "en" ? "font-secondary" : "font-primary font-bold"
                  }`
                )}
                <Image
                  alt="portfolio"
                  src="/images/apps/umate/umate_graph_2.svg"
                  width={336}
                  height={336}
                  className="w-full h-full md:w-[336px] md:h-[336px]"
                />
              </div>
              <div className="umate-portfolio">
                {markdownify(
                  umate.port_3,
                  "",
                  `text-center text-[20px] md:text-[40px] ${
                    locale == "en" ? "font-secondary" : "font-primary font-bold"
                  }`
                )}
                <Image
                  alt="portfolio"
                  src="/images/apps/umate/umate_graph_3.svg"
                  width={336}
                  height={336}
                  className="w-full h-full md:w-[336px] md:h-[336px]"
                />
              </div>
              <div className="umate-portfolio">
                {markdownify(
                  umate.port_4,
                  "",
                  `text-center text-[20px] md:text-[40px] ${
                    locale == "en" ? "font-secondary" : "font-primary font-bold"
                  }`
                )}
                <Image
                  alt="portfolio"
                  src="/images/apps/umate/umate_graph_4.svg"
                  width={336}
                  height={336}
                  className="w-full h-full md:w-[336px] md:h-[336px]"
                />
              </div>
            </div>
          </div>
          {/* Video tutorial */}
          <div className="relative mt-[50px] md:mt-[100px] w-full flex flex-col items-center">
            {/* Background */}
            <Image alt="background" src="/images/apps/umate/pic_graph_1.gif" width={750} height={532} className="absolute -z-20 left-0 top-[-120px] md:top-[-390px]" />
            <Image alt="background" src="/images/apps/umate/pic_flowers_2.gif" width={400} height={400} className="hidden -z-20 md:block absolute left-0 top-[175px]" />
            {/* title */}
            <h4 className="text-cred inline-block">{umate.tutorial}</h4>
            <div className="mx-auto">
              <ModalVideo
                  thumb={"/images/apps/umate/video_thumb.png"}
                  thumbWidth={360}
                  thumbHeight={640}
                  thumbAlt={"AVAV Video Payment Tutorial"}
                  video={"/videos/telegram_video.mp4"}
                  videoWidth={288}
                  videoHeight={640}
                  setVideoShow={setVideoShow}
                />
            </div>
          </div>
          {/* Opensource Link */}
          <div className="container flex w-full h-[60px] mx-auto mt-[30px] md:mt-[60px] items-center justify-center">
            <a href="/upload/avav-demo.zip" download="avav-demo.zip">
              <div className="group flex items-center justify-center relative w-[350px] h-[50px]">
                <Image
                  alt="connect"
                  src="/images/apps/umate/btn_bg_link.svg"
                  width={350}
                  height={50}
                  className="-z-10 absolute left-0 top-0 opacity-100 w-full md:w-[350px] h-[50px] group-hover:opacity-70 group-active:w-[360px] group-active:h-[60px] group-active:opacity-70 transition-all duration-200 ease-linear"
                />
                <p className="text-center text-[16px] text-white leading-[50px]">
                  {umate.download_button}
                </p>
              </div>
            </a>
          </div>
        </section>
      )}
    </Base>
  );
}

// for apps content
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/apps");

  return {
    props: {
      data,
    },
  };
};
