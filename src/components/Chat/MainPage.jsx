import React, { useState } from "react";
import "./chat.css";
import { assets } from "../../assets/assets";
import { Faq } from "../Faq";

export const MainPage = () => {
  const setBackground = `relative before:content-[''] before:absolute before:w-[40px] before:h-[40px] before:rounded-4xl before:bg-gray-300 before:-left-[5px] before:-top-[5px] before:opacity-0 hover:before:opacity-100 before:-z-1 before:transition-all before:duration-300 cursor-pointer`;
  const setCardStyle =
    "bg-[#f0f4f9] rounded-xl p-[10px] text-[18px] font-medium roboto text-[#585858] relative hover:bg-[#C4C7C5] transition-all duration-300 cursor-pointer";

  const setIcon = "absolute w-[30px] h-[30px] right-2 bottom-2";

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-auto bg-white pb-5">
      <div
        className={`bg-[#f0f4f9] z-20 h-dvh fixed top-0 transition-all duration-300 ${
          isOpen ? "w-40" : "w-20"
        }`}
      >
        <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full py-5 justify-items-center gap-y-7">
          <div className="flex justify-center items-center gap-3 w-full">
            <img
              src={assets.menu_icon}
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>
          <div>
            <h1
              className={`text-2xl font-medium ${
                isOpen ? "opacity-100 transition-all duration-500" : "opacity-0"
              }`}
            >
              Recent
            </h1>
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className={setBackground}>
              <img src={assets.question_icon} className="w-[30px] h-[30px]" />
            </div>
            <div className={setBackground}>
              <img src={assets.history_icon} className="w-[30px] h-[30px]" />
            </div>
            <div className={setBackground}>
              <img src={assets.setting_icon} className="w-[30px] h-[30px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main */}

      <div
        className={`bg-white w-full h-full transition-all duration-300 ${
          isOpen ? "pl-45 pr-10" : "pl-27 pr-10"
        }`}
      >
        <div className={`py-5 flex flex-1 justify-between items-center`}>
          <h1 className="text-3xl uppercase roboto tracking-[2px] font-medium text-[#585858]">
            Xora
          </h1>
          <div className="rounded-full overflow-hidden">
            <img
              src={assets.user_icon}
              className="w-[60px] h-[60px] hover:w-[70px] hover:h-[70px] transition-all duration-400"
            />
          </div>
        </div>

        <div className="mt-15 w-full pl-45">
          <h1 className="text-[56px] text-start text-transparent bg-clip-text bg-linear-25 from-[#4b90ff] to-[#ff5546] font-bold roboto">
            Hello, Student
          </h1>
          <h1 className="text-[56px] text-start font-bold roboto text-[#C4C7C5] ">
            {" "}
            How can I help you today?
          </h1>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[200px] pl-45 pr-40 gap-5 mt-15">
          <div className={setCardStyle}>
            Suggest me some brain exercises.
            <img src={assets.compass_icon} className={setIcon} />
          </div>
          <div className={setCardStyle}>
            Help me summarize my course in a week.
            <img src={assets.bulb_icon} className={setIcon} />
          </div>
          <div className={setCardStyle}>
            Give me some good quotes of scientists.
            <img src={assets.message_icon} className={setIcon} />
          </div>
          <div className={setCardStyle}>
            Let's make notes about the Maths chapter 1.
            <img src={assets.code_icon} className={setIcon} />
          </div>
        </div>

        <div className="mt-5 pl-45 pr-40">
          <div className="w-full ">
            <input
              type="text"
              placeholder="Enter a prompt here"
              className="w-full py-4 px-6 text-xl font-medium roboto rounded-full bg-[#f0f4f9]"
            />
          </div>
          <p className="text-center font-medium text-[14px] text-gray-500 mt-3">
            Xora may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};
