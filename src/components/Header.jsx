import React, { act } from "react";
import "../index.css";
import { useState, useEffect } from "react";
import { Link as LinkScroll } from "react-scroll";
import clsx from "clsx";

export const Header = () => {
  function NavLink({ title, destination, activate }) {
    return (
      <LinkScroll
        className="list transition-all duration-300"
        to={destination}
        spy
        smooth
        activeClass="text-yellow-200 font-bold "
        offset={activate}
      >
        {title}
      </LinkScroll>
    );
  }

  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-[9999] text-white transition-all duration-300"
      style={{
        backgroundColor: hasScrolled ? "black" : "",
        paddingTop: hasScrolled ? "0.5rem" : "2.5rem", // py-2 (0.5rem) vs py-10 (2.5rem)
        paddingBottom: hasScrolled ? "0.5rem" : "2.5rem",
      }}
    >
      <div className="flex justify-around items-center ">
        <NavLink title="Features" destination="features" activate={-80} />
        {/* Added destination */}
        <div className="dots" />
        <NavLink title="Pricing" destination="pricing" activate={-80} />{" "}
        {/* Added destination */}
        <LinkScroll to="hero" spy smooth offset={-230}>
          <img
            src="/images/xora.svg"
            width={135}
            height={55}
            className="cursor-pointer drop-shadow-lg" // Added drop-shadow for logo visibility
          />
        </LinkScroll>
        <NavLink title="Faq" destination="faq" activate={-80} />{" "}
        {/* Added destination */}
        <div className="dots" />
        <NavLink title="Download" destination="download" activate={-10} />{" "}
        {/* Added destination */}
      </div>
    </header>
  );
};
