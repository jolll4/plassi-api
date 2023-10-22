
import express, { Express, Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Backendista haettu teksti" });
});


app.get('/text', (req, res) => {
    res.json({ text: "This is just a string in a box" });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });