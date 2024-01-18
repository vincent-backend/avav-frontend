import json_dashboard from "@/content/dashboard.json";

import Image from "next/image";
import clsx from "clsx";

export default function Dashboard() {
  const { dashboard } = json_dashboard;

  return (
    <section className="animate container max-w-[770px] mt-12 lg:mt-[80px]">
      <div className="flex flex-row md:flex-row-reverse justify-center lg:justify-between items-center lg:mx-10 gap-[20px] md:gap-[56px]">
        <Image alt="dashboard_flag" src="/images/home/dashboard.gif" width={200} height={460} className="h-[280px] md:h-[460px] w-auto"/>
        <div className="flex flex-col gap-4 md:gap-9">
          <div className="flex flex-col justify-start md:justify-center">
            <div className="font-secondary text-cred text-[30px] leading-8 md:leading-normal md:text-[50px] md:text-center">
              {dashboard[0].content}
            </div>
            <div className="font-primary text-white text-[18px] md:text-[24px] md:text-center">
              {dashboard[0].description}
            </div>
          </div>

          <div className="flex flex-col justify-start md:justify-center">
            <div className="font-secondary text-cred text-[30px] leading-8 md:leading-normal md:text-[50px] md:text-center">
              {dashboard[1].content}
            </div>
            <div className="font-primary text-white text-[18px] md:text-[24px] md:text-center">
              {dashboard[1].description}
            </div>
          </div>

          <div className="flex flex-col justify-start md:justify-center">
            <div className="font-secondary text-cred text-[30px] leading-8 md:leading-normal md:text-[50px] md:text-center">
              {dashboard[2].content}
            </div>
            <div className="font-primary text-white text-[18px] md:text-[24px] md:text-center">
              {dashboard[2].description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
