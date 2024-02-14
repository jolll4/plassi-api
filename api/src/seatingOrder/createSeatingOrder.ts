export default function createSeatingOrder(
  people: string[],
  groups: string[][],
  avecs: string[][]
): any[] {
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
        closenessScores
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
  closenessScores: number[][]
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
      if (
        unSeatedPeople.includes(
          people[scoresForSecondPick.indexOf(scoresForSecondPickSorted[i])]
        )
      ) {
        if (
          people[scoresForSecondPick.indexOf(scoresForSecondPickSorted[i])] !=
          ""
        ) {
          nextCouple.push(
            people[scoresForSecondPick.indexOf(scoresForSecondPickSorted[i])]
          );
        } else {
          nextCouple.push("Empty seat");
        }
        unSeatedPeople.splice(
          unSeatedPeople.indexOf(
            people[scoresForSecondPick.indexOf(scoresForSecondPickSorted[i])]
          ),
          1
        );
        break;
      }
    }
  } else {
    nextCouple.push("Empty seat");
  }
  seatingOrder.push(nextCouple);
  if (seatingOrder.length > 1) {
    swapIfNeeded(people, seatingOrder, closenessScores);
  }
}

function getCombinedScores(
  people: string[],
  seatingOrder: string[][],
  closenessScores: number[][]
): number[] {
  const scoresLeft: number[] =
    closenessScores[people.indexOf(seatingOrder[seatingOrder.length - 1][0])];
  const scoresRight: number[] =
    closenessScores[people.indexOf(seatingOrder[seatingOrder.length - 1][1])];

  if (seatingOrder.length < 2) {
    return combineArrays(scoresLeft, scoresRight);
  } else {
    const scoreLeftDistanceTwo: number[] =
      closenessScores[people.indexOf(seatingOrder[seatingOrder.length - 2][0])];
    const scoreRightDistanceTwo: number[] =
      closenessScores[people.indexOf(seatingOrder[seatingOrder.length - 2][1])];

    return combineArrays(
      combineArrays(
        scoresLeft,
        scoreLeftDistanceTwo.map((score) => score * 0.25)
      ),
      combineArrays(scoresRight, scoreRightDistanceTwo).map(
        (score) => score * 0.25
      )
    );
  }
}

function combineArrays(array1: number[], array2: number[]): any[] {
  if (array1.length == 0) {
    return [];
  }
  return array1.map((element, index) => {
    return [1 * element + 1 * array2[index]];
  });
}

function swapIfNeeded(
  people: string[],
  seatingOrder: string[][],
  closenessScores: number[][]
): void {
  const latestIndex: number = seatingOrder.length - 1;
  const previousLeftIndex: number = people.indexOf(
    seatingOrder[latestIndex - 1][0]
  );
  const previousRightIndex: number = people.indexOf(
    seatingOrder[latestIndex - 1][1]
  );
  const currentLeftIndex: number = people.indexOf(seatingOrder[latestIndex][0]);
  const currentRightIndex: number = people.indexOf(
    seatingOrder[latestIndex][1]
  );
  if (seatingOrder[latestIndex][1] != "Empty seat") {
    if (
      (closenessScores[previousLeftIndex][currentLeftIndex] <
        closenessScores[previousRightIndex][currentLeftIndex] ||
        closenessScores[previousRightIndex][currentRightIndex] <
          closenessScores[previousLeftIndex][currentRightIndex]) &&
      closenessScores[previousLeftIndex][currentRightIndex] >=
        closenessScores[previousRightIndex][currentRightIndex] &&
      closenessScores[previousRightIndex][currentLeftIndex] >=
        closenessScores[previousLeftIndex][currentLeftIndex]
    ) {
      seatingOrder[latestIndex] = [
        seatingOrder[latestIndex][1],
        seatingOrder[latestIndex][0],
      ];
    }
  } else {
    if (
      closenessScores[previousLeftIndex][currentLeftIndex] <
      closenessScores[previousRightIndex][currentLeftIndex]
    ) {
      seatingOrder[latestIndex] = [
        seatingOrder[latestIndex][1],
        seatingOrder[latestIndex][0],
      ];
    }
  }
}

