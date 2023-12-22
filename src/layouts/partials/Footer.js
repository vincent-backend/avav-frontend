import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Logo from "@/layouts/components/Logo";
import Link from "next/link";

const Footer = () => {
  const { email} = config.contact_info;
  return (
    <footer className="bg-black">
      <div className="container">

        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center pt-8">
          <Logo />
          <p className="text-white md:text-dark">{email}</p>
        </div>
        <div className="w-full h-[1px] bg-[#1b1b1b]" />
        <div className="flex flex-col lg:flex-row pb-6 md:py-6">
          <div className="w-full flex flex-col md:flex-row md:py-6">
            <div className="animate mt-8 md:mt-0 w-full leading-8">
              <h6>Contact</h6>
              <div className="flex flex-col">
                <a href="">Dextools</a>
                <a href="">BaseScan</a>
              </div>
            </div>
            <div className="animate mt-8 md:mt-0 w-full leading-8">
              <h6>Socials</h6>
              <div className="flex flex-col">
                <a href="">Telegram</a>
                <a href="">Twitter</a>
                <a href="">FriendTech</a>
                <a href="">Medium</a>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:py-6 leading-8">
            <div className="animate mt-8 md:mt-0 w-full">
              <h6>More</h6>
              <div className="flex flex-col">
                <a href="">$avav Tools</a>
                <a href="">Contact</a>
              </div>
            </div>
            <div className="animate mt-8 md:mt-0 w-full md:min-w-[350px]">
              <h4 className="font-third text-center lg:text-right">Proudly Based Worldwide.</h4>
              <div className="flex flex-row text-center lg:text-right justify-center lg:justify-end">
                <h6 className="md:max-w-[283px] break-all text-text">0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;