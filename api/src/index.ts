import express, { Express, Request, Response } from "express";
import cors from "cors";
import { sortPeople, sortPeopleCsv } from "./seatingOrder/sortPeople";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Backendista haettu teksti" });
});

app.post("/sortPeople", (req, res) => {
  res.json(sortPeople(req.body));
});

app.post("/sortPeopleCsv", (req, res) => {
  res.json(sortPeopleCsv(req.body));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
