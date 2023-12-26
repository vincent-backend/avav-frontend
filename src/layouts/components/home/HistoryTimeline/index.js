import data from "@/content/timeline.json";
import useTranslation from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

export default function HistoryTimeline() {
  let direction = "";
  const {locale, setLocale} = useTranslation();
  
  const [items, setItems] = useState(data[locale]);
  console.log(items)

  useEffect(()=>{
    setItems(data[locale]);
  },[locale]);

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
  return (
    <div className={`timeline-container ${direction}`}>
      <article className="content">
        <h4 className="font-primary font-bold">{data.date}</h4>
        <p className="font-primary">{data.content}</p>
      </article>
    </div>
  );
}
