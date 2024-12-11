import Papa from "papaparse";
import { formatSeatingOrder } from "../RenderContent/formatSeatingOrder";
import "../RenderContent/RenderStyles.css";
import { store, newSeats } from "../../App";
import { useAppDispatch } from "../../hooks";
import React from "react";

export default function RenderFromCsv() {
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [uploadedData, setUploadedData] = React.useState<string>("");
  const [outputData, setOutputData] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const onFileChange = (event: any) => {
    parseCsv(event.target.files[0]);
  };

  const parseCsv = (file: any) => {
    Papa.parse(file, {
      complete: (result: any) => {
        setUploadedData(result.data);
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  const createSeating = async () => {
    await sortSeats();
    setOutputData(await getOutputData());
    setShowResult(true);
  };

  const toggleResults = async () => {
    setOutputData(await getOutputData());
    setShowResult(!showResult);
  };

  const getOutputData = async (index: number = -1) => {
    return (await store.getState().seats.values.at(index)) ?? "";
  };

  const sortSeats = async () => {
    await fetch("http://localhost:8000/sortPeopleCsv", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(uploadedData),
    })
      .then((res) => res.text())
      .then((res) => {
        dispatch(newSeats(res));
        console.log(store.getState().seats);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <input type="file" accept=".csv" onChange={onFileChange} />
      </div>
      <div className="ButtonContainer">
        <button className="BigButton" onClick={createSeating}>
          Magic
        </button>
        <button className="BigButton" onClick={toggleResults}>
          Toggle results
        </button>
      </div>
      {showResult && <div>{formatSeatingOrder(outputData)}</div>}
    </div>
  );
}
