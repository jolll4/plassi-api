
import express, { Express, Request, Response } from "express";
import cors from "cors";

console.log("xd");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Oho, tää toimi" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });