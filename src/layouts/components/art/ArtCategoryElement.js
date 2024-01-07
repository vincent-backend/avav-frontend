
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";

import config from "@/config/config.json";
import useTranslation from "@/hooks/useTranslation";

function ArtCategoryElement({category, votes}) {
    const { locale } = useTranslation();
    const { api_root } = config.general;

    const c_vote = votes[0] < 1000 ? votes[0] : "999+";

    const addVote = async () => {
        try {
            const response = await fetch(api_root + vote, { 
                method: 'PUT', 
                headers: { 
                  'Content-type': 'application/json'
                }
              });
        }
        catch {
            console.log("API Server Connection Failed.");
        }
    }

    return(
    <div className="group art-element">
        <div className="w-full h-2/5 relative">
            <Link href={`/arts/photo-list?category=${category.id}`}>
                <Image alt={category.name[locale]} title={category.name[locale]} src={`/images/art/category/${category.id}/thumb.png`} width={86} height={86} className="absolute bottom-0 left-[calc(50%-43px)] rounded-full" />
            </Link>
        </div>
        <div className="w-full h-3/5 flex justify-center md:pt-6 relative">
            <p className="text-white font-primary text-[14px] md:text-[18px] group-hover:text-cred group-active:text-cred break-all">{category.name[locale]}</p>
            <div className="absolute w-full md:w-4/5 h-[38px] bottom-0 md:bottom-6 bg-[#FD2C2F] text-white cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-100 ease-linear"
                    onClick={()=>addVote()}>
                <div className="flex flex-row w-full h-full items-center justify-center gap-1">
                    <Image alt="thumb" src="/images/art/pic_hover_ic_vote.svg" width={16} height={16} />
                    <p className="font-primary text-[14px] text-white">{`Vote (${c_vote})`}</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export {ArtCategoryElement};