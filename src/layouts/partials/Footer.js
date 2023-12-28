import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Logo from "@/layouts/components/Logo";
import useTranslation from "@/hooks/useTranslation";
import useOutsideAlerter from "@/hooks/useOutsideAlterter";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const { locale, setLocale } = useTranslation();
  const { footer } = menu;
  const [isTMenu, setTMenu] = useState(false);
  const menuRef = useRef(null);
  useOutsideAlerter(menuRef, setTMenu);

  useEffect(()=>{

  },[]);

  return (
    <footer className="bg-black">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center pt-4 md:pt-8">
          <Logo lang={locale} />
          <div className="flex flex-row">
            <h6>https://avav.meme</h6>
            <Image alt="Copy URL" title="Copy URL" src="/images/footer/copy_nor.svg" width={16} height={16} className="ml-2 cursor-pointer"/>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#1b1b1b]" />
        <div className="relative md:flex flex-col md:flex-row justify-center pb-6 md:py-6 md:gap-20">
          <div className="flex flex-col md:flex-row justicy-center mr-0 sm:mr-10 md:mr-20 lg:mr-40 xl:mr-48 mt-4 md:mt-0 leading-8 w-full">
            <div className="flex flex-col justify-center md:justify-start items-center md:items-start w-full">
              <h6>More</h6>
              <div className="flex flex-col">
                {footer.more.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      target="_blank"
                      className="hover:text-white text-center md:text-left"
                    >
                      {item.name[locale]}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col mt-5 md:mt-0 w-full">
              <h6 className="w-full text-center">Socials</h6>
              <div className="flex flex-row items-end justify-center gap-4 mt-2">
                <div className="md:relative w-[28px] h-[28px]">
                  <div
                    className="border-none w-[28px] h-[28px] cursor-pointer bg-[url('/images/footer/bot_ic_1_nor.svg')] hover:bg-[url('/images/footer/bot_ic_1_hover.svg')] transition-all duration-100 ease-in"
                    onClick={() => setTMenu(true)}
                  ></div>
                  <div
                      className={clsx("absolute overflow-y-hidden opacity-0 bg-[#1E2126] w-full md:w-[230px] h-0 rounded-lg border-[#2f2f2f] border-2 px-[14px] py-1 text-[12px] bottom-[10px] md:bottom-[35px] left-0 md:left-[-100px] transition-all duration-200 ease-linear",
                                      isTMenu && "opacity-100 h-[340px]")}
                      ref={menuRef}
                    >
                      {footer.telegram.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            href={item.url}
                            target="_blank"
                            className="block text-white hover:text-cred active:text-cred py-1 border-b-[1px] border-b-[#ffffff] border-opacity-10"
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                </div>
                <Link
                  href="https://x.com/avavcommunity"
                  target="_blank"
                  className="w-[28px] h-[28px] bg-[url('/images/footer/bot_ic_2_nor.svg')] hover:bg-[url('/images/footer/bot_ic_2_hover.svg')] transition-all duration-100 ease-in"
                />
                <Link
                  href="https://discord.gg/Rn7ArXbD"
                  target="_blank"
                  className="w-[28px] h-[28px] bg-[url('/images/footer/bot_ic_3_nor.svg')] hover:bg-[url('/images/footer/bot_ic_3_hover.svg')] transition-all duration-100 ease-in"
                />
                <Link
                  href="https://medium.com/@pr_86854/avav-beyond-hype-the-first-practical-inscription-token-9f36e992137a"
                  target="_blank"
                  className="w-[28px] h-[28px] bg-[url('/images/footer/bot_ic_4_nor.svg')] hover:bg-[url('/images/footer/bot_ic_4_hover.svg')] transition-all duration-100 ease-in"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex justify-center md:justify-end md:items-start">
            <Link href="/" className="text-h4 text-cred">
              ▲▼▲▼
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
