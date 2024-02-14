import { Component } from "react";
import Papa from "papaparse";
import { formatSeatingOrder } from "../RenderContent/formatSeatingOrder";
import "../RenderContent/RenderStyles.css";

type RenderProps = {};

type RenderState = {
	showResult: boolean;
	uploadedFile: any;
	uploadedData: string[];
	outputText: string;
};

export default class RenderFromCsv extends Component<RenderProps, RenderState> {
	constructor(props: RenderProps) {
		super(props);
		this.state = {
			showResult: false,
			uploadedFile: null,
			uploadedData: [],
			outputText: "",
		};
	}

	onFileChange = (event: any) => {
		this.setState({ uploadedFile: event.target.files[0] });
	};

	onFileUpload = () => {
		const formData = new FormData();
		if (this.state.uploadedFile) {
			formData.append(
				"file",
				this.state.uploadedFile,
				this.state.uploadedFile.name
			);
			this.parseCsv(this.state.uploadedFile);
		}
	};

	parseCsv = (file: any) => {
		Papa.parse(file, {
			complete: (result: any) => {
				this.setState({ uploadedData: result.data });
			},
			header: false,
		});
	};

	onClick = () => {
		this.onFileUpload();
		this.sortSeats();
		this.setState({ showResult: true });
	};

	sortSeats = () => {
		fetch("http://localhost:8000/sortPeopleCsv", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify(this.state.uploadedData),
		})
			.then((res) => res.text())
			.then((res) =>
				this.setState({
					outputText: res
						.replaceAll("[", "")
						.replaceAll("]", "")
						.replaceAll('"', ""),
				})
			)
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<div>
				<div>
					<input type="file" onChange={this.onFileChange} />
				</div>
				<button className="BigButton" onClick={this.onClick}>
					Magic
				</button>
				{this.state.showResult && (
					<div>{formatSeatingOrder(this.state.outputText)}</div>
				)}
			</div>
		);
	}
}
