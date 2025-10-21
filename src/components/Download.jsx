import React from "react";
import { Element } from "react-scroll";
import { Windows, Web, Android, Ios } from "../constants";
import { Marker } from "./Marker";
import { links } from "../constants";

export const Download = () => {
  return (
    <section className="mt-10 mb-45">
      <Element name="download">
        <div className="container-2 g7 flex flex-col justify-center items-start gap-8 py-10 px-6 rounded-2xl cursor-default">
          <div className="flex justify-start items-center">
            <img src="/images/xora.svg" width={135} height={55} />
          </div>
          <div>
            <p className="text-2xl text-p4 font-bold">
              Try it now for free on iOS, Android, PC, Web-whatever your flavor,
              we've got you covered.
            </p>
          </div>
          <div className="flex justify-evenly items-center w-full mt-4 ">
            {links.map((item) => (
              <div className="before:absolute before:inset-1.5 before:rounded-half before:content-[''] hover:border-s4 relative flex size-22 items-center justify-center rounded-full border-2 border-s3 bg-s1 transition-all duration-500 hover:scale-120 hover:cursor-pointer">
                <span className="absolute rotate-90 -top-2">
                  <Marker />
                </span>
                <span>{item.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </Element>
    </section>
  );
};
