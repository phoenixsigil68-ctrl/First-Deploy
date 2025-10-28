import React from "react";
import { useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { Download } from "./Download";
import "../index.css";

export const LandingPage = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Download />
    </main>
  );
};
