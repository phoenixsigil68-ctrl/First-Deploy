import React from "react";
import { Marker } from "./Marker";
import "../index.css";

export const Button = ({ icon, title, markerFill, divSize, decoration }) => {
  return (
    <div
      className={`relative mt-7 hover:opacity-80 transition-opacity duration-300 hover:text-p1  ${divSize} ${decoration}`}
    >
      <span className="absolute left-0 top-1/3 ">
        <Marker markerFill={markerFill} />
      </span>
      <button className="text-xl text-white  bg-[#131f52] rounded-2xl cursor-pointer flex justify-around items-center gap-4 p-4 custom-shadow transition-shadow duration-300  ">
        <span className="mr-0">
          <img src={icon} />
        </span>
        <span className="uppercase text-xl font-bold hover:text-p1 transition-colors duration-200 ml-0">
          {title}
        </span>
      </button>
    </div>
  );
};
