export default function createSeatingOrder(
	people: string[],
	groups: string[][],
	avecs: string[][]
): any[] {
	const closenessScores = calculateCloseness(people, groups, avecs);
	const unSeatedPeople: string[] = Object.assign([], people);
	var seatingOrder: string[][] = [];
	var nextPerson = people[0];
	while (unSeatedPeople.length > 0) {
		if (
			seatingOrder.length > 0 &&
			seatingOrder[seatingOrder.length - 1].length == 1
		) {
			seatingOrder[seatingOrder.length - 1].push(nextPerson);
		} else {
			seatingOrder.push([nextPerson]);
		}
		unSeatedPeople.splice(unSeatedPeople.indexOf(nextPerson), 1);
		if (unSeatedPeople.length > 0) {
			nextPerson = findClosestUnseatedNeighbor(
				nextPerson,
				people,
				unSeatedPeople,
				closenessScores
			);
		}
	}
	seatingOrder = swapEveryOtherSeat(seatingOrder);

	return seatingOrder;
}

function calculateCloseness(
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
						closenessScores[index][people.indexOf(groupMember)] += 2;
					}
				});
			}
		});
	});
	avecs.forEach((pair) => {
		closenessScores[people.indexOf(pair[0])][people.indexOf(pair[1])] += 50;
		closenessScores[people.indexOf(pair[1])][people.indexOf(pair[0])] += 50;
	});

	return closenessScores;
}

function findClosestUnseatedNeighbor(
	previousPerson: string,
	people: string[],
	unSeatedPeople: string[],
	closenessScores: number[][]
) {
	let availablePeople: [number, string][] = [];
	closenessScores[people.indexOf(previousPerson)].forEach((score, index) => {
		if (unSeatedPeople.includes(people[index])) {
			availablePeople.push([score, people[index]]);
		}
	});
	availablePeople = availablePeople.sort((a, b) => a[0] - b[0]);
	return availablePeople[availablePeople.length - 1][1];
}

function swapEveryOtherSeat(seatingOrder: string[][]): string[][] {
	return seatingOrder.map((seats, index) => {
		if (index % 2 == 1) {
			return (seats = [seats[1], seats[0]]);
		} else {
			return seats;
		}
	});
}
