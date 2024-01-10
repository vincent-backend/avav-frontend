import Base from "@/layouts/Baseof";
import useTranslation from "@/hooks/useTranslation";
import artcategory from "@/config/art_category.json";
import PhotoListElement from "@/layouts/components/art/PhotoListElement";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";

export default function PhotoList() {
  const { locale } = useTranslation();

  const searchParams = useSearchParams();
  const id = searchParams.get("category");
  const category = artcategory[id-1];
  const filecount = category ? category.filecount : 0;
  const filelist = Array.from({length: filecount}, (_, i) => i + 1);

  return (
    <Base>
      <Image
        alt="background"
        src="/images/tutorial/bg_top_pic.svg"
        width={1921}
        height={1080}
        className="-z-10 absolute w-full h-full top-0 left-0"
      ></Image>
      {/* Main content */}
      <section className="container mt-[90px] md:mt-[140px] mb-[50px] md:mb-[112px] md:min-h-[calc(100vh-480px)]">
        <div className="flex flex-row justify-start items-center">
          <Link href="/art" className="me-1">
            <Image alt="back" src="/images/nav/home_nav_ic_back.svg" width={40} height={40} priority className="md:w-[50px] md:h-[50px]"/>
          </Link>
          <h3  className={clsx("text-cred",
              locale == "en" && "font-secondary",
              locale != "en" && "font-primary font-bold"
            )}>
            {category &&
            category.name[locale]
            }
          </h3>
        </div>
        <div className="mt-[25px] mb-[25px] md:mt-[50px] md:mb-[50px] flex flex-wrap justify-between md:justify-normal gap-x-[12px] md:gap-x-4 gap-y-2 md:gap-y-4">
          {category && 
          filelist.map((f, index)=>(
            <div key={index} className="cursor-pointer">
              <PhotoListElement name={category.name[locale]} src={`/images/art/category/${id}/pic_${f}.png`} />
            </div>
          ))
          }
        </div>
      </section>
    </Base>
  );
}

