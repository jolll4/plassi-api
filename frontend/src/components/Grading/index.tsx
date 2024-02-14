import { useState, useEffect } from "react";
import "./TextBoxStyles.css";

export function TextBox(): JSX.Element {
  const [text, setText] = useState("/instructions");

  useEffect(() => {
    fetch("http://localhost:8000/instructions")
      .then((res) => res.json())
      .then((data) => setText(data.text));
  }, []);

  return <div className="SolidBox">{text}</div>;
}

export function TextTable(): JSX.Element {
  const [text, setText] = useState("/instructions");

  useEffect(() => {
    fetch("http://localhost:8000/instructions")
      .then((res) => res.json())
      .then((data) => setText(data.text));
  }, []);

  return <div className="DashedBox">{text}</div>;
}
