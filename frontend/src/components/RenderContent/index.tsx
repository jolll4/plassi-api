import { Component } from "react";
import "./RenderStyles.css";

type RenderProps = {};

type RenderState = {
	showResult: boolean;
	inputPeople: string;
	inputGroups: string;
	inputAvecs: string;
	outputText: string;
};

export default class RenderContent extends Component<RenderProps, RenderState> {
	constructor(props: RenderProps) {
		super(props);
		this.state = {
			showResult: false,
			inputPeople: "",
			inputGroups: "",
			inputAvecs: "",
			outputText: "",
		};
	}

	onClick = () => {
		this.sortSeats();
		this.setState({ showResult: true });
	};

	sortSeats = () => {
		fetch("http://localhost:8000/sortPeople", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify({
				request: [
					this.state.inputPeople,
					this.state.inputGroups,
					this.state.inputAvecs,
				],
			}),
		})
			.then((res) => res.text())
			.then((res) =>
				this.setState({
					outputText: res
						.replaceAll("],[", "\n")
						.replaceAll("[", "")
						.replaceAll("]", "")
						.replaceAll('"', "")
						.replaceAll(",", " | "),
				})
			)
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<div>
				<div>
					<div className="InputBoxElements">
						<p>Attendees:</p>
						<textarea
							id={"inputBox"}
							rows={10}
							cols={40}
							value={this.state.inputPeople}
							onChange={(event) => {
								this.setState({
									inputPeople: event.target.value,
								});
							}}
						/>
					</div>
					<div className="InputBoxElements">
						<p>Groups, separate with an empty line:</p>
						<textarea
							id={"inputBox"}
							rows={10}
							cols={40}
							value={this.state.inputGroups}
							onChange={(event) => {
								this.setState({
									inputGroups: event.target.value,
								});
							}}
						/>
					</div>
					<div className="InputBoxElements">
						<p>Avecs, pairs on the same line separated with a semicolon (;):</p>
						<textarea
							id={"inputBox"}
							rows={10}
							cols={40}
							value={this.state.inputAvecs}
							onChange={(event) => {
								this.setState({
									inputAvecs: event.target.value,
								});
							}}
						/>
					</div>
				</div>
				<button className="BigButton" onClick={this.onClick}>
					Magic
				</button>
				{this.state.showResult && (
					<div className="Output">{this.state.outputText}</div>
				)}
			</div>
		);
	}
}
