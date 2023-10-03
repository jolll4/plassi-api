import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">{message}</header>
    </div>
  );
}

export default App;
