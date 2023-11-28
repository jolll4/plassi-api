import createSeatingOrder from "./createSeatingOrder";

type WrittenUserInput = {
	request: string[];
};

export default function sortPeople(
	inputText: WrittenUserInput
): any[] | string {
	var people: string[] = inputText.request[0].trim().split(/\r?\n/);
	var groups: string[][] = [];
	inputText.request[1]
		.trim()
		.split(/\r?\n\n/)
		.forEach((group) => {
			groups.push(group.split(/\r?\n/));
		});
	var avecs: string[][] = [];
	inputText.request[2]
		.trim()
		.split(/\r?\n/)
		.forEach((avec) => {
			avecs.push(avec.split(/\r?;/));
		});

	people = trimElements(people);
	groups = trimElements(groups);
	avecs = trimElements(avecs);

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
