import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import NavigationBar from "./components/NavigationBar"
import SeatingOrder from './pages/SeatingOrder';
import Home from "./pages/Home"


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="seatingOrder" element={<SeatingOrder />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      {Home()}
    </Router>
  );
}

export default App;
