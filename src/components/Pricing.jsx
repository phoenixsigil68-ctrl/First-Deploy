import React from "react";
import { Element } from "react-scroll";
import { plans } from "../constants";
import { useInView } from "react-intersection-observer";

export const Pricing = () => {
  const [fade, inFade] = useInView({ threshold: 1, triggerOnce: true });
  const [fade2, inFade2] = useInView({ threshold: 0.7, triggerOnce: true });

  return (
    <section className="mb-18">
      <Element name="pricing">
        <div className="container-2 flex justify-center items-center my-7">
          <div
            ref={fade}
            className={`border-1 border-s3 p-10 rounded-4xl g4 w-full flex justify-center items-center transition-all duration-700 ${
              inFade ? "scale-100" : "scale-0"
            }`}
          >
            <span className="uppercase text-4xl tracking-[5px] text-white font-bold">
              Completely{" "}
              <strong className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                free
              </strong>{" "}
              for students
            </span>
          </div>
        </div>
        <div
          ref={fade2}
          className={`container-2 transition-all duration-700 ${
            inFade2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-100"
          }`}
        >
          <div className="flex justify-center items-center gap-4">
            {plans.map((item) => (
              <div
                className="flex flex-col justify-center items-center w-full 
              h-[340px] border-2 border-s3 rounded-4xl py-5 px-6 gap-5 transition-transform duration-500 hover:scale-105 cursor-default g7"
              >
                <div>
                  <img src={item.logo} className="size-18" />
                </div>
                <div className="w-full text-center ">
                  <span
                    className="font-bold uppercase text-3xl
                  bg-gradient-to-tr from-pink-600 to-cyan-300 bg-clip-text text-transparent"
                  >
                    {item.title}
                  </span>
                </div>
                <div className="text-2xl text-center font-bold text-p4">
                  {item.features}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Element>
    </section>
  );
};
