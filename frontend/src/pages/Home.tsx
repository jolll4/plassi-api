import { useState, useEffect } from "react";

function Home(): JSX.Element {
	const [message, setMessage] = useState("/message");

	useEffect(() => {
		fetch("http://192.168.1.109:8000/message")
			.then((res) => res.json())
			.then((data) => setMessage(data.message));
	}, []);

	return (
		<div>
			<header className="App-header">
				<h1>Pakollinen 'moi maailma!'</h1>
				{message}
			</header>
		</div>
	);
}

export default Home;
