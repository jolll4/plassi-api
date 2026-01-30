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
            {person[1] &&
              person[1].map((color_shape: string[]) => {
                const color = color_shape[0];
                const shape = color_shape[1];
                switch (shape) {
                  case "circle":
                    return (
                      <div
                        className="Circle"
                        style={{ backgroundColor: color }}
                      />
                    );
                  case "square":
                    return (
                      <div
                        className="Square"
                        style={{ backgroundColor: color }}
                      />
                    );
                  case "triangle":
                    return (
                      <div className="Triangle" style={{ color: color }} />
                    );
                  case "triangle-down":
                    return (
                      <div className="TriangleDown" style={{ color: color }} />
                    );
                  case "minus":
                    return (
                      <div
                        className="Minus"
                        style={{ backgroundColor: color }}
                      />
                    );
                }
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
