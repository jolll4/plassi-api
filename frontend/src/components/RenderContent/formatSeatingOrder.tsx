import "./RenderStyles.css";

export function formatSeatingOrder(seatingOrder: string): JSX.Element {
  const formattedSeatingOrder: JSX.Element[] = [];
  seatingOrder
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll('"', "")
    .split(",")
    .forEach((person) => {
      formattedSeatingOrder.push(
        <div key={`seat_${person.trim()}`} className="RectangleSeat">
          {person.trim()}
        </div>
      );
    });

  return <div className="RectangleTable">{formattedSeatingOrder}</div>;
}
