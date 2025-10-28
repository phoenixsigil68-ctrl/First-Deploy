import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { MainPage } from "./components/Chat/MainPage";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />}></Route>
      <Route path="/chatbot" element={<MainPage />}></Route>
    </Routes>
  );
}

export default App;
