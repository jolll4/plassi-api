import { Component, useState, useEffect } from "react";
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
    this.sortSeats();
    this.setState({ showResult: true });
  };

  sortSeats = () => {
    fetch("http://localhost:8000/sortPeople", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ request: this.state.inputText }),
    })
      .then((res) => res.text())
      .then((res) => this.setState({ outputText: res }))
      .catch((err) => console.log(err));
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
