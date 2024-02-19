import Base from "@/layouts/Baseof";
import eventdata from "@/content/bigevent.json";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Loading from "@/layouts/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDataFromContent } from "@/lib/contentParser";
import useTranslation from "@/hooks/useTranslation";
import { markdownify } from "@/lib/utils/textConverter";
import clsx from "clsx";
import Link from "next/link";
import Paginations from "@/layouts/components/Paginations";

const BigEventRow = ({ row }) => {
  return (
    <div className="flex flex-row w-full justify-between items-center bg-[#FFFFFF] bg-opacity-5 hover:bg-[#FD2C2F] hover:bg-opacity-10 px-4 md:px-[30px] py-2 border-l-[3px] border-l-cred border-t-[1px] border-r-[1px] border-b-[1px] border-[#1b1b1b] hover:border-t-[1px] hover:border-r-[1px] hover:border-b-[1px] hover:border-cred hover:border-opacity-80">
      <div className="flex flex-col gap-[5px] md:gap-[10px]">
        <p className="text-white text-[20px] font-medium leading-tight">{row.name}</p>
        <p className="text-text text-[14px] font-normal">{row.date}</p>
      </div>
      <Link href={row.url} target="_blank">
        <div className="w-4 h-4 bg-[url('/images/bigevent/ic_arrow_nor.svg')] hover:bg-[url('/images/bigevent/ic_arrow_hover.svg')]" />
      </Link>
    </div>
  );
};

export default function Tutorial({ data }) {
  const { locale, setLocale } = useTranslation();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);

  //
  let { page } = frontmatter;
  const [EventItems, setEventItems] = useState(eventdata[locale]);

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(
    Math.ceil(EventItems.length / countPerPage)
  );

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") window.scrollTo({top: 60, behavior: 'smooth'});
  };

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);
    setEventItems(eventdata[locale]);

    const handleStart = (url) => {
      url !== router.asPath && setLoading(true);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [locale, data]);

  return (
    <Base>
      <Image
        alt="background"
        src="/images/tutorial/bg_top_pic.svg"
        width={1921}
        height={1080}
        className="-z-10 absolute top-0 left-0"
      ></Image>
      {/* Main content */}
      {loading ? (
        <Loading />
      ) : (
        <section className="animate container mt-[90px] md:mt-[140px] mb-[60px] md:mb-[100px]">
          <h3
            className={clsx(
              "text-cred",
              locale == "en" && "font-secondary",
              locale != "en" && "font-primary font-bold"
            )}
          >
            {page.title}
          </h3>
          <div className="mt-[30px] md:mt-[50px]">
            <div className="flex flex-col w-full gap-2 md:gap-4">
              {EventItems.slice(
                currentPage * countPerPage,
                (currentPage + 1) * countPerPage
              ).map((d, index) => (
                <BigEventRow key={index} row={d} />
              ))}
            </div>
            <div className="flex flex-col justify-between md:flex-row">
              <div className="my-2 flex whitespace-nowrap">
                Showing {countPerPage * currentPage + 1} to{" "}
                {Math.min((currentPage + 1) * countPerPage, EventItems.length)}{" "}
                of {EventItems.length} entries
              </div>
              <div className="flex w-full justify-center md:justify-end">
                <Paginations
                  pageCount={pageCount}
                  currentPage={currentPage}
                  navigate={handleNavigate}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </Base>
  );
}

// for tutorial data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/mediacolumn");

  return {
    props: {
      data,
    },
  };
};
