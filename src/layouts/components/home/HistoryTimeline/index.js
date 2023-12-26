import data from "@/content/timeline.json";
import useTranslation from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

export default function HistoryTimeline() {
  let direction = "";
  const { locale, setLocale } = useTranslation();

  const [items, setItems] = useState(data[locale]);

  useEffect(() => {
    setItems(data[locale]);
  }, [locale]);

  return (
    <div className="mt-5 md:mt-10">
      <div className="timeline">
        {items.map((bloc, index) => {
          direction = direction === "left" ? "right" : "left";
          return <TimeLineBloc data={bloc} direction={direction} key={index} />;
        })}
      </div>
    </div>
  );
}

function TimeLineBloc({ data, direction }) {
  if (direction == "left") {
    return (
      <div className="flex flex-col md:flex-row-reverse justify-between items-center w-full">
        <p className="w-full pl-[40px] text-cred font-primary font-bold text-left text-[18px] md:text-[30px]">
          {data.date}
        </p>
        <div className="relative w-full">
          <p className="text-[16px] text-white font-primary text-left md:text-right bg-[#1A1C1F] rounded-md p-5 ml-[40px] md:ml-0 md:mr-[28px]">{data.content}</p>
          <div className="absolute w-[11px] h-[20px] left-[31px] md:left-auto md:right-[19px] top-[calc(50%-10px)] bg-no-repeat bg-[url('/images/home/about_card_ic_arrow_left.svg')] md:bg-[url('/images/home/about_card_ic_arrow_right.svg')] " />
          <div className="bg-cred w-[14px] h-[14px] rounded-full absolute left-[13px] right-auto md:left-auto md:right-[-18px] top-[calc(50%-7px)]" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <p className="w-full pl-[40px] md:pl-0 md:pr-[45px] text-cred font-primary font-bold text-left md:text-right text-[18px] md:text-[30px]">
          {data.date}
        </p>
        <div className="relative w-full">
          <p className="text-[16px] text-white font-primary text-left bg-[#1A1C1F] rounded-md p-5 ml-[40px] md:ml-[25px]">{data.content}</p>
          <div className="absolute w-[11px] h-[20px] left-[31px] md:left-[15px] top-[calc(50%-10px)] bg-no-repeat bg-[url('/images/home/about_card_ic_arrow_left.svg')] " />
          <div className="bg-cred w-[14px] h-[14px] rounded-full absolute left-[13px] right-auto md:left-[-18px] top-[calc(50%-7px)]" />
        </div>
      </div>
    );
  }
}
