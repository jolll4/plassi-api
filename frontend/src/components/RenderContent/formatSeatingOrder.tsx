import "./RenderStyles.css";

export function formatSeatingOrder(seatingOrder: string): JSX.Element {
  const formattedSeatingOrder: JSX.Element[] = [];
  seatingOrder.split(",").forEach((person) => {
    formattedSeatingOrder.push(
      <div key={`seat_${person}`} className="RectangleSeat">
        {person}
      </div>
    );
  });

  return <div className="RectangleTable">{formattedSeatingOrder}</div>;
}
