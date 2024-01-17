import Link from "next/link";
import Image from "next/image";

export default function Entrance({ text, handleClick, handleIconClick }) {
  return (
    <div className="animate flex flex-wrap justify-center lg:justify-start gap-4 mt-[200px] md:mt-[60px] ">
      {/* Bitget */}
      <Link href="https://www.bitget.com/spot/AVAVUSDT" target="_blank" className="site-link relative">
        <Image
          alt="Bitget"
          src="/images/home/entrance/bitget-logo.svg"
          width={82}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      <Link
        href="https://avascriptions.com/market/token?tick=avav"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="AVALANCHE"
          src="/images/home/entrance/avascriptions-logo.png"
          width={132}
          height={118}
          className="w-[71%] h-auto md:h-[118px] md:w-auto"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
      <Link href="/" target="_blank" className="site-link relative hidden">
        <Image
          alt="Gate.io"
          src="/images/home/entrance/top_card_logo_3.svg"
          width={98}
          height={118}
          className="h-[63.4%] w-auto"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
      <Link href="https://www.bitmart.com/trade/en-US?symbol=AVAV_USDT" target="_blank" className="site-link relative">
        <Image
          alt="BitMart"
          src="/images/home/entrance/top_card_logo_4.svg"
          width={84}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
      <Link href="/" target="_blank" className="site-link relative hidden">
        <Image
          alt="CoinGecko"
          src="/images/home/entrance/coingecko-logo.png"
          width={116}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      <Link href="https://coinmarketcap.com/currencies/avascriptions/" target="_blank" className="site-link relative">
        <Image
          alt="CoinMarketCap"
          src="/images/home/entrance/top_card_logo_6.svg"
          width={138}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_marketplace.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      <Link
        href="https://h5.4ezh6.com/trade-quotes?spots_symbol_id=1143&ref=EAW6SB&forward_url=1&page=1&channelCode=EAW6SB"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="4E"
          src="/images/home/entrance/4e-logo.png"
          width={118}
          height={132}
          className="h-[61.68%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      {/*TP Wallet*/}
      <div className="group site-link md:site-link-other relative">
        <Image alt="trading" src="/images/home/entrance/logo_ic_purse.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
        <div className="flex items-center justify-center w-full h-full opacity-100 md:group-hover:opacity-20 transition-all duration-150 ease-linear" onClick={()=>handleIconClick("TP")}>
          <Image
            alt="TP Wallet"
            src="/images/home/entrance/tpwallet-logo.png"
            width={98}
            height={118}
            className="h-[63.4%] w-auto md:h-[118px]"
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 hidden md:group-hover:block">
          <div className="flex flex-col w-full h-full">
            <Link href="https://www.tokenpocket.pro/" target="_blank" className="h-[50%]">
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/entrance/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/entrance/logo_bg_ic_arrow_hover.svg')]" />
                {text.open_wallet}
              </div>
            </Link>
            <div className="h-[50%] cursor-pointer" onClick={()=>handleClick("TP")}>
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/entrance/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/entrance/logo_bg_ic_arrow_hover.svg')]" />
                {text.buy_tutorial}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*OKX Wallet*/}
      <div className="group site-link md:site-link-other relative">
      <Image alt="trading" src="/images/home/entrance/logo_ic_purse.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
        <div className="flex items-center justify-center w-full h-full opacity-100 md:group-hover:opacity-20 transition-all duration-150 ease-linear" onClick={()=>handleIconClick("OKX")}>
          <Image
            alt="OKX Wallet"
            src="/images/home/entrance/okx-logo.png"
            width={98}
            height={118}
            className="h-[63.4%] w-auto md:h-[118px]"
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 hidden md:group-hover:block">
          <div className="flex flex-col w-full h-full">
            <Link href="https://www.okx.com/web3" target="_blank" className="h-[50%]">
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/entrance/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/entrance/logo_bg_ic_arrow_hover.svg')]" />
                {text.open_wallet}
              </div>
            </Link>
            <div className="h-[50%] cursor-pointer" onClick={()=>handleClick("OKX")}>
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/entrance/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/entrance/logo_bg_ic_arrow_hover.svg')]" />
                {text.buy_tutorial}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Metamask Wallet*/}
      <div className="group site-link md:site-link-other relative">
      <Image alt="trading" src="/images/home/entrance/logo_ic_purse.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
        <div className="flex items-center justify-center w-full h-full opacity-100 md:group-hover:opacity-20 transition-all duration-150 ease-linear"  onClick={()=>handleIconClick("Metamask")}>
          <Image
            alt="Metamask Wallet"
            src="/images/home/entrance/metamask-logo.png"
            width={98}
            height={118}
            className="h-[63.4%] w-auto md:h-[118px]"
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 hidden md:group-hover:block">
          <div className="flex flex-col w-full h-full">
            <Link href="https://metamask.io/" target="_blank" className="h-[50%]">
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/entrance/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/entrance/logo_bg_ic_arrow_hover.svg')]" />
                {text.open_wallet}
              </div>
            </Link>
            <div className="h-[50%] cursor-pointer" onClick={()=>handleClick("Metamask")}>
              <div className="group/item flex flex-col h-full justify-center items-center text-white hover:text-cred">
                <div className="w-[16px] h-[16px] bg-[url('/images/home/entrance/logo_bg_ic_arrow_nor.svg')] group-hover/item:bg-[url('/images/home/entrance/logo_bg_ic_arrow_hover.svg')]" />
                {text.buy_tutorial}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* www.xt.com */}
      <Link
        href="https://www.xt.com/zh-CN/trade/avav_usdt"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="Xt.com"
          src="/images/home/entrance/xt.com-logo.png"
          width={132}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      {/* www.orangex.com */}
      <Link
        href="https://www.orangex.com/zh-tw/spot/AVAV-USDT-SPOT"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="orangex.com"
          src="/images/home/entrance/orangex-logo.png"
          width={132}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      {/* ascendex.com */}
      <Link
        href="https://ascendex.com/en/cashtrade-spottrading/usdt/avav"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="ascendex.com"
          src="/images/home/entrance/ascendex-logo.png"
          width={132}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      {/* lbank.com */}
      <Link
        href="https://www.lbank.com/trade/avav_usdt/"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="lbank.com"
          src="/images/home/entrance/lbank-logo.png"
          width={132}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>

      {/* CoinW */}
      <Link
        href="https://www.coinw.com/frontSpot/h5/trading?symbol=1660"
        target="_blank"
        className="site-link relative"
      >
        <Image
          alt="coinw.com"
          src="/images/home/entrance/coinw-logo.png"
          width={125}
          height={118}
          className="h-[63.4%] w-auto md:h-[118px]"
        />
        <Image alt="trading" src="/images/home/entrance/logo_ic_Trading.svg" width={18} height={18} className="absolute w-[18px] h-[18px] top-2 left-2" />
      </Link>
    </div>
  );
}
