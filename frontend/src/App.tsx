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
      <header className="App-header">
        <h1>Pakollinen 'moi maailma!'</h1>
        {message}
      </header>
    </div>
  );
}

export default App;
