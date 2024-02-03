import data from "@/content/timeline.json";
import useTranslation from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

export default function HistoryTimeline() {
  let direction = "";
  const { locale, setLocale } = useTranslation();
  const [itemLimit, setItemLimit] = useState(10);
  const [items, setItems] = useState(data[locale]);

  const handleMore = () => {
    if (items.length - itemLimit > 10) setItemLimit(itemLimit + 10);
    else setItemLimit(items.length);
  }

  useEffect(() => {
    setItems(data[locale]);
  }, [locale]);

  return (
    <div className="mt-5 md:mt-[50px]">
      <div className="timeline">
        {items.slice(0, itemLimit).map((bloc, index) => {
          direction = direction === "left" ? "right" : "left";
          return <TimeLineBloc data={bloc} direction={direction} key={index} />;
        })}
      </div>
      {itemLimit < items.length &&
        <div className="text-white text-[14px] md:text-[18px] font-secondary cursor-pointer" onClick={handleMore}>More...</div>
      }
      
    </div>
  );
}

function TimeLineBloc({ data, direction }) {
  if (direction == "left") {
    return (
      <div className="flex flex-col md:flex-row-reverse justify-between items-center w-full">
        <p className="w-full pl-[40px] text-cred font-primary font-bold text-left text-[18px] md:text-[26px]">{data.date}</p>
        <div className="relative w-full">
          <p className="text-[14px] md:text-[14px] text-white font-primary text-left md:text-right bg-[#1A1C1F] rounded-md p-3 md:p-5 ml-[40px] md:ml-0 md:mr-[28px]">{data.content}</p>
          <div className="absolute w-[11px] h-[20px] left-[31px] md:left-auto md:right-[19px] top-[calc(50%-10px)] bg-no-repeat bg-[url('/images/home/about_card_ic_arrow_left.svg')] md:bg-[url('/images/home/about_card_ic_arrow_right.svg')] " />
          <div className="bg-cred w-[14px] h-[14px] rounded-full absolute left-[13px] right-auto md:left-auto md:right-[-17px] top-[calc(50%-7px)]" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <p className="w-full pl-[40px] md:pl-0 md:pr-[45px] text-cred font-primary font-bold text-left md:text-right text-[18px] md:text-[26px]">{data.date}</p>
        <div className="relative w-full">
          <p className="text-[14px] md:text-[14px] text-white font-primary text-left bg-[#1A1C1F] rounded-md p-3 md:p-5 ml-[40px] md:ml-[25px]">{data.content}</p>
          <div className="absolute w-[11px] h-[20px] left-[31px] md:left-[15px] top-[calc(50%-10px)] bg-no-repeat bg-[url('/images/home/about_card_ic_arrow_left.svg')] " />
          <div className="bg-cred w-[14px] h-[14px] rounded-full absolute left-[13px] right-auto md:left-[-18px] top-[calc(50%-7px)]" />
        </div>
      </div>
    );
  }
}