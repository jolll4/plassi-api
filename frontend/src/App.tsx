import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import SeatingOrder from "./pages/SeatingOrder";
import Home from "./pages/Home";

function App() {
  const [message, setMessage] = useState("/message");
  const [text, setText] = useState("/text");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/text")
      .then((res) => res.json())
      .then((data) => setText(data.text));
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="seatingOrder" element={<SeatingOrder />}></Route>
        <Route path="home" element={<Home />}></Route>
      </Routes>
      <header className="App-header">
        <h1>Pakollinen 'moi maailma!'</h1>
        {message}
        <div className="Box">{text}</div>
        <div className="Table">{text}</div>
      </header>
    </Router>
  );
}

export default App;
