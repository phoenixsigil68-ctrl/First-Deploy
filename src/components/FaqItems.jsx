import React from "react";
import { useState } from "react";
import clsx from "clsx";
import SlideDown from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

export const FaqItems = ({ faq, index }) => {
  const [activeId, setActiveId] = useState(null);
  const active = activeId === faq.id;

  return (
    <div className="relative z-2 mb-16">
      <div
        className="group relative flex cursor-pointer justify-between gap-10 px-7 items-center"
        onClick={() => {
          setActiveId(activeId === faq.id ? null : faq.id);
        }}
      >
        <div className="flex gap-5 items-center flex-1">
          <div className="mb-1.5 text-p3 text-3xl font-bold ">
            {faq.id < 10 ? "0" : ""}
            {faq.id}
          </div>
          <div
            className={
              active
                ? "text-3xl font-bold transition-colors duration-300 text-p1"
                : "text-3xl font-bold transition-colors duration-300 text-p4"
            }
          >
            {faq.question}
          </div>
        </div>
        <div
          className={clsx(
            "faq-icon relative flex justify-center items-center border-2 border-s2 rounded-full transition-all duration-500 shadow-400 size-12",
            active && "before:bg-p1 after:rotate-180 after:bg-p1"
          )}
        >
          <div className="g4 size-11/12 rounded-full shadow-300 " />
        </div>
      </div>
      <SlideDown>
        {activeId === faq.id && (
          <div className="body-3 text-p4 px-20 py-3.5">{faq.answer}</div>
        )}
      </SlideDown>
    </div>
  );
};
