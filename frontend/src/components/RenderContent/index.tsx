import { Component } from "react";
import SeatmentChart from "../Table/SeatmentChart";
import { InputBoxElements, BigButton } from "../RenderFromCsv/Render.styles";

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
          outputText: res,
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <div>
          <InputBoxElements>
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
          </InputBoxElements>
          <InputBoxElements>
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
          </InputBoxElements>
          <InputBoxElements>
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
          </InputBoxElements>
        </div>
        <BigButton onClick={this.onClick}>Magic</BigButton>
        {this.state.showResult && (
          <SeatmentChart seatingOrder={this.state.outputText} />
        )}
      </div>
    );
  }
}
