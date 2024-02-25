import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import SeatingOrder from "./pages/SeatingOrder";
import Instructions from "./pages/Instructions";
import SeatingOrderCsv from "./pages/SeatingOrderCsv";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="seatingOrder" element={<SeatingOrder />}></Route>
        <Route path="seatingOrderCsv" element={<SeatingOrderCsv />}></Route>
        <Route path="instructions" element={<Instructions />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
