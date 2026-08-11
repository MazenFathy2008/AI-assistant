import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcoming from "./pages/Welcoming";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcoming />} />
      </Routes>
    </BrowserRouter>
  );
}
