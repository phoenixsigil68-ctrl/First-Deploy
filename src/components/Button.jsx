import React from "react";
import { Marker } from "./Marker";
import "../index.css";

export const Button = ({ icon, title, markerFill }) => {
  return (
    <div className="relative mt-7 hover:opacity-80 transition-opacity duration-300 hover:text-p1 outer-line">
      <span className="absolute left-0 top-6">
        <Marker markerFill={markerFill} />
      </span>
      <button className="text-xl text-white  bg-[#131f52] rounded-2xl cursor-pointer flex justify-around items-center gap-5 p-4 custom-shadow transition-shadow duration-300 ">
        <span>
          <img src={icon} />
        </span>
        <span className="uppercase text-xl font-bold hover:text-p1 transition-colors duration-200">
          {title}
        </span>
      </button>
    </div>
  );
};
