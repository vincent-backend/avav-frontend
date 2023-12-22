import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Logo from "@/layouts/components/Logo";
import Link from "next/link";

const Footer = () => {
  const { email } = config.contact_info;
  return (
    <footer className="bg-black">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center pt-4 md:pt-8">
          <Logo />
        </div>
        <div className="w-full h-[1px] bg-[#1b1b1b]" />
        <div className="flex flex-col md:flex-row justify-center pb-6 md:py-6 md:gap-20">
          <div className="flex flex-row justify-center flex-grow-1 mt-4 md:mt-0 leading-8">
            <div className="min-w-[150px]">
              <h6>Socials</h6>
              <div className="flex flex-col">
                <Link href="https://t.me/AVAV_official">Telegram</Link>
                <Link href="https://x.com/avavcommunity">Twitter</Link>
                <Link href="https://medium.com/">Medium</Link>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:min-w-[350px]">
            <h4 className="font-third text-center lg:text-right">
              Proudly Based Worldwide.
            </h4>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
