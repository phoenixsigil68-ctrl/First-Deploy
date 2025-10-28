import React from "react";
import { Element } from "react-scroll";
import { features, details } from "../constants/index";
import { Button } from "./Button";
import { useInView } from "react-intersection-observer";

export const Features = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0 z-40" : "opacity-0 translate-y-50"
      }`}
    >
      <Element name="features">
        <div className="container-2 z-40">
          <div className="relative p-5 flex flex-50 gap-3 border-2 border-s3 rounded-4xl justify-center z-10 g7 h-auto">
            {features.map((item) => (
              <div
                key={item.id}
                className="relative z-20 p-5 flex-50 border-r-5 border-r-s1 rounded-3xl"
              >
                <div className="w-full flex justify-start items-start -mt-10 ">
                  <div className="-ml-3 mb-12 flex justify-center items-center flex-col">
                    <div className="w-0.5 h-16 bg-s3" />
                    <img className="size-28 object-contain" src={item.icon} />
                  </div>
                </div>
                <p className="mb-5 text-amber-300 uppercase tracking-[4px] text-xl font-bold">
                  {item.caption}
                </p>
                <h2 className="mb-7 text-p4 uppercase text-3xl font-bold">
                  {item.caption}
                </h2>
                <p className="mb-5 text-2xl text-p5 text-left">{item.text}</p>

                <Button
                  icon={item.button.icon}
                  title={item.button.title}
                  divSize=""
                  decoration=""
                />
              </div>
            ))}
          </div>
          <div className="relative p-10 flex justify-evenly items-center w-full g7 rounded-4xl border-2 border-s3">
            {details.map((index) => (
              <div
                className="flex flex-col justify-center items-center gap-6 relative"
                key={index.id}
              >
                <div className="relative cursor-pointer group">
                  <img
                    src={index.icon}
                    className="size-20 relative z-10 hover:scale-110 transition-transform duration-300 ease-in"
                  />
                  <div className="absolute inset-0 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 blur-2xl bg-white/30 transition-all duration-200"></div>
                </div>

                <h2 className="text-xl uppercase text-p5 text-center font-bold">
                  {index.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </Element>
    </section>
  );
};
