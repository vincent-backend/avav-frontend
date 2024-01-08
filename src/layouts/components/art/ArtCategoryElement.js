
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import config from "@/config/config.json";
import useTranslation from "@/hooks/useTranslation";

function ArtCategoryElement({category, votes}) {
    const { locale } = useTranslation();
    const { api_root } = config.general;

    const [vote, setVote] = useState(votes[`vote_` + category.id] === undefined ? 0 : votes[`vote_` + category.id] >= 1000 ? "999+" : votes[`vote_` + category.id]);

    useEffect(() => {
        setVote(votes[`vote_` + category.id] === undefined ? 0 : votes[`vote_` + category.id] >= 1000 ? "999+" : votes[`vote_` + category.id]);
      }, [votes]);

    const addVote = async () => {
        try {
            const response = await fetch(api_root + category.id, { 
                method: 'PUT', 
                headers: { 
                  'Content-type': 'application/json'
                }
              });
            const data = await response.json();
            setVote(data[`vote_` + category.id] === undefined ? 0 : data[`vote_` + category.id] >= 1000 ? "999+" : data[`vote_` + category.id]);
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
            <Link href={`/arts/photo-list?category=${category.id}`}>
                <div className="w-[16px] h-[16px] absolute right-3 top-3 md:right-4 md:top-4 bg-[url('/images/home/logo_bg_ic_arrow_nor.svg')] group-hover:bg-[url('/images/home/logo_bg_ic_arrow_hover.svg')]" />
            </Link>
        </div>
        <div className="w-full h-3/5 flex justify-center md:pt-6 relative">
            <p className="text-white font-primary text-[14px] md:text-[18px] group-hover:text-cred group-active:text-cred break-all">{category.name[locale]}</p>
            <div className="absolute w-full md:w-4/5 h-[38px] bottom-0 md:bottom-6 bg-[#FD2C2F] text-white cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-100 ease-linear"
                    onClick={()=>addVote()}>
                <div className="w-full h-full relative">
                    <p className="absolute w-full top-0 font-primary text-[14px] leading-[38px] text-white text-center">
                        <Image alt="thumb" src="/images/art/pic_hover_ic_vote.svg" width={16} height={16} className={clsx("inline-block me-1")} />
                        {`Vote (${vote})`}
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
}

export {ArtCategoryElement};