import { group } from "console";
import createSeatingOrder from "./createSeatingOrder";

type WrittenUserInput = {
	request: string[];
};

type NamedGroup = {
	[groupName: string]: string[];
};

export function sortPeople(inputText: WrittenUserInput): any[] | string {
	var people: string[] = inputText.request[0].trim().split(/\r?\n/);
	people = trimElements(people);

	var groups: string[][] = [];
	if (inputText.request[1]) {
		inputText.request[1]
			.trim()
			.split(/\r?\n\n/)
			.forEach((group) => {
				groups.push(group.split(/\r?\n/));
			});
		groups = trimElements(groups);
	}

	var avecs: string[][] = [];
	if (inputText.request[2]) {
		inputText.request[2]
			.trim()
			.split(/\r?\n/)
			.forEach((avec) => {
				avecs.push(avec.split(/\r?;/));
			});
		avecs = trimElements(avecs);
	}

	if (checkForDuplicates(people)) {
		return "There are duplicate people in the list";
	}

	return createSeatingOrder(people, groups, avecs);
}

export function sortPeopleCsv(inputText: string[][]): any[] | string {
	const people: string[] = trimElements(
		inputText.map((person) => {
			return person[0];
		})
	);
	const avecs: string[][] = [];

	inputText.forEach((person) => {
		if (
			person[0] != "" &&
			person[1] != "" &&
			!avecs.includes([person[1], person[0]])
		) {
			avecs.push([person[0], person[1]]);
		}
	});

	const groupData: string[] = inputText.map((person) => {
		return person[2];
	});

	const groups: string[][] = createGroups(people, groupData);

	if (checkForDuplicates(people)) {
		return "There are duplicate people in the list";
	}

	return createSeatingOrder(people, groups, avecs);
}

function trimElements(array: any[]): any[] {
	return array.map((element) => {
		if (Array.isArray(element)) {
			return trimElements(element);
		} else {
			return element.trim();
		}
	});
}

function checkForDuplicates(input: string[]): boolean {
	var hasDuplicates: boolean = false;
	input.forEach((element) => {
		var count = 0;
		for (var i = 0; i < input.length; i++) {
			if (input[i] == element) {
				count++;
			}
		}
		if (count != 1) {
			hasDuplicates = true;
		}
	});
	return hasDuplicates;
}

function createGroups(people: string[], groupData: string[]): string[][] {
	const namedGroups: NamedGroup = {};
	groupData.forEach((group, index) => {
		if (people.includes(group) && !namedGroups[`${people[index]}_${group}`]) {
			namedGroups[`${group}_${people[index]}`] = [group, people[index]];
		}
		if (group != "") {
			if (namedGroups[group]) {
				namedGroups[group].push(people[index]);
			} else {
				namedGroups[group] = [people[index]];
			}
		}
	});
	const groups: string[][] = [];

	Object.keys(namedGroups).forEach((group) => {
		groups.push(namedGroups[group]);
	});
	return groups;
}
