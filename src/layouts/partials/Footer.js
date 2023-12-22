import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Logo from "@/layouts/components/Logo";
import Link from "next/link";

const Footer = () => {
  const { email } = config.contact_info;
  return (
    <footer className="bg-black">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center pt-8">
          <Logo />
          <Link href={`mailto:${email}`} className="text-white md:text-dark">
            {email}
          </Link>
        </div>
        <div className="w-full h-[1px] bg-[#1b1b1b]" />
        <div className="flex flex-col md:flex-row justify-center pb-6 md:py-6 md:gap-20">
          <div className="flex flex-row justify-center">
            <div className="mt-8 md:mt-0 min-w-[150px] leading-8">
              <h6>Socials</h6>
              <div className="flex flex-col">
                <a href="https://t.me/AVAV_official">Telegram</a>
                <a href="https://x.com/avavcommunity">Twitter</a>
                <a href="https://www.friend.tech/">FriendTech</a>
                <a href="https://medium.com/">Medium</a>
              </div>
            </div>

            <div className="mt-8 md:mt-0 min-w-[150px] leading-8">
              <h6>More</h6>
              <div className="flex flex-col">
                <a href="">$avav Tools</a>
                <a href="">Contact</a>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:min-w-[350px]">
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
