import Papa from "papaparse";
import SeatmentChart from "../Table/SeatmentChart";
import { BigButton, ButtonContainer, RedHighlight } from "./Render.styles";
import { store, newSeats } from "../../App";
import { useAppDispatch } from "../../hooks";
import React from "react";
import { SeatingData } from "./types";

const SeatmentPlanner = () => {
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [uploadedData, setUploadedData] = React.useState<string[][]>([]);
  const [outputData, setOutputData] = React.useState<SeatingData>({
    tables: [],
  });
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
      setOutputData(getOutputData());
      setShowResult(true);
    }
  };

  const toggleResults = () => {
    setShowResult(!showResult);
  };

  const getOutputData = (index: number = -1) => {
    return (
      store.getState().seats.seatingData.at(index) ?? {
        tables: [],
      }
    );
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
    <>
      <div>
        <input type="file" accept=".csv" onChange={onFileChange} />
      </div>
      <ButtonContainer>
        <BigButton onClick={createSeating}>Magic</BigButton>
        <BigButton onClick={toggleResults}>Toggle results</BigButton>
      </ButtonContainer>
      {duplicatePeople.length > 0 && (
        <div>
          <p>People that appear more than once in the input data: </p>
          <RedHighlight>{duplicatePeople.join(", ")}</RedHighlight>
        </div>
      )}
      {showResult && <SeatmentChart seatingOrder={outputData} />}
    </>
  );
};

export default SeatmentPlanner;
