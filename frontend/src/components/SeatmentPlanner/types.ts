export type SeatingData = {
  tables: Pair[][];
};

export type Pair = {
  left: Person;
  right?: Person;
};

export type Person = {
  name: string;
  symbols: {
    color: string;
    shape: string;
  }[];
};
