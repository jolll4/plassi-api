export default function calculateSeatingOrderScore(
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
