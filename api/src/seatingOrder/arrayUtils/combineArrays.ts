export default function combineArrays(
  array1: number[],
  array2: number[]
): any[] {
  if (array1.length == 0) {
    return [];
  }
  return array1.map((element, index) => {
    return [1 * element + 1 * array2[index]];
  });
}
