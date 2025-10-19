import React from "react";
import "../index.css";
import { Link as LinkScroll } from "react-scroll";
export const Header = () => {
  function NavLink({ title }) {
    return <LinkScroll className="list">{title}</LinkScroll>;
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 py-10 bg-transparent ">
      <div className="flex justify-around items-center ">
        <NavLink title="Features" />
        <div className="dots" />
        <NavLink title="Pricing" />

        <LinkScroll>
          <img src="/images/xora.svg" width={135} height={55} />
        </LinkScroll>

        <NavLink title="Faq" />
        <div className="dots" />
        <NavLink title="Download" />
      </div>
    </header>
  );
};
