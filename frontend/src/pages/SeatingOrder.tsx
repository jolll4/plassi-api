import RenderContent from "../components/RenderContent";

function SeatingOrder(): JSX.Element {
  return (
    <div className="Background">
      <header className="App-header">
        <label htmlFor={"inputBox"}>Enter your attendees</label>
        <RenderContent />
      </header>
    </div>
  );
}

export default SeatingOrder;
