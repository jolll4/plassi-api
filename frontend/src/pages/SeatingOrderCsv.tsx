import RenderFromCsv from "../components/RenderFromCsv";

function SeatingOrderCsv(): JSX.Element {
  return (
    <div className="Background">
      <header className="App-header">
        <label htmlFor={"inputBox"}>Enter your attendees</label>
        <RenderFromCsv />
      </header>
    </div>
  );
}

export default SeatingOrderCsv;
