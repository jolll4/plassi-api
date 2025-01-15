import "./RenderStyles.css";

export function formatSeatingOrder(seatingOrder: string): JSX.Element {
  try {
    const formattedSeatingOrder: JSX.Element[] = [];
    const seats = JSON.parse(seatingOrder);
    seats.forEach((pair: any[]) => {
      pair.forEach((person) => {
        formattedSeatingOrder.push(
          <div key={`seat_${person[0].trim()}`} className="RectangleSeat">
            {person[0].trim()}
            {person[1].map((color: string) => {
              return (
                <div
                  className="GroupIndicator"
                  style={{ backgroundColor: color }}
                />
              );
            })}
          </div>
        );
      });
    });

    return <div className="RectangleTable">{formattedSeatingOrder}</div>;
  } catch {
    return <div>Oops, something went wrong</div>;
  }
}
