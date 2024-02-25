import calculateSeatingOrderScore from "./scoreUtils/calculateSeatingOrderScore";
import swapIfNeeded from "./arrayUtils/swapIfNeeded";
import combineArrays from "./arrayUtils/combineArrays";
import getCombinedScores from "./scoreUtils/getCombinedScores";

export default function createSeatingOrder(
  people: string[],
  groups: string[][],
  avecs: string[][]
): string[][] {
  const closenessScores: number[][] = calculateClosenessForAll(
    people,
    groups,
    avecs
  );
  const unSeatedPeople: string[] = Object.assign([], people);
  var seatingOrder: string[][] = [];
  while (unSeatedPeople.length > 0) {
    if (unSeatedPeople.length > 0) {
      findClosestUnseatedNeighbors(
        people,
        seatingOrder,
        unSeatedPeople,
        closenessScores,
        avecs
      );
    }
  }
  seatingOrder = calculateSeatingOrderScore(
    seatingOrder,
    closenessScores,
    people
  );

  return seatingOrder;
}

function calculateClosenessForAll(
  people: string[],
  groups: string[][],
  avecs: string[][]
): number[][] {
  const closenessScores: number[][] = new Array(people.length)
    .fill(0)
    .map(() => new Array(people.length).fill(0));
  people.forEach((person, index) => {
    groups.forEach((group) => {
      if (group.includes(person)) {
        group.forEach((groupMember) => {
          if (groupMember != person && people.includes(groupMember)) {
            closenessScores[index][people.indexOf(groupMember)] += 1;
          }
        });
      }
    });
  });
  avecs.forEach((pair) => {
    closenessScores[people.indexOf(pair[0])][people.indexOf(pair[1])] += 5;
    closenessScores[people.indexOf(pair[1])][people.indexOf(pair[0])] += 5;
  });

  return closenessScores;
}

function findClosestUnseatedNeighbors(
  people: string[],
  seatingOrder: string[][],
  unSeatedPeople: string[],
  closenessScores: number[][],
  avecs: string[][]
): void {
  const nextCouple: string[] = [];
  var scoresForSecondPick: number[] = [];
  if (seatingOrder.length > 0) {
    const combinedScores: number[] = getCombinedScores(
      people,
      seatingOrder,
      closenessScores
    );
    const combinedScoresSorted: number[] = [...combinedScores].sort(
      (a, b) => b - a
    );
    for (var i = 0; i < combinedScores.length; i++) {
      const nextCandidate: string =
        people[combinedScores.indexOf(combinedScoresSorted[i])];
      if (unSeatedPeople.includes(nextCandidate)) {
        nextCouple.push(nextCandidate);
        unSeatedPeople.splice(unSeatedPeople.indexOf(nextCandidate), 1);
        break;
      }
    }
    const firstPickScores: number[] =
      closenessScores[people.indexOf(nextCouple[0])];

    scoresForSecondPick = combineArrays(
      combinedScores.map((score) => score * 0.5),
      firstPickScores
    );
  } else {
    nextCouple.push(unSeatedPeople[0]);
    unSeatedPeople.splice(0, 1);
    scoresForSecondPick = closenessScores[people.indexOf(nextCouple[0])];
  }
  const scoresForSecondPickSorted: number[] = [...scoresForSecondPick].sort(
    (a, b) => b - a
  );

  if (unSeatedPeople.length > 0) {
    for (var i = 0; i < scoresForSecondPickSorted.length; i++) {
      const peopleWithTheSameScoreIndexes: number[] = scoresForSecondPick
        .map((score, index) =>
          score == scoresForSecondPickSorted[i] ? index : -1
        )
        .filter((index) => index != -1);
      peopleWithTheSameScoreIndexes.forEach((position) => {
        if (
          unSeatedPeople.includes(people[position]) &&
          !hasUnseatedAvec(people[position], avecs, unSeatedPeople)
        ) {
          if (people[position] != "") {
            nextCouple.push(people[position]);
          } else {
            nextCouple.push("Empty seat");
          }
          unSeatedPeople.splice(unSeatedPeople.indexOf(people[position]), 1);
        }
      });
      if (nextCouple.length == 2) {
        break;
      }
      i += peopleWithTheSameScoreIndexes.length - 1;
    }
  } else {
    nextCouple.push("Empty seat");
  }
  seatingOrder.push(nextCouple);
  if (seatingOrder.length > 1) {
    swapIfNeeded(people, seatingOrder, closenessScores);
  }
}

function hasUnseatedAvec(
  person: string,
  avecs: string[][],
  unseatedPeople: string[]
): boolean {
  for (var i = 0; i < avecs.length; i++) {
    if (
      (avecs[i][0] == person && unseatedPeople.includes(avecs[i][1])) ||
      (avecs[i][1] == person && unseatedPeople.includes(avecs[i][0]))
    ) {
      return true;
    }
  }
  return false;
}
