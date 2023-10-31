

type WrittenUserInput = {
    request: string,
}

export default function SortPeople(inputText: WrittenUserInput): string {
    return inputText.request;
}