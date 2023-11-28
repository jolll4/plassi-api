import { useState, useEffect } from "react";
import "./TextBoxStyles.css";

export function TextBox(): JSX.Element {
	const [text, setText] = useState("/text");

	useEffect(() => {
		fetch("http://192.168.1.109:8000/text")
			.then((res) => res.json())
			.then((data) => setText(data.text));
	}, []);

	return <div className="Box">{text}</div>;
}

export function TextTable(): JSX.Element {
	const [text, setText] = useState("/text");

	useEffect(() => {
		fetch("http://192.168.1.109:8000/text")
			.then((res) => res.json())
			.then((data) => setText(data.text));
	}, []);

	return <div className="Table">{text}</div>;
}
