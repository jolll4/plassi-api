import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import SeatingOrder from "./pages/SeatingOrder";
import TextBoxes from "./pages/TextBoxes";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="seatingOrder" element={<SeatingOrder />}></Route>
        <Route path="textBoxes" element={<TextBoxes />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
