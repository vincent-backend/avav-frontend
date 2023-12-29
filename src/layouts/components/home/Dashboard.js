import json_dashboard from "@/content/dashboard.json";

import clsx from "clsx";

export default function Dashboard() {
  const { dashboard } = json_dashboard;

  return (
    <section className="animate container mt-10 lg:mt-40">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:mx-10">
        <div className="flex flex-col mt-4 lg:mt-0 justify-center">
          <div className="font-secondary text-cred text-[30px] lg:text-[50px] text-center">{dashboard[0].content}</div>
          <div className="font-primary text-white text-[18px] lg:text-[24px] text-center">{dashboard[0].description}</div>
        </div>

        <div className="hidden lg:flex min-w-[1px] min-h-[90px] my-auto bg-[#292929]" />

        <div className="flex flex-col mt-4 lg:mt-0 justify-center">
          <div className="font-secondary text-cred text-[30px] lg:text-[50px] text-center">{dashboard[1].content}</div>
          <div className="font-primary text-white text-[18px] lg:text-[24px] text-center">{dashboard[1].description}</div>
        </div>

        <div className="hidden lg:flex min-w-[1px] min-h-[90px] my-auto bg-[#292929]" />

        <div className="flex flex-col mt-4 lg:mt-0 justify-center">
          <div className="font-secondary text-cred text-[30px] lg:text-[50px] text-center">{dashboard[2].content}</div>
          <div className="font-primary text-white text-[18px] lg:text-[24px] text-center">{dashboard[2].description}</div>
        </div>
      </div>
    </section>
  );
}
