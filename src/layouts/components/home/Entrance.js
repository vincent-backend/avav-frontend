import Link from "next/link";
import Image from "next/image";

export default function Entrance({ text, handleClick, handleIconClick }) {
  return (
    <div className="animate flex flex-wrap justify-center lg:justify-start gap-4 mt-[400px] md:mt-[60px] ">
      <Link
        href="https://avascriptions.com/market/token?tick=avav"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="AVALANCHE"
          src="/images/home/top_card_logo_1_1.png"
          width={132}
          height={118}
          className="w-[71%] h-auto"
        />
        <Image alt="trading" src="/images/home/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
      <Link href="/" target="_blank" className="site-link hidden relative">
        <Image
          alt="Bitget"
          src="/images/home/top_card_logo_2.svg"
          width={82}
          height={118}
          className="h-[63.4%] w-auto"
        />
        <Image alt="trading" src="/images/home/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
      <Link href="/" target="_blank" className="site-link relative hidden">
        <Image
          alt="Gate.io"
          src="/images/home/top_card_logo_3.svg"
          width={98}
          height={118}
          className="h-[63.4%] w-auto"
        />
        <Image alt="trading" src="/images/home/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
      <Link href="/" target="_blank" className="site-link relative hidden">
        <Image
          alt="BitMart"
          src="/images/home/top_card_logo_4.svg"
          width={84}
          height={118}
          className="h-[63.4%] w-auto"
        />
        <Image alt="trading" src="/images/home/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
      <Link href="/" target="_blank" className="site-link relative hidden">
        <Image
          alt="CoinGeko"
          src="/images/home/top_card_logo_5.png"
          width={116}
          height={118}
          className="h-[63.4%] md:h-[118px] w-auto md:w-[116px]"
        />
        <Image alt="trading" src="/images/home/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
      <Link href="/" target="_blank" className="site-link relative hidden">
        <Image
          alt="CoinMarketCap"
          src="/images/home/top_card_logo_6.svg"
          width={138}
          height={118}
          className="h-[63.4%] w-auto"
        />
        <Image alt="trading" src="/images/home/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      <Link
        href="https://h5.4ezh6.com/?ref=EAW6SB&forward_url=1&page=1&channelCode=EAW6SB"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="CoinMarketCap"
          src="/images/home/top_card_logo_7_2.png"
          width={118}
          height={132}
          className="h-[61.68%] w-auto"
        />
        <Image alt="trading" src="/images/home/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      {/*TP Wallet*/}
      <div className="group site-link md:site-link-other relative">
        <Image alt="trading" src="/images/home/logo_ic_purse.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
        <div className="flex items-center justify-center w-full h-full md:group-hover:-translate-y-full transition-transform duration-500 ease-out">
          <Image
            alt="TP Wallet"
            src="/images/home/top_card_logo_9_1.png"
            width={98}
            height={118}
            className="h-[63.4%] w-auto"
            onClick={()=>handleIconClick("TP")}
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 hidden md:group-hover:block">
          <div className="flex flex-col w-full h-full">
            <Link href="https://www.tokenpocket.pro/" target="_blank" className="h-[50%]">
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
                {text.open_wallet}
              </div>
            </Link>
            <div className="h-[50%] cursor-pointer" onClick={()=>handleClick("TP")}>
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
                {text.buy_tutorial}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*OKX Wallet*/}
      <div className="group site-link md:site-link-other relative">
      <Image alt="trading" src="/images/home/logo_ic_purse.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
        <div className="flex items-center justify-center w-full h-full md:group-hover:-translate-y-full transition-transform duration-500 ease-out">
          <Image
            alt="OKX Wallet"
            src="/images/home/top_card_logo_8_1.png"
            width={98}
            height={118}
            className="h-[63.4%] w-auto"
            onClick={()=>handleIconClick("OKX")}
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 hidden md:group-hover:block">
          <div className="flex flex-col w-full h-full">
            <Link href="https://www.okx.com/web3" target="_blank" className="h-[50%]">
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
                {text.open_wallet}
              </div>
            </Link>
            <div className="h-[50%] cursor-pointer" onClick={()=>handleClick("OKX")}>
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
                {text.buy_tutorial}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Metamask Wallet*/}
      <div className="group site-link md:site-link-other relative">
      <Image alt="trading" src="/images/home/logo_ic_purse.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
        <div className="flex items-center justify-center w-full h-full md:group-hover:-translate-y-full transition-transform duration-500 ease-out">
          <Image
            alt="Metamask Wallet"
            src="/images/home/top_card_logo_10.png"
            width={98}
            height={118}
            className="h-[63.4%] w-auto"
            onClick={()=>handleIconClick("Metamask")}
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 hidden md:group-hover:block">
          <div className="flex flex-col w-full h-full">
            <Link href="https://metamask.io/" target="_blank" className="h-[50%]">
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
                {text.open_wallet}
              </div>
            </Link>
            <div className="h-[50%] cursor-pointer" onClick={()=>handleClick("Metamask")}>
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
                {text.buy_tutorial}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
