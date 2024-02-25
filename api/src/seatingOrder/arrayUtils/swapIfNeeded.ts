export default function swapIfNeeded(
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
