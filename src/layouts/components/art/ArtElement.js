
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import config from "@/config/config.json";

function ArtElement({img, vote, votes, caption, link_url}) {

    const {api_root} = config.general;

    const c_vote = votes[vote] < 1000 ? votes[vote] : "999+";

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
            <Image alt={caption} src={`/images/art/${img}.png`} width={86} height={86} className="absolute bottom-0 left-[calc(50%-43px)]" />
        </div>
        <div className="w-full h-3/5 flex justify-center md:pt-6 relative">
            <p className="text-white font-primary text-[18px] group-hover:text-cred group-active:text-cred">{caption}</p>
            <Link href={link_url} className="absolute w-full md:w-4/5 h-[38px] bottom-0 md:bottom-6 bg-[#FD2C2F] text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-100 ease-linear"
                    onClick={()=>addVote()}>
                <div className="flex flex-row w-full h-full items-center justify-center gap-1">
                    <Image alt="thumb" src="/images/art/pic_hover_ic_vote.svg" width={16} height={16} />
                    <p className="font-primary text-[14px] text-white">{`Vote (${c_vote})`}</p>
                </div>
            </Link>
        </div>
    </div>
    );
}

function AccessRightElement({img, caption, link_url}) {
    return(
        <Link href={link_url} className="max-w-[calc(50vw-28px)] aspect-[0.7533] md:aspect-auto md:w-[226px] md:h-[300px]">
            <Image alt={caption} title={caption} src={`/images/art/access_right/${img}.png`} width={226} height={300} className="w-full" />
        </Link>
    );
}


export {ArtElement, AccessRightElement};