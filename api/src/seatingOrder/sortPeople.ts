type WrittenUserInput = {
	request: string[];
};

export default function SortPeople(
	inputText: WrittenUserInput
): any[] | string {
	const people: string[] = inputText.request[0].trim().split(/\r?\n/);
	const groups: string[][] = [];
	inputText.request[1]
		.trim()
		.split(/\r?\n\n/)
		.forEach((group) => {
			groups.push(group.split(/\r?\n/));
		});
	const avecs: string[][] = [];
	inputText.request[2]
		.trim()
		.split(/\r?\n/)
		.forEach((avec) => {
			avecs.push(avec.split(/\r?;/));
		});

	if (checkForDuplicates(people)) {
		return "There are duplicate people in the list";
	}

	return people;
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
