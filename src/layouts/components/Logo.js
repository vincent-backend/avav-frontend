import ImageFallback from "./ImageFallback";
import config from "@/config/config.json";
import Link from "next/link";

const Logo = ({ src, lang }) => {
  // destructuring items from config object
  const { logo, width, height, title } = config.site;

  return (
    <Link href={`/`} className="navbar-brand block">
      <div className="flex flex-row items-center h-[60px]">
        <ImageFallback
          width={36}
          height={36}
          src={src ? src : logo}
          alt={title}
          priority
          className={`min-w-[36px] min-h-[36px]`}
        />
      </div>
    </Link>
  );
};

export default Logo;
