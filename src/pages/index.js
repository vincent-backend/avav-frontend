import Base from "@/layouts/Baseof";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Base>
    {/*background*/}
    <div className="absolute w-full h-[635px] md:h-full bg-cover bg-center bg-[url('/images/home/bg_top_pic.png')] md:bg-[url('/images/home/md/bg_top_pic.png')] -z-10" />
    <div className="absolute w-[50%] md:w-[358px] h-[670px] bg-contain bg-no-repeat bg-[url('/images/home/top_left_line.svg')] -z-10" />
    <div className="absolute w-[661px] md:w-[1100px] h-[995px] md:h-[1658px] top-[700px] md:top-[389px] right-0 bg-[url('/images/home/bg_right_light.svg')] md:bg-[url('/images/home/md/bg_right_light.svg')] opacity-70 -z-10" />
    <div className="absolute w-[306px] h-[804px] md:w-[706px] top-[1070px] md:top-[1611px] left-0 bg-[url('/images/home/line.png')] md:bg-[url('/images/home/md/line.png')] -z-10" />
    <div className="absolute w-[100%] md:w-[840px] h-[566px] top-[1760px] md:top-[2820px] right-0 bg-contain bg-no-repeat bg-[url('/images/home/bg_Decoration_2.svg')] md:bg-[url('/images/home/md/bg_Decoration_2.svg')] -z-10" />
    <div className="absolute w-[234px] h-[430px] top-[3220px] md:top-[4086px] right-0 bg-[url('/images/home/bg_Decoration_3.png')]" />    
    <div className="container pt-[110px] md:pt-[254px] min-h-[5000px]">
      {/* Banner */}
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col justify-start w-full">
          <h2 className="whitespace-nowrap">Welcome To</h2>
          <h1 className="text-cred">$AVAV</h1>
          <p className="mt-[20px] md:mt-[136px] text-white leading-6">A Very Amazing Victory. A very amazing victory<br></br>
             $AVAV was the first inscriptions meme of Avalanche Ecology to receive a diamond badge, with a trading volume of 500,000 AVAX in three days.
             The inscription takes more than 1 month from the beginning to the end of the inscription, and holds more than 50,000 coins
          </p>
          <Link href="/" className="bg-[url('/images/home/banner_btn_bg.svg')] w-[200px] h-[50px] text-center text-white leading-[50px] mt-[20px] md:mt-[30px]">Connect To AVAX</Link>
        </div>
        <div className="max-w-[670px] w-full relative">
          <Image alt="banner-img" src="/images/home/top_graph.png" resizemode={'contain'} width={650} height={758}/>
          <Link href="/" className="absolute md:hidden right-[2%] sm:right-[3%] bottom-[30%] w-[50px] h-[50px] bg-contain bg-no-repeat bg-[url('/images/home/arrow.svg')]" />
        </div>
      </div>
      {/* Site Link */}
      <div className="flex flex-col gap-4 mt-[24px] md:mt-[60px]">
        <div className="flex flex-row gap-4 justify-center lg:justify-start">
          <Link href="/" className="site-link">

          </Link>
          <Link href="/" className="site-link">

          </Link>
          <Link href="/" className="site-link">

          </Link>
        </div>
        <div className="flex flex-row gap-4 justify-center lg:justify-start lg:ml-[210px]">
          <Link href="/" className="site-link">

          </Link>
          <Link href="/" className="site-link">

          </Link>
          <Link href="/" className="site-link">

          </Link>
        </div>
      </div>
    </div>
    </Base>
  )
}
