import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Logo from "@/layouts/components/Logo";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";
import { useRef, useState } from "react";
import useOutsideAlerter from "@/hooks/useOutsideAlterter";

const Footer = () => {
  const { locale, setLocale } = useTranslation();
  const { footer } = menu;
  const [isTMenu, setTMenu] = useState(false);
  const menuRef = useRef(null);
  useOutsideAlerter(menuRef, setTMenu);

  return (
    <footer className="bg-black">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center pt-4 md:pt-8">
          <Logo lang={locale}/>
        </div>
        <div className="w-full h-[1px] bg-[#1b1b1b]" />
        <div className="flex flex-col md:flex-row justify-center pb-6 md:py-6 md:gap-20 lg:px-20">
          <div className="flex flex-row justify-between px-10 sm:px-16 md:px-20 mt-4 md:mt-0 leading-8 w-full">
            <div className="flex-col">
              <h6>Socials</h6>
              <div className="flex flex-col">
                <div className="relative inline-block">
                  <button className="border-none hover:text-white" onClick={()=>setTMenu(true)}>Telegram</button>
                  {isTMenu &&
                  <div className="absolute bottom-[30px] bg-[#0f0f0f] min-w-[230px] min-h-[200px] rounded-lg border-[#2f2f2f] border-2 px-[14px] py-1 text-[16px]" ref={menuRef}>
                  {footer.telegram.map((item, index) =>{
                    return(<Link key={index} href={item.url} target="_blank" className="block hover:text-white active:text-white leading-8">
                    {item.name}
                  </Link>)
                  })}
                </div>
                  }
                </div>
                <Link href="https://x.com/avavcommunity" target="_blank" className="hover:text-white">
                  Twitter
                </Link>
                <Link href="https://discord.gg/Rn7ArXbD" target="_blank" className="hover:text-white">
                  Discord
                </Link>
                <Link
                  href="https://medium.com/@pr_86854/avav-beyond-hype-the-first-practical-inscription-token-9f36e992137a"
                  target="_blank"
                  className="hover:text-white"
                >
                  Medium
                </Link>
              </div>
            </div>
            <div className="flex-col">
              <h6>More</h6>
              <div className="flex flex-col">
                <Link
                  href="https://docs.avascriptions.com/developer-service/asc-20"
                  target="_blank"  className="hover:text-white"
                >
                  API Doc
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:min-w-[250px] flex justify-center md:justify-end md:items-start">
            <h4 className="text-cred">▲▼▲▼</h4>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
