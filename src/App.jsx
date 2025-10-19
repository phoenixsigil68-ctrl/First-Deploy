import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
function App() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
    </main>
  );
}

export default App;
