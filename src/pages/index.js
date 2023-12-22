import Base from "@/layouts/Baseof";
import Image from "next/image";
import Link from "next/link";
import FaqItem from "@/layouts/components/FaqItem";
import faqs from "@/content/faqs.json";
import { useEffect, useState } from "react";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";

export default function Home({data}) {
  const { locale } = useTranslation();
  const [factive, setFActive] = useState(null);
  const handleFaqToggle = (index) => {
    if (factive === index) {
        setFActive(null);
    } else {
        setFActive(index);
    }
  }

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);
  // 
  let { banner } = frontmatter;

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

  }, [locale, data]);

  return (
    <Base>
      {/*background*/}
      <div className="absolute w-full h-[1602px] md:h-[1187px] top-0 left-0 overflow-x-hidden -z-10">
        <div className="absolute w-[750px] h-[1267px] md:w-[1921px] md:h-[1187px] top-0 -left-[180px] sm:-left-0 md:left-auto md:right-0 bg-[url('/images/home/bg_top_pic.png')] md:bg-[url('/images/home/md/bg_top_pic.png')] -z-30">
          {/* top graph */}
          <div className="absolute w-[750px] h-[750px] top-[852px] right-0 md:top-[150px] md:right-[150px] bg-[url('/images/home/top_graph.gif')] md:bg-[url('/images/home/md/top_graph.gif')] -z-10">
          <Link href="/"
            className="absolute md:hidden right-[2%] sm:right-[3%] bottom-[30%] w-[50px] h-[50px] bg-contain bg-no-repeat bg-[url('/images/home/arrow.svg')]"
          />
          </div>
        </div>
      </div>
      
      {/*Top left*/}
      <div className="absolute w-[50%] md:w-[358px] h-[670px] bg-contain bg-no-repeat bg-[url('/images/home/top_left_line.svg')] -z-10" />
      {/*Right light*/}
      <div className="right-light absolute w-[80%] md:w-[1100px] h-[925px] md:h-[1658px] top-[1150px] md:top-[400px] right-0 bg-contain bg-center bg-no-repeat bg-[url('/images/home/bg_right_light.svg')] md:bg-[url('/images/home/md/bg_right_light.svg')] opacity-70 -z-10" />
      {/*Left line*/}
      <div className="absolute w-[55%] h-[804px] md:w-[1000px] top-[1800px] md:top-[1689px] left-0 bg-contain bg-center bg-no-repeat bg-[url('/images/home/line.gif')] md:bg-[url('/images/home/md/line.gif')] -z-10" />
      
      <div className="absolute w-[100%] h-[566px] md:w-[1000px] md:h-[800px] top-[2900px] md:top-[2817px] right-0 bg-contain bg-no-repeat bg-[url('/images/home/bg_Decoration_2.gif')] md:bg-[url('/images/home/md/bg_Decoration_2.gif')] -z-10" />
      <div className="-z-10 absolute w-[234px] h-[430px] top-[4020px] md:top-[3886px] right-0 bg-[url('/images/home/bg_Decoration_3.png')]" />
      <div className="container pt-[110px] md:pt-[254px]">
        <section className="min-h-[1602px] md:min-h-[1000px]">
          {/* Banner */}
          <div className="flex flex-col justify-start md:max-w-[670px]">
              <h2 className="whitespace-nowrap">{banner.title}</h2>
              <div className="relative">
              <h1 className="text-cred">$AVAV</h1>
              <div className="absolute w-[100px] h-[26px] bg-[url('/images/home/top_tag.svg')] top-[13px] left-[165px] md:top-[35px] md:left-[425px]" />
              </div>
              
              <div className="mt-[20px] md:mt-[136px]">
                {markdownify(banner.content, "h6", "text-white leading-6")}
              </div>
              <Link
                href="/"
                className="bg-[url('/images/home/banner_btn_bg.svg')] w-[200px] h-[50px] text-center text-white leading-[50px] mt-[20px] md:mt-[30px]"
              >
                {banner.btn_con}
              </Link>
            </div>
          {/* Site Link */}
          <div className="flex flex-wrap justify-center lg:justify-start max-w-[880px] gap-4 mt-[24px] md:mt-[60px]">
            <Link href="/" className="site-link">
              <Image
                alt="AVALANCHE"
                src="/images/home/top_card_logo_1.svg"
                width={132}
                height={118}
                className="w-[70%] h-auto"
              />
            </Link>
            <Link href="/" className="site-link">
              <Image
                alt="Bitget"
                src="/images/home/top_card_logo_2.svg"
                width={82}
                height={118}
                className="h-[63.4%] w-auto"
              />
            </Link>
            <Link href="/" className="site-link">
              <Image
                alt="Gate.io"
                src="/images/home/top_card_logo_3.svg"
                width={98}
                height={118}
                className="h-[63.4%] w-auto"
              />
            </Link>
            <div className="w-[186px] aspect-square hidden lg:flex" />
            <div className="w-[186px] aspect-square hidden lg:flex" />
            <Link href="/" className="site-link">
              <Image
                alt="BitMart"
                src="/images/home/top_card_logo_4.svg"
                width={84}
                height={118}
                className="h-[63.4%] w-auto"
              />
            </Link>
            <Link href="/" className="site-link">
              <Image
                alt="CoinGeko"
                src="/images/home/top_card_logo_5.png"
                width={116}
                height={118}
                className="h-[63.4%] md:h-[118px] w-auto md:w-[116px]"
              />
            </Link>
            <Link href="/" className="site-link">
              <Image
                alt="CoinMarketCap"
                src="/images/home/top_card_logo_6.svg"
                width={138}
                height={118}
                className="h-[63.4%] w-auto"
              />
            </Link>
          </div>
        </section>
        <section>
          {/* BUILD IT YOUR WAY */}
          <div className="flex flex-col justify-start md:flex-row mt-[40px] md:mt-[200px] md:gap-[80px] xl:gap-[106px]">
            <Image
              alt="bg_coin"
              src="/images/home/logo_2.gif"
              width={220}
              height={220}
              className="md:mt-[100px] -ml-3 lg:ml-12"
            />
            <div className="bd-blog">
              <p className="title">BUILD IT YOUR WAY</p>
              <div className="underline"></div>
              <p className="subtitle">
                Avalanche has the advanced tooling you need to accelerate from
                idea to launch.
              </p>
              <p className="description">
                Don’t miss out because it took too long to deploy on Mainnet.
                Take advantage of the low-code tooling and configurability that
                makes it easy to launch your Web3 innovation in less than 60
                seconds.
              </p>
            </div>
          </div>
          {/* THE BLOCKCHAIN BUILT TO SCALE */}
          <div className="flex flex-col mx-auto max-w-[890px]">
            <div className="relative w-full h-[400px] sm:h-[450px] md:h-[155px]">
              <Image
                alt="pic_1"
                src="/images/home/pic_1.png"
                width={390}
                height={512}
                className="-z-10 absolute right-0 bottom-0 md:top-0"
              />
            </div>
            <div className="bd-blog">
              <p className="title">THE BLOCKCHAIN BUILT TO SCALE</p>
              <div className="underline"></div>
              <p className="subtitle">
                Subnets set a new bar for scalability, without sacrificing
                speed, reliability, and security.
              </p>
              <p className="description">
                Users hate waiting. Scaling at the cost of performance or
                security is not an option. Avalanche’s novel architecture allows
                for a universe of independent, but interconnected, blockchains
                that are all validated and kept secure by dynamic subsets of
                validators.
              </p>
            </div>
          </div>
        </section>
        {/* JOIN WEB3's MOST VIBRANT COMMUNITY */}
        <section className="mt-12 md:mt-[212px]">
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
                <p className="title">JOIN WEB3&apos;s MOST VIBRANT COMMUNITY</p>
                <div className="underline"></div>
                <p className="subtitle">
                  Find the answers, connections, and info you need to accelerate
                  your Web3 aspirations.
                </p>
                <p className="description">
                  Over the last year, tens of thousands of people came together
                  at Avalanche events worldwide. As one of the industry’s most
                  diverse and supportive communities, Avalanche boasts members
                  from all walks of life, with over 18 languages supported
                  across the 1M+ strong online community.
                </p>
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
                <p className="title">SOMETIMES RED IS ALSO GREEN</p>
                <div className="underline"></div>
                <p className="subtitle">
                  Technology that isn’t sustainable has no claim on the future.
                </p>
                <p className="description">
                  When it comes to the energy required to run, no other
                  blockchain comes close. According to the Crypto Carbon Ratings
                  Institute, Avalanche consumes the same energy as only 46 US
                  households each year.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Connect To AVAX */}
        <section className="mt-16 md:mt-20 lg:mt-40">
          <Link href="https://avascriptions.com/market/token?tick=avav">
            <div className="flex items-center justify-start w-full aspect-[4.6] md:aspect-[8] bg-contain bg-center bg-no-repeat bg-[url('/images/home/banner_bg.png')] md:bg-[url('/images/home/md/banner_bg.png')]">
              <h3 className="pl-4 md:pl-20 pr-1">Connect To AVAX</h3>
              <Image
                alt="arrow"
                src="/images/home/banner_ic_arrow.svg"
                width={28}
                height={28}
                className="w-4 h-4 md:w-7 md:h-7"
              />
            </div>
          </Link>
        </section>
        {/* FAQ */}
        <section className="my-16 md:my-20 lg:my-40">
          <h3 className="text-[25px] md:text-[40px] text-cred">FAQS</h3>
          <div className="divide-y divide-[#1B1B1B]">
            {faqs.map((faq, index) => {
              return(
                <FaqItem key={index} faq={faq} active={factive} handleToggle={handleFaqToggle} />
              )
            })}
          </div>
        </section>
      </div>
    </Base>
  );
}

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/home");

  return {
    props: {
      data
    },
  };
};
