import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import History from "./components/History";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
