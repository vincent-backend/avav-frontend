import data from "@/content/timeline.json";

export default function HistoryTimeline() {
  let direction = "";
  return (
    <>
      <div className="timeline">
        {data.map((bloc, index) => {
          direction = direction === "left" ? "right" : "left";
          return <TimeLineBloc data={bloc} direction={direction} key={index} />;
        })}
      </div>
    </>
  );
}

function TimeLineBloc({ data, direction }) {
  return (
    <div className={`container ${direction}`}>
      <article className="content">
        <h3>{data.date}</h3>
        <p>{data.content}</p>
      </article>
    </div>
  );
}
