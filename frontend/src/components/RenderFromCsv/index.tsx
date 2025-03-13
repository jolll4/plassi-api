import Papa from "papaparse";
import { formatSeatingOrder } from "../RenderContent/formatSeatingOrder";
import "../RenderContent/RenderStyles.css";
import { store, newSeats } from "../../App";
import { useAppDispatch } from "../../hooks";
import React from "react";

export default function RenderFromCsv() {
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [uploadedData, setUploadedData] = React.useState<string[][]>([]);
  const [outputData, setOutputData] = React.useState<string>("");
  const [duplicatePeople, setDuplicatePeople] = React.useState<string[]>([]);
  const dispatch = useAppDispatch();

  const duplicatePeopleInData = () => {
    const people: string[] = [];
    const duplicates: string[] = [];
    uploadedData.map((row) => {
      if (people.includes(row[0])) {
        duplicates.push(row[0]);
      } else {
        people.push(row[0]);
      }
    });
    setDuplicatePeople(duplicates);
    return duplicates.length > 0;
  };

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
    if (!duplicatePeopleInData()) {
      await sortSeats();
      setOutputData(await getOutputData());
      setShowResult(true);
    }
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
      {duplicatePeople.length > 0 && (
        <div>
          <p>People that appear more than once in the input data: </p>
          <div className="RedHighlight">{duplicatePeople.join(", ")}</div>
        </div>
      )}
      {showResult && <div>{formatSeatingOrder(outputData)}</div>}
    </div>
  );
}
