import React from "react";
import { Element } from "react-scroll";
import { Link as LinkScroll } from "react-scroll";
import { Button } from "./Button";
export const Hero = () => {
  return (
    <>
      <section className="relative pt-60 pb-40 px-10">
        <Element name="hero">
          <div className="container">
            <div className="relative z-3 max-w-512">
              <div className="caption small-3 uppercase text-p3 font-bold tracking-[4px] text-sm">
                Tutor AI
              </div>

              <div className="flex justify-start items-center gap-5 relative -left-2 w-sm mt-4">
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-7xl uppercase text-white font-bold">
                    Amazingly Simple
                  </h1>
                  <p className="max-w-440 text-p5 text-2xl mt-7">
                    We designed XORA AI to be an easy to use, quick to learn and
                    surprisingly powerful.
                  </p>
                  <LinkScroll>
                    <Button title="Try it now" icon="/images/zap.svg" />
                  </LinkScroll>
                </div>
              </div>
              <div className="absolute left-[calc(50%-340px)] -top-85 pointer-events-none right-2 w-[1230px]">
                <img src="/images/hero.png" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </Element>
      </section>
    </>
  );
};
