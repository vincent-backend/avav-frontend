import Link from "next/link";
import Image from "next/image";

export default function Entrance({ text }) {
  return (
    <div className="animate flex flex-wrap justify-center lg:justify-start gap-4 mt-[400px] md:mt-[60px]">
      <Link
        href="https://avascriptions.com/market/token?tick=avav"
        target="_blank"
        className="site-link"
      >
        <Image
          alt="AVALANCHE"
          src="/images/home/top_card_logo_1.svg"
          width={132}
          height={118}
          className="w-[70%] h-auto"
        />
      </Link>
      <Link href="/" target="_blank" className="site-link hidden">
        <Image
          alt="Bitget"
          src="/images/home/top_card_logo_2.svg"
          width={82}
          height={118}
          className="h-[63.4%] w-auto"
        />
      </Link>
      <Link href="/" target="_blank" className="site-link hidden">
        <Image
          alt="Gate.io"
          src="/images/home/top_card_logo_3.svg"
          width={98}
          height={118}
          className="h-[63.4%] w-auto"
        />
      </Link>
      <Link href="/" target="_blank" className="site-link hidden">
        <Image
          alt="BitMart"
          src="/images/home/top_card_logo_4.svg"
          width={84}
          height={118}
          className="h-[63.4%] w-auto"
        />
      </Link>
      <Link href="/" target="_blank" className="site-link hidden">
        <Image
          alt="CoinGeko"
          src="/images/home/top_card_logo_5.png"
          width={116}
          height={118}
          className="h-[63.4%] md:h-[118px] w-auto md:w-[116px]"
        />
      </Link>
      <Link href="/" target="_blank" className="site-link hidden">
        <Image
          alt="CoinMarketCap"
          src="/images/home/top_card_logo_6.svg"
          width={138}
          height={118}
          className="h-[63.4%] w-auto"
        />
      </Link>
      <Link
        href="https://h5.4ezh6.com/?ref=EAW6SB&forward_url=1&page=1&channelCode=EAW6SB"
        target="_blank"
        className="site-link"
      >
        <Image
          alt="CoinMarketCap"
          src="/images/home/top_card_logo_7_2.png"
          width={118}
          height={132}
          className="h-[61.68%] w-auto"
        />
      </Link>


      <div className="group site-link md:site-link-other">
        <div className="w-full h-full flex justify-center items-center md:group-hover:-translate-y-full transition-transform duration-500 ease-out">
          <Image
            alt="BitMart"
            src="/images/home/top_card_logo_9_1.png"
            width={98}
            height={118}
            className="h-[63.4%] w-auto"
          />
        </div>
      </div>
      
      <Link href="/" target="_blank" className="site-link md:site-link-other">
        <Image
          alt="CoinMarketCap"
          src="/images/home/top_card_logo_8_1.png"
          width={99}
          height={118}
          className="h-[63.4%] w-auto"
        />
      </Link>
      <Link href="/" target="_blank" className="site-link-other">
        <Image
          alt="CoinMarketCap"
          src="/images/home/top_card_logo_10.png"
          width={98}
          height={118}
          className="h-[63.4%] w-auto"
        />
      </Link>
      <div className="site-link-other hidden">
        <Link href="/" target="_blank" className="h-[50%]">
          <div className="group flex flex-col h-full justify-center items-center text-white hover:text-cred">
            <div className="w-[16px] h-[16px] bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')] group-active:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
            {text.open_wallet}
          </div>
        </Link>
        <Link href="/" className="h-[50%]">
          <div className="group flex flex-col h-full justify-center items-center text-white hover:text-cred">
            <div className="w-[16px] h-[16px] bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')] group-active:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
            {text.buy_tutorial}
          </div>
        </Link>
      </div>
    </div>
  );
}
