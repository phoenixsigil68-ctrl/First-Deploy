import React from "react";
import { Element } from "react-scroll";
import { faq } from "../constants";
import { FaqItems } from "./FaqItems";

export const Faq = () => {
  const halfLength = Math.floor(faq.length / 2);
  return (
    <section className="mb-10">
      <Element name="faq">
        <div className="container-2 relative z-2 py-20">
          <div className="text-5xl font-bold text-center bg-gradient-to-r from-blue-500 to-pink-800 bg-clip-text text-transparent capitalize">
            You've got questions, we've Got answeres.
          </div>
          {/* <div className="faq-line_after w-0.5 h-full absolute left-[calc(50%-1px)] top-0 -z-1 bg-s2" /> */}
        </div>
        <div className="faq-glow_before relative z-2 border-2 border-s2 bg-s1"></div>
        <div className="faz-glow_before relative z-2 border-2 border-s2 bg-s1">
          <div className="container-2 flex gap-10">
            <div className="rounded-half absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center border-2 border-s2 bg-s1">
              <img src="/images/faq-logo.svg" alt="logo" className="size-1/2" />
            </div>
            <div className="relative flex-1 pt-24">
              {faq.map((item, index) => (
                <FaqItems key={item.id} faq={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};
