import Image from "next/image";
import { markdownify } from "@/lib/utils/textConverter";

const Intro = ({ page, handleAddrCopy }) => {
  return (
    <>
      <div id="intro" className="pb-5">
        <p className="found-subtitle">{page.intro}</p>
        {markdownify(page.intro_des, "", "found-description")}
        <p className="text-cred font-[500]">{page.intro_donation}</p>
        <div className="mt-3 flex flex-col md:flex-row items-center">
          <div className="relative flex flex-row items-center justify-between h-[60px] md:h-[70px] bg-[#1A1C1F] mt-4 md:mt-0">
            <p className="text-white font-primary text-[14px] px-[10px] md:px-[20px] break-all">
              {page.donate_addr}
            </p>
            <button
              className="bg-cred min-w-[60px] md:w-[70px] h-full pl-[18px] md:pl-[22px]"
              onClick={() => handleAddrCopy()}
            >
              <Image
                alt="copy"
                src="/images/footer/copy_nor.svg"
                width={22}
                height={22}
              />
            </button>
          </div>
        </div>
      </div>
      <div id="rescue_object" className="pb-10">
        <p className="found-subtitle">{page.rescue_object}</p>
        {markdownify(page.rescue_object_des, "", "found-description")}
      </div>
      <div id="rescue_terms" className="pb-10">
        <p className="found-subtitle">{page.rescue_terms}</p>
        <ul>
          <li className="flex flex-row items-start text-white">
            <Image
              alt="list-symbol"
              src="/images/foundation/ellipse.svg"
              width={7}
              height={7}
              className="mt-[10px] mr-2"
            />
            {page.terms_1}
          </li>
          <li className="flex flex-row items-start text-white">
            <Image
              alt="list-symbol"
              src="/images/foundation/ellipse.svg"
              width={7}
              height={7}
              className="mt-[10px] mr-2"
            />
            {page.terms_2}
          </li>
          <li className="flex flex-row items-start text-white">
            <Image
              alt="list-symbol"
              src="/images/foundation/ellipse.svg"
              width={7}
              height={7}
              className="mt-[10px] mr-2"
            />
            {page.terms_3}
          </li>
          <li className="flex flex-row items-start text-white">
            <Image
              alt="list-symbol"
              src="/images/foundation/ellipse.svg"
              width={7}
              height={7}
              className="mt-[10px] mr-2"
            />
            {page.terms_4}
          </li>
        </ul>
      </div>
      <div id="contact_info" className="pb-10">
        <p className="found-subtitle">{page.contact_info}</p>
        {markdownify(page.contact_info_des, "", "found-description")}
      </div>
    </>
  );
};

const Constitution = ({ page }) => {
  return (
    <>
      <div>
        <p className="found-subtitle">{page.introduction}</p>
        <p className="text-[16px] md:text-[20px] text-white font-semibold pt-3">
          {page.introduction_subtitle}
        </p>
        {markdownify(
          page.introduction_des,
          "",
          "text-base text-white leading-5"
        )}
      </div>
      <div className="mt-[30px] md:mt-[50px]">
        <p className="found-subtitle">{page.purpose}</p>
        {markdownify(page.purpose_des, "", "")}
      </div>
      {/* Management */}
      <div className="mt-[30px] md:mt-[50px]">
        <p className="found-subtitle">{page.manage}</p>
        <div className="w-full overflow-x-auto">
            {markdownify(page.manage_des, "", "pt-3")}
        </div>
      </div>
      {/* Operation */}
      <div className="mt-[30px] md:mt-[50px]">
        <p className="found-subtitle">{page.operation}</p>
        {markdownify(page.operation_des, "", "")}
      </div>
      {/* Amendment */}
      <div className="mt-[30px] md:mt-[50px]">
        <p className="found-subtitle">{page.amendment}</p>
        {markdownify(page.amendment_des, "", "")}
      </div>
      {/* Conclusion */}
      <div className="mt-[30px] md:mt-[50px]">
        <p className="found-subtitle">{page.conclusion}</p>
        {markdownify(page.conclusion_des, "", "")}
      </div>
    </>
  );
};

export { Intro, Constitution };
