import createSeatingOrder from "./createSeatingOrder";

type WrittenUserInput = {
	request: string[];
};

export default function sortPeople(
	inputText: WrittenUserInput
): any[] | string {
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
