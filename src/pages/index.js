import config from "@/config/config.json";
import faqs from "@/content/faqs.json";
import useTranslation from "@/hooks/useTranslation";
import useOutsideAlerter from "@/hooks/useOutsideAlterter";
import CopyToClipboard from "@/hooks/useClipboard";
import { markdownify } from "@/lib/utils/textConverter";
import Base from "@/layouts/Baseof";
import FaqItem from "@/layouts/components/FaqItem";
import Dashboard from "@/layouts/components/home/Dashboard";
import Entrance from "@/layouts/components/home/Entrance";
import HistoryTimeline from "@/layouts/components/home/HistoryTimeline";
import Loading from "@/layouts/components/Loading";
import ModalVideo from "@/layouts/components/home/ModalVideo";
import { getDataFromContent } from "@/lib/contentParser";
import { gsap } from "@/lib/gsap";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Store } from "react-notifications-component";

export default function Home({ data }) {
  const { locale } = useTranslation();
  const [factive, setFActive] = useState(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);
  //
  let { banner, blog_1, blog_2, blog_3, blog_4, home } = frontmatter;
  const { general } = config;

  // entrance link option
  const [isLinkOptionShow, setLinkOpShow] = useState(false);
  const [curOpenWalletUrl, setOpenWalletUrl] = useState("");
  const [curSelWallet, setCurWallet] = useState("TP");
  const onOpenWalletClick = (m) => {
    setCurWallet(m);
    if (m === "TP") {
      setOpenWalletUrl("https://www.tokenpocket.pro/");
    } else if (m === "OKX") {
      setOpenWalletUrl("https://www.okx.com/web3");
    } else if (m === "Metamask") {
      setOpenWalletUrl("https://metamask.io/");
    }

    setLinkOpShow(true);
  };

  // video player
  const [isVideoShow, setVideoShow] = useState(false);
  const [thumb, setThumb] = useState("/images/tutorial/IMG_7922.png");
  const [thumbWidth, setThumbWidth] = useState(360);
  const [thumbHeight, setThumbHeight] = useState(640);
  const [thumbAlt, setThumbAlt] = useState("How to buy AVAV on TP Wallet");
  const [video, setVideo] = useState("/videos/IMG_7922.mp4");
  const [videoWidth, setVideoWidth] = useState(360);
  const [videoHeight, setVideoHeight] = useState(640);

  const onEntranceVideoClick = (m) => {
    setLinkOpShow(false);
    if (m === "TP") {
      setThumb("/images/tutorial/IMG_7922.png");
      setThumbWidth(360);
      setThumbHeight(640);
      setThumbAlt("How to buy AVAV on TP Wallet");
      setVideo("/videos/IMG_7922.MP4");
      setVideoWidth(360);
      setVideoHeight(640);
      setVideoShow(true);
    } else if (m === "OKX") {
      setThumb("/images/tutorial/IMG_7923.png");
      setThumbWidth(296);
      setThumbHeight(640);
      setThumbAlt("How to buy AVAV on OKX Wallet");
      setVideo("/videos/IMG_7923.MP4");
      setVideoWidth(296);
      setVideoHeight(640);
      setVideoShow(true);
    } else if (m === "Metamask") {
      setThumb("/images/tutorial/IMG_7952.png");
      setThumbWidth(288);
      setThumbHeight(636);
      setThumbAlt("How to buy AVAV on Metamask Wallet");
      setVideo("/videos/IMG_7952.MP4");
      setVideoWidth(288);
      setVideoHeight(636);
      setVideoShow(true);
    } else {
      setVideoShow(false);
    }
  };

  // Faq
  const handleFaqToggle = (index) => {
    if (factive === index) {
      setFActive(null);
    } else {
      setFActive(index);
    }
  };

  // copy address
  const handleAddrCopy = (copyStr) => {
    if (CopyToClipboard(copyStr, locale)) {
      Store.addNotification({
        message: "Copy Success!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        message:
          "AVAV donation address copy failed. Your web browser does not support copy functionality.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  };

  /// Overlay click
  // Video player
  const container_video = useRef(null);
  const onVideoOverlayClick = (e) => {
    if (!container_video.current?.contains(e.target)) setVideoShow(false);
  };
  // Option dialog
  const container_option = useRef(null);
  useOutsideAlerter(container_option, setLinkOpShow);

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    // If Escape keyboard is clicked
    const onKeyPress = (e) => {
      if (e.key === "Escape") {
        setVideoShow(false);
        setLinkOpShow(false);
        return;
      }
    };
    if (typeof window !== "undefined")  window.addEventListener("keydown", onKeyPress);

    // animate
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
          { y: 0, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          ">-0.2"
        );
    });

    const handleStart = (url) => {
      url !== router.asPath && setLoading(true);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      ctx.revert();
      if (typeof window !== "undefined") window.removeEventListener("keydown", onKeyPress);
    };
  }, [locale, data]);

  return (
    <Base>
      <div className="absolute w-[70%] md:w-[869px] h-[1011px] bg-contain bg-no-repeat bg-[url('/images/home/bg_top_left_light.png')] -z-10" />

      {loading ? (
        <Loading />
      ) : (
        <>
          {/*background*/}
          <div className="absolute w-full h-[1602px] md:h-[1187px] top-0 left-0 overflow-x-hidden -z-20">
            <div className="absolute w-full h-[100vh] md:aspect-auto md:w-[1920px] md:h-[1187px] top-0 left-0 md:left-auto md:right-[-350px] xl:right-[-200px] 2xl:right-0 bg-cover md:bg-contain bg-center bg-no-repeat bg-[url('/images/home/bg_top_pic_1.png')] md:bg-[url('/images/home/md/bg_top_pic.png')] -z-40">
              {/* top graph */}
              <div className="top-graph opacity-0 absolute w-full aspect-square md:w-[750px] top-[165vw] right-0 md:top-[150px] md:right-[150px] bg-contain bg-center bg-no-repeat bg-[url('/images/home/top_graph_2.gif')] md:bg-[url('/images/home/md/top_graph-2.gif')] -z-10" />
            </div>
          </div>
          {/*Top left*/}
          <div className="absolute w-[70%] md:w-[358px] h-[670px] bg-contain bg-no-repeat bg-[url('/images/home/top_left_line.svg')] -z-10" />
          {/*Right light*/}
          <div className="right-light absolute w-[80%] md:w-[1100px] h-[925px] md:h-[1658px] top-[250px] md:top-[260px] right-0 bg-contain bg-center bg-no-repeat bg-[url('/images/home/bg_right_light.svg')] md:bg-[url('/images/home/md/bg_right_light.svg')] opacity-70 -z-10" />

          {/* Banner */}
          <section className="min-h-[110vh] md:min-h-[1000px] pt-[90px] md:pt-[254px]">
            <div className="container">
              {/* Banner */}
              <div className="flex flex-col lg:flex-row">
                <div className="banner flex flex-col justify-start md:max-w-[680px]">
                  {/* Banner title */}
                  <div className="banner-title opacity-0">
                    <h2 className="whitespace-nowrap">{banner.title}</h2>
                    <div className="relative">
                      <h1 className="text-cred">$AVAV</h1>
                      <div className="absolute w-[100px] h-[26px] bg-[url('/images/home/top_tag.svg')] top-[13px] left-[165px] md:top-[35px] md:left-[425px]" />
                    </div>
                  </div>
                  {/* Banner subtitle */}
                  <div className="banner-content opacity-0 mt-[16px] md:mt-[84px]">
                    <p className="text-[20px] md:text-[28px] leading-6 md:leading-10 text-cred font-secondary">
                      {banner.subtitle}
                    </p>
                    {markdownify(
                      banner.content,
                      "h6",
                      "text-white leading-6 mt-2"
                    )}
                  </div>
                  {/* Banner link button */}
                  <Link
                    href="https://avascriptions.com/market/token?tick=avav"
                    target="_blank"
                    className="mt-[20px] md:mt-[30px] mr-auto"
                  >
                    <div className="group relative banner-btn opacity-0 w-[240px] h-[60px]">
                      <Image
                        alt="connect"
                        src="/images/home/banner_btn_bg.svg"
                        width={200}
                        height={50}
                        className="absolute -z-10 left-0 -top-[5px] opacity-100 w-[200px] h-[50px] group-hover:w-[240px] group-hover:h-[60px] group-hover:opacity-70 group-active:w-[240px] group-active:h-[60px] group-active:opacity-70 transition-all duration-200 ease-linear"
                      />
                      <p className="text-center text-white w-[200px] leading-[40px] group-hover:w-[220px] group-hover:leading-[50px] group-active:w-[220px] group-active:leading-[50px] transition-all duration-200 ease-linear">
                        {banner.btn_con}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="animate mt-[195px] md:mt-20">
            {/* Site Link */}
            <div className="container">
              <Entrance
                text={home}
                handleClick={onEntranceVideoClick}
                handleIconClick={onOpenWalletClick}
              />
            </div>
          </section>

          {/* Dashboard */}
          <Dashboard />

          {/* AVAV Token Address */}
          <section className="animate container mx-auto my-12 md:my-20 lg:my-28 max-w-[600px]">
            <p className="text-cred font-primary font-bold text-center text-[18px] md:text-[26px]">
              {home.token_addr}
            </p>
            <div className="mt-2 md:mt-5 flex flex-col md:flex-row items-center">
              <div className="relative flex flex-row items-center justify-between h-[60px] md:h-[70px] bg-[#1A1C1F] w-full mt-4 md:mt-0">
                <p className="text-white text-center font-secondary text-[14px] px-[10px] md:px-[20px] break-all w-full">
                  {general.token_addr}
                </p>
                <button
                  className="bg-cred min-w-[60px] md:min-w-[70px] h-full pl-[18px] md:pl-[22px]"
                  onClick={() => handleAddrCopy(general.token_addr)}
                >
                  <Image
                    alt="copy"
                    src="/images/footer/copy_nor.svg"
                    width={22}
                    height={22}
                  />
                </button>
              </div>
            </div>
          </section>

          {/*Blog 1*/}
          <section className="animate mt-[60px] md:mt-[120px] relative overflow-hidden">
            {/*Left line*/}
            <div className="absolute w-[55%] h-[804px] md:w-[1000px] -top-24 md:top-0 left-0 bg-contain bg-center bg-no-repeat bg-[url('/images/home/line.gif')] md:bg-[url('/images/home/md/line.gif')] -z-10" />
            <div className="container">
              {/* BUILD IT YOUR WAY */}
              <div className="flex flex-col justify-start items-end md:flex-row md:gap-[80px] xl:gap-[106px] z-10">
                <Image
                  alt="bg_coin"
                  src="/images/home/bg_coin-2.png"
                  width={220}
                  height={220}
                  className="bg-coin w-[120px] h-[120px] md:w-[220px] md:h-[220px]"
                />
                <div className="bd-blog">
                  <p
                    className={clsx(
                      "title",
                      locale == "zh-CN" && "font-primary font-bold",
                      locale == "en" && "font-secondary",
                      locale == "zh" && "font-primary font-bold",
                      locale == "ja" && "font-primary font-bold"
                    )}
                  >
                    {blog_1.title}
                  </p>
                  <div className="underline"></div>
                  <p className="subtitle">{blog_1.subtitle}</p>
                  <p className="description">{blog_1.description}</p>
                </div>
              </div>
              {/* THE BLOCKCHAIN BUILT TO SCALE */}
              <div className="flex flex-col mx-auto max-w-[890px]">
                <div className="relative w-full h-[80vw] md:h-[155px] ">
                  <Image
                    alt="pic_1"
                    src="/images/home/pic_1.png"
                    width={390}
                    height={512}
                    className="absolute right-0 bottom-0 md:top-0 w-[80%] md:w-[390px] h-auto -z-10"
                  />
                </div>
                <div className="bd-blog">
                  <p
                    className={clsx(
                      "title",
                      locale == "zh-CN" && "font-primary font-bold",
                      locale == "en" && "font-secondary",
                      locale == "zh" && "font-primary font-bold",
                      locale == "ja" && "font-primary font-bold"
                    )}
                  >
                    {blog_2.title}
                  </p>
                  <div className="underline"></div>
                  <p className="subtitle">{blog_2.subtitle}</p>
                  <p className="description">{blog_2.description}</p>
                </div>
              </div>
            </div>
          </section>
          {/* JOIN WEB3's MOST VIBRANT COMMUNITY */}
          <section className="animate mt-12 md:mt-[212px] relative overflow-hidden">
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
                    <p
                      className={clsx(
                        "title",
                        locale == "zh-CN" && "font-primary font-bold",
                        locale == "en" && "font-secondary",
                        locale == "zh" && "font-primary font-bold",
                        locale == "ja" && "font-primary font-bold"
                      )}
                    >
                      {blog_3.title}
                    </p>
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
                    <p
                      className={clsx(
                        "title",
                        locale == "zh-CN" && "font-primary font-bold",
                        locale == "en" && "font-secondary",
                        locale == "zh" && "font-primary font-bold",
                        locale == "ja" && "font-primary font-bold"
                      )}
                    >
                      {blog_4.title}
                    </p>
                    <div className="underline"></div>
                    <p className="subtitle">{blog_4.subtitle}</p>
                    <p className="description">{blog_4.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Connect To AVAX */}
          <section className="animate mt-16 md:mt-20 lg:mt-40">
            <div className="container">
              <Link
                href="https://avascriptions.com/market/token?tick=avav"
                target="_blank"
              >
                <div className="flex items-center justify-start w-full aspect-[4.6] md:aspect-[8] bg-contain bg-center bg-no-repeat bg-[url('/images/home/banner_bg.png')] md:bg-[url('/images/home/md/banner_bg.png')]">
                  <h3
                    className={clsx(
                      "pl-4 md:pl-20 pr-1",
                      locale == "zh-CN" && "font-primary font-bold",
                      locale == "en" && "font-secondary",
                      locale == "zh" && "font-primary font-bold",
                      locale == "ja" && "font-primary font-bold"
                    )}
                  >
                    {banner.btn_con}
                  </h3>
                  <Image
                    alt="arrow"
                    src="/images/home/banner_ic_arrow.svg"
                    width={28}
                    height={28}
                    className="w-4 h-4 md:w-7 md:h-7"
                  />
                </div>
              </Link>
            </div>
          </section>
          {/* HistoryTimeline */}
          <section className="animate mt-20 md:mt-40">
            <div className="container">
              <h3
                className={clsx(
                  "text-[25px] md:text-[40px] text-cred",
                  locale == "en" && "font-secondary",
                  locale != "en" && "font-primary font-bold"
                )}
              >
                {home.dev_course}
              </h3>
              <HistoryTimeline />
            </div>
          </section>
          {/* FAQ */}
          <section className="animate mt-12 md:mt-16 lg:mt-36 relative">
            <Image
              alt="Decoration_3"
              src="/images/home/bg_Decoration_3.png"
              width={234}
              height={430}
              className="absolute right-0 top-0 md:top-[50px] -z-10"
            />
            <div className="container">
              <div className="my-16 md:my-20 lg:my-40">
                <h3 className="text-[25px] md:text-[40px] text-cred">FAQS</h3>
                <div className="divide-y divide-[#1B1B1B] mt-2 md:mt-4">
                  {faqs[locale].map((faq, index) => {
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

          {/* AVAV Donation Address */}
          <section className="animate container mx-auto my-12 md:my-16 lg:my-36 max-w-[720px]">
            <p className="text-cred font-primary font-bold text-center text-[18px] md:text-[26px]">
              {home.donation}
            </p>
            <div className="mt-7 md:mt-12 flex flex-col md:flex-row items-center">
              <button className="relative group border-none text-white text-[14px] font-primary min-w-[157px] md:h-[70px] md:bg-[#1A1C1F]">
                AVAV Address
                <Image
                  src="/images/nav/nav_ic_arrow_unfold.svg"
                  alt="dropdown"
                  width={10}
                  height={10}
                  className="inline-block ml-1 group-hover:rotate-180 transition-all duration-200"
                />
                <ul className="absolute top-[calc(100%+2px)] w-full z-[100] bg-[#1A1C1F] rounded-sm opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200">
                  <li className="leading-[20px] py-3">AVAV Address</li>
                </ul>
              </button>
              <div className="hidden md:block w-[10px] h-[70px] text-[30px] leading-[60px] text-[#292929] bg-[#1A1C1F]">
                |
              </div>
              <div className="relative flex flex-row items-center justify-between h-[60px] md:h-[70px] bg-[#1A1C1F] w-full mt-4 md:mt-0">
                <p className="text-white font-secondary text-[14px] px-[10px] md:px-[20px] break-all">
                  {general.donate_addr}
                </p>
                <button
                  className="bg-cred min-w-[60px] md:w-[70px] h-full pl-[18px] md:pl-[22px]"
                  onClick={() => handleAddrCopy(general.donate_addr)}
                >
                  <Image
                    alt="copy"
                    src="/images/footer/copy_nor.svg"
                    width={22}
                    height={22}
                  />
                </button>
              </div>
            </div>
            <div className="text-center mt-5 md:mt-[26px]">
              {markdownify(home.donation_description, "", "")}
            </div>
          </section>

          {/* Video show */}
          {isVideoShow && (
            <div className="z-20 fixed top-0 left-0 w-full h-full bg-[#000000] bg-opacity-20 transition-all duration-500 ease-out">
              <div className="flex justify-center items-center h-full">
                <ModalVideo
                  thumb={thumb}
                  thumbWidth={thumbWidth}
                  thumbHeight={thumbHeight}
                  thumbAlt={thumbAlt}
                  video={video}
                  videoWidth={videoWidth}
                  videoHeight={videoHeight}
                  setVideoShow={setVideoShow}
                />
              </div>
            </div>
          )}

          {/* Link Option */}
          {isLinkOptionShow && (
            <div className="md:hidden z-10 fixed top-0 left-0 w-full h-full transition-all duration-500 ease-out">
              <div className="flex justify-center items-center bg-[#000000] bg-opacity-70 w-full h-full">
                <div
                  className="flex flex-col justify-ceter items-center w-full mx-10 h-[91px] bg-[#2e3137] text-white "
                  ref={container_option}
                >
                  <Link
                    href={curOpenWalletUrl}
                    target="_blank"
                    className="h-full leading-10"
                    onClick={() => setLinkOpShow(false)}
                  >
                    {home.open_wallet}
                  </Link>
                  <div className="w-[80%] min-h-[1px] bg-[#41444a]" />
                  <button
                    className="h-full leading-10"
                    onClick={() => onEntranceVideoClick(curSelWallet)}
                  >
                    {home.buy_tutorial}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
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
