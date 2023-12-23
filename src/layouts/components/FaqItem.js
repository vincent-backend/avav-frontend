import React, { useState } from "react";
import { markdownify } from "@/lib/utils/textConverter";

const FaqItem = ({ faq, active, handleToggle }) => {
  const { question, id, answer } = faq;

  return (
    <div className="py-2">
      <h5>
        <button
          type="button"
          className="flex items-center justify-between w-full text-left text-[16px] md:text-[20px] py-2"
          onClick={() => handleToggle(id)}
          aria-expanded={active}
          aria-controls="faqs-text-01"
        >
          
        <span>
        <svg
            width="10px"
            height="10px"
            viewBox="0 0 10 10"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block mr-2 md:mr-3"
          >
            <g
              id="页面-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="$avav_Home"
                transform="translate(-359.000000, -4024.000000)"
                fill="#FD2C2F"
              >
                <g id="4" transform="translate(359.000000, 3918.000000)">
                  <g id="1" transform="translate(0.000000, 97.000000)">
                    <g
                      id="FAQS_list_point"
                      transform="translate(0.000000, 9.000000)"
                    >
                      <rect
                        id="矩形"
                        transform="translate(4.242641, 5.000000) rotate(-315.000000) translate(-4.242641, -5.000000) "
                        x="1.24264069"
                        y="2"
                        width="6"
                        height="6"
                      ></rect>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
            {question}
        </span>
          <svg
            className="fill-white shrink-0 ml-8"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                active !== id ? "" : "!rotate-180"
              }`}
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                active !== id ? "" : "!rotate-180"
              }`}
            />
          </svg>
        </button>
      </h5>
      <div
        id="faqs-text-01"
        role="region"
        aria-labelledby="faqs-title-01"
        className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
          active === id
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-3">
            {markdownify(answer, "h6", " font-primary text-text text-[16px] leading-[24px]")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
