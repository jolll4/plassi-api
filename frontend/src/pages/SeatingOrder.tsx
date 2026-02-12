import SeatmentPlanner from "../components/SeatmentPlanner";

function SeatingOrder(): JSX.Element {
  return (
    <div className="Background">
      <header className="App-header">
        <label htmlFor={"inputBox"}>Enter your attendees</label>
        <SeatmentPlanner />
      </header>
    </div>
  );
}

export default SeatingOrder;
