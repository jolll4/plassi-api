import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import NavigationBar from "./components/NavigationBar";
import SeatingOrder from "./pages/SeatingOrder";
import Instructions from "./pages/Instructions";
import SeatingOrderCsv from "./pages/SeatingOrderCsv";
import Home from "./pages/Home";

const seatSlice = createSlice({
  name: "seats",
  initialState: { values: [] as string[], count: 0 },
  reducers: {
    newSeats(state, action: PayloadAction<string>) {
      state.count++;
      state.values.push(action.payload);
    },
  },
});

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
          <Route path="seatingOrderCsv" element={<SeatingOrderCsv />}></Route>
          <Route path="instructions" element={<Instructions />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
