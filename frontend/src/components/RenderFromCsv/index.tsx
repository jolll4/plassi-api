import { Component } from "react";
import Papa from "papaparse";
import { formatSeatingOrder } from "../RenderContent/formatSeatingOrder";
import "../RenderContent/RenderStyles.css";

type RenderProps = {};

type RenderState = {
  showResult: boolean;
  uploadedData: string[];
  outputText: string;
};

export default class RenderFromCsv extends Component<RenderProps, RenderState> {
  constructor(props: RenderProps) {
    super(props);
    this.state = {
      showResult: false,
      uploadedData: [],
      outputText: "",
    };
  }

  onFileChange = (event: any) => {
    this.parseCsv(event.target.files[0]);
  };

  parseCsv = (file: any) => {
    Papa.parse(file, {
      complete: (result: any) => {
        this.setState({ uploadedData: result.data });
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  onClick = () => {
    this.sortSeats();
    this.setState({ showResult: true });
  };

  sortSeats = () => {
    fetch("http://localhost:8000/sortPeopleCsv", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(this.state.uploadedData),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        this.setState({
          outputText: res
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll('"', ""),
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <div>
          <input type="file" accept=".csv" onChange={this.onFileChange} />
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
