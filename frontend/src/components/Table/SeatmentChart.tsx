import {
  RectangleTable,
  RectangleSeat,
  Circle,
  Minus,
  Square,
  Triangle,
  TriangleDown,
} from "./Table.styles";

type Props = {
  seatingOrder: string;
};

const SeatmentChart = (props: Props) => {
  console.log(props);
  return formatSeatingOrder(props.seatingOrder);
};

const formatSeatingOrder = (seatingOrder: string): JSX.Element => {
  try {
    const formattedSeatingOrder: JSX.Element[] = [];
    const seats = JSON.parse(seatingOrder);
    seats.forEach((pair: any[]) => {
      pair.forEach((person) => {
        formattedSeatingOrder.push(
          <RectangleSeat key={`seat_${person[0].trim()}`}>
            {person[0].trim()}
            {person[1] &&
              person[1].map((color_shape: string[]) => {
                const color = color_shape[0];
                const shape = color_shape[1];
                switch (shape) {
                  case "circle":
                    return <Circle style={{ backgroundColor: color }} />;
                  case "square":
                    return <Square style={{ backgroundColor: color }} />;
                  case "triangle":
                    return <Triangle style={{ color: color }} />;
                  case "triangle-down":
                    return <TriangleDown style={{ color: color }} />;
                  case "minus":
                    return <Minus style={{ backgroundColor: color }} />;
                }
              })}
          </RectangleSeat>
        );
      });
    });

    return <RectangleTable>{formattedSeatingOrder}</RectangleTable>;
  } catch {
    return <div>Oops, something went wrong</div>;
  }
};

export default SeatmentChart;
