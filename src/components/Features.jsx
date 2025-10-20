import React from "react";
import { Element } from "react-scroll";
import { features } from "../constants/index";
import { Button } from "./Button";

export const Features = () => {
  return (
    <section className="z-40">
      <Element name="features">
        <div className="container-2 ">
          <div className="relative p-5 flex flex-50 gap-3 border-2 border-s3 rounded-4xl justify-center z-10 g7 h-auto">
            {features.map((item) => (
              <div key={item.id} className="relative z-20 p-5 flex-50">
                <div className="w-full flex justify-start items-start -mt-10">
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
        </div>
      </Element>
    </section>
  );
};
