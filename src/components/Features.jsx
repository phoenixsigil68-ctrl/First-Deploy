import React from "react";
import { Element } from "react-scroll";
import { features } from "../constants/index";

export const Features = () => {
  return (
    <section className="z-40">
      <Element name="features">
        <div className="container-2 z-20">
          <div className="relative flex md:flex-wrap flex-nowrap overflow-hidden gap-3">
            {features.map((item) => (
              <div
                key={item.id}
                className="relative flex-50 z-2 p-5 rounded-4xl border-2 border-s3 g7"
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </Element>
    </section>
  );
};
