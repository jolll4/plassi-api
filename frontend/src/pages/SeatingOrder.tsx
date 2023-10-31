import RenderContent from "../components/RenderContent";

function SeatingOrder(): JSX.Element {
  return (
    <div>
      <header className="App-header">
        <label htmlFor={"inputBox"}>Enter your attendees</label>
        <RenderContent />
      </header>
    </div>
  );
}

export default SeatingOrder;
