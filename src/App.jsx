import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcoming from "./pages/Welcoming";
import Homepage from "./pages/Main";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcoming />} />
        <Route path="homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
