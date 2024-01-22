import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function LogoAnimation () {
    
    const [logoImgId, setLogoImgId] = useState(0);
    const t_data = [...Array(59).keys()];
    const [frames, setFrames] = useState(t_data);

    /*
    const updateImageId = () => {
        var t_id = logoImgId + 1;
        if (t_id > 59) t_id=0;
        setLogoImgId(t_id);
    }
    */

    const timer = setTimeout(() => {
      //  updateImageId()
     }, 100);

     useEffect(()=>{
        //return clearTimeout(timer);
     });

    return(
        <div className={`w-full aspect-square md:w-[750px]`}>
            <Image alt="img" className="hidden" src="/images/home/logo/0.png" width={750} height={750} />
        </div>
    );
}
