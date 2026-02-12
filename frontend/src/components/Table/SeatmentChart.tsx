import {
  RectangleTable,
  RectangleSeat,
  Circle,
  Minus,
  Square,
  Triangle,
  TriangleDown,
} from "./Table.styles";
import { SeatingData, Person } from "../SeatmentPlanner/types";

type Props = {
  seatingOrder: SeatingData;
};

const SeatmentChart = (props: Props) => {
  const seats: JSX.Element[] = [];
  try {
    props.seatingOrder.tables.forEach((table, index) => {
      const seatedTable: JSX.Element[] = [];
      table.forEach((pair) => {
        const { left, right } = pair;
        seatedTable.push(
          <RectangleSeat key={`seat_${left.name}`}>
            {left.name}
            {createSymbols(left)}
          </RectangleSeat>
        );
        if (right) {
          seatedTable.push(
            <RectangleSeat key={`seat_${right.name}`}>
              {right.name}
              {createSymbols(right)}
            </RectangleSeat>
          );
        }
      });
      seats.push(
        <RectangleTable key={`table_${index}`}>{seatedTable}</RectangleTable>
      );
    });
    return <>{seats}</>;
  } catch {
    return <div>Oops, something went wrong</div>;
  }
};

const createSymbols = (person: Person) => {
  return person.symbols.map((symbol, i) => {
    const { shape, color } = symbol;
    const key = `${person.name}_symbol_${i}`;
    switch (shape) {
      case "circle":
        return <Circle key={key} style={{ backgroundColor: color }} />;
      case "square":
        return <Square key={key} style={{ backgroundColor: color }} />;
      case "triangle":
        return <Triangle key={key} style={{ color: color }} />;
      case "triangle-down":
        return <TriangleDown key={key} style={{ color: color }} />;
      case "minus":
        return <Minus key={key} style={{ backgroundColor: color }} />;
    }
  });
};

export default SeatmentChart;
