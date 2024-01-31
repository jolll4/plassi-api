import { TextBox, TextTable } from "../components/Grading";
import "../components/Grading/Instructions.css";

export default function Instructions() {
	return (
		<div className="Background">
			<header className="App-header">
				<h1>Instructions</h1>
				<p>Each seat is given a grade based on the people arround the seat:</p>
				<ul>
					<li>Your avec gives you 10 points</li>
					<li>Your groupmembers give you 2 points each</li>
				</ul>
				<p>
					The positions of the people also have an effect on the final score:
				</p>
				<ul>
					<li>The person in front of you has a multiplier of 2</li>
					<li>The people in front of you diagonally have a multiplier of 1</li>
					<li>The people next to you have a multiplier of 0.5</li>
				</ul>

				<div>
					<div className="SideBySide">
						<div className="DashedBox">
							<p>1x points</p>
						</div>
						<div className="DashedBox">
							<p>2x points</p>
						</div>
						<div className="DashedBox">
							<p>1x points</p>
						</div>
					</div>
					<div className="SideBySide">
						<div className="DashedBox">
							<p>0.5x points</p>
						</div>
						<div className="SolidBox">
							<p>Your seat</p>
						</div>
						<div className="DashedBox">
							<p>0.5x points</p>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
