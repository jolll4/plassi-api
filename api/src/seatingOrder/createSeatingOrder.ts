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
	var nextPerson: string = people[0];
	while (unSeatedPeople.length > 0) {
		// if (
		// 	seatingOrder.length > 0 &&
		// 	seatingOrder[seatingOrder.length - 1].length == 1
		// ) {
		// 	seatingOrder[seatingOrder.length - 1].push(nextPerson);
		// } else {
		// 	seatingOrder.push([nextPerson]);
		// }
		// unSeatedPeople.splice(unSeatedPeople.indexOf(nextPerson), 1);
		if (unSeatedPeople.length > 0) {
			// seatingOrder.push(
			findClosestUnseatedNeighbors(
				people,
				seatingOrder,
				unSeatedPeople,
				closenessScores
				// )
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
		const scoresLeft: number[] =
			closenessScores[people.indexOf(seatingOrder[seatingOrder.length - 1][0])];
		const scoresRight: number[] =
			closenessScores[people.indexOf(seatingOrder[seatingOrder.length - 1][1])];
		const combinedScores: number[] = combineArrays(scoresLeft, scoresRight);
		const combinedScoresSorted: number[] = [...combinedScores].sort(
			(a, b) => b - a
		);
		for (var i = 0; i < combinedScoresSorted.length; i++) {
			if (
				unSeatedPeople.includes(
					people[combinedScores.indexOf(combinedScoresSorted[i])]
				)
			) {
				nextCouple.push(
					people[combinedScores.indexOf(combinedScoresSorted[i])]
				);
				unSeatedPeople.splice(
					unSeatedPeople.indexOf(
						people[combinedScores.indexOf(combinedScoresSorted[i])]
					),
					1
				);
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
				nextCouple.push(
					people[scoresForSecondPick.indexOf(scoresForSecondPickSorted[i])]
				);
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

function combineArrays(array1: any[], array2: any[]): any[] {
	if (array1.length == 0) {
		return [];
	}
	return array1.map((element, index) => {
		return [element, array2[index]];
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
					] ?? 0;
				scoreLeft +=
					closenessScores[people.indexOf(seatLeft)][
						people.indexOf(seatingOrder[currentIndex - 1][1])
					] ?? 0;
			}
			if (currentIndex < seatingOrder.length - 1) {
				scoreLeft +=
					closenessScores[people.indexOf(seatLeft)][
						people.indexOf(seatingOrder[currentIndex + 1][0])
					] ?? 0;
				scoreLeft +=
					closenessScores[people.indexOf(seatLeft)][
						people.indexOf(seatingOrder[currentIndex + 1][1])
					] ?? 0;
			}
		}
		if (seatRight != "Empty seat") {
			if (currentIndex > 0) {
				scoreRight +=
					closenessScores[people.indexOf(seatRight)][
						people.indexOf(seatingOrder[currentIndex - 1][1])
					] ?? 0;
				scoreRight +=
					closenessScores[people.indexOf(seatRight)][
						people.indexOf(seatingOrder[currentIndex - 1][0])
					] ?? 0;
			}
			if (currentIndex < seatingOrder.length - 1) {
				scoreRight +=
					closenessScores[people.indexOf(seatRight)][
						people.indexOf(seatingOrder[currentIndex + 1][1])
					] ?? 0;
				scoreRight +=
					closenessScores[people.indexOf(seatRight)][
						people.indexOf(seatingOrder[currentIndex + 1][0])
					] ?? 0;
			}
		}
		seatingScores[currentIndex] = [
			seatLeft == "Empty seat"
				? seatLeft
				: `${seatLeft}; score: ${scoreLeft}/${maxScoreForPerson(
						people.indexOf(seatLeft),
						closenessScores
				  )}`,
			seatRight == "Empty seat"
				? seatRight
				: `${seatRight}; score: ${scoreRight}/${maxScoreForPerson(
						people.indexOf(seatRight),
						closenessScores
				  )}`,
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
	return maxScore;
}
