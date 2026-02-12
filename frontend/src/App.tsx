import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import NavigationBar from "./components/NavigationBar";
import SeatingOrder from "./pages/SeatingOrder";
import Instructions from "./pages/Instructions";
import Home from "./pages/Home";
import { SeatingData, Pair } from "./components/SeatmentPlanner/types";

const seatSlice = createSlice({
  name: "seats",
  initialState: { seatingData: [] as SeatingData[], count: 0 },
  reducers: {
    newSeats(state, action: PayloadAction<string>) {
      state.count++;
      state.seatingData.push(formatData(action.payload));
    },
  },
});

const formatData = (rawData: string) => {
  const parsedTables: SeatingData = {
    tables: [],
  };
  var table: Pair[] = [];
  const seats = JSON.parse(rawData);
  seats.forEach((pair: any[]) => {
    const left = parsePerson(pair[0]);
    const right = parsePerson(pair[1]);
    if (left !== undefined) {
      table.push({ left, right });
    } else {
      parsedTables.tables.push(table);
      table = [];
    }
  });
  return parsedTables;
};

const parsePerson = (person: any[]) => {
  if (person.length > 1) {
    return {
      name: person[0],
      symbols: person[1].map((group: string[]) => ({
        color: group[0],
        shape: group[1],
      })),
    };
  } else {
    return undefined;
  }
};

export const { newSeats } = seatSlice.actions;

export const store = configureStore({
  reducer: {
    seats: seatSlice.reducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="seatingOrder" element={<SeatingOrder />}></Route>
          <Route path="instructions" element={<Instructions />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
