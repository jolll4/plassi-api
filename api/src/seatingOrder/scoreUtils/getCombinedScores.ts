import combineArrays from "../arrayUtils/combineArrays";

export default function getCombinedScores(
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
