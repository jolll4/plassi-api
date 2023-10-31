import { Component } from "react";
import "./RenderStyles.css";

type RenderProps = {};

type RenderState = {
  showResult: boolean;
  inputText: string;
  outputText: string;
};

export default class RenderContent extends Component<RenderProps, RenderState> {
  constructor(props: RenderProps) {
    super(props);
    this.state = {
      showResult: false,
      inputText: "",
      outputText: "",
    };
  }

  onClick = () => {
    this.setState({ outputText: this.state.inputText });
    this.setState({ showResult: true });
  };

  render() {
    return (
      <div>
        <textarea
          id={"inputBox"}
          rows={10}
          cols={40}
          value={this.state.inputText}
          onChange={(event) => {
            this.setState({ inputText: event.target.value });
          }}
        />
        <br />
        Input was: <br />
        <button onClick={this.onClick}>Magic</button>
        {this.state.showResult && (
          <div className="Output">{this.state.outputText}</div>
        )}
      </div>
    );
  }
}
