import React, { useState, useEffect } from "react";
import "../App.css";

function Home(): JSX.Element {
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
    <div className="App">
      <header className="App-header">
        <h1>Pakollinen 'moi maailma!'</h1>
        {message}
        <div className="Box">{text}</div>
      </header>
    </div>
  );
}

export default Home;
