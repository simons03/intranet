import { Route, Routes } from "react-router-dom";
import Home from "./view/home/home";
import "./App.css";
import "./own-css.css";
import MissingPage from "./view/missing-page";




function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<MissingPage />} />

      </Routes>
    </div>
  );
}

export default App;