function calculateSeatingOrderScore(
  seatingOrder: string[][],
  closenessScores: number[][],
  people: string[]
): string[][] {
  const seatingScores: string[][] = new Array(seatingOrder.length)
    .fill(0)
    .map(() => new Array(people.length).fill(0));
  seatingOrder.forEach(([seatLeft, seatRight], currentIndex) => {
    var scoreLeft: number = 0;
    var scoreRight: number = 0;
    if (seatLeft != "Empty seat" && seatRight != "Empty seat") {
      scoreLeft +=
        closenessScores[people.indexOf(seatLeft)][people.indexOf(seatRight)] *
          2 ?? 0;
      scoreRight +=
        closenessScores[people.indexOf(seatRight)][people.indexOf(seatLeft)] *
          2 ?? 0;
    }
    if (seatLeft != "Empty seat") {
      if (currentIndex > 0) {
        scoreLeft +=
          closenessScores[people.indexOf(seatLeft)][
            people.indexOf(seatingOrder[currentIndex - 1][0])
          ] * 0.5 ?? 0;
        scoreLeft +=
          closenessScores[people.indexOf(seatLeft)][
            people.indexOf(seatingOrder[currentIndex - 1][1])
          ] ?? 0;
      }
      if (currentIndex < seatingOrder.length - 1) {
        if (seatingOrder[currentIndex + 1][0] != "Empty seat") {
          scoreLeft +=
            closenessScores[people.indexOf(seatLeft)][
              people.indexOf(seatingOrder[currentIndex + 1][0])
            ] * 0.5 ?? 0;
        }
        if (seatingOrder[currentIndex + 1][1] != "Empty seat") {
          scoreLeft +=
            closenessScores[people.indexOf(seatLeft)][
              people.indexOf(seatingOrder[currentIndex + 1][1])
            ] ?? 0;
        }
      }
    }
    if (seatRight != "Empty seat") {
      if (currentIndex > 0) {
        scoreRight +=
          closenessScores[people.indexOf(seatRight)][
            people.indexOf(seatingOrder[currentIndex - 1][1])
          ] * 0.5 ?? 0;
        scoreRight +=
          closenessScores[people.indexOf(seatRight)][
            people.indexOf(seatingOrder[currentIndex - 1][0])
          ] ?? 0;
      }
      if (currentIndex < seatingOrder.length - 1) {
        if (seatingOrder[currentIndex + 1][1] != "Empty seat") {
          scoreRight +=
            closenessScores[people.indexOf(seatRight)][
              people.indexOf(seatingOrder[currentIndex + 1][1])
            ] * 0.5 ?? 0;
        }
        if (seatingOrder[currentIndex + 1][0] != "Empty seat") {
          scoreRight +=
            closenessScores[people.indexOf(seatRight)][
              people.indexOf(seatingOrder[currentIndex + 1][0])
            ] ?? 0;
        }
      }
    }
    seatingScores[currentIndex] = [
      seatLeft == "Empty seat"
        ? seatLeft
        : `${seatLeft}; score: ${scoreLeft * 2}/${
            maxScoreForPerson(people.indexOf(seatLeft), closenessScores) * 2
          }`,
      seatRight == "Empty seat"
        ? seatRight
        : `${seatRight}; score: ${scoreRight * 2}/${
            maxScoreForPerson(people.indexOf(seatRight), closenessScores) * 2
          }`,
    ];
  });
  return seatingScores;
}

function maxScoreForPerson(index: number, closenessScores: number[][]): number {
  var maxScore: number = 0;
  const sortedScores: number[] = closenessScores[index].sort((a, b) => b - a);
  maxScore += sortedScores[0] * 2;
  maxScore += sortedScores[1];
  maxScore += sortedScores[2];
  maxScore += sortedScores[3] * 0.5;
  maxScore += sortedScores[4] * 0.5;
  return maxScore;
}
