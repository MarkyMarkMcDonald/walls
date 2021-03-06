// Each row is comma separated. Periods represent empty cells.
const data = [
  "2.1.3.,......,...2.3,1.4...,......,.4.2.1",
  "3...2.2,..3....,3....5.,...2...,.2....3,....1..,2.1...3",
  "2...2...,3...3...,..0....1,..3....3,2....2..,1....4..,...2...4,...2...1",
  "...2.5...,.1.....4.,....2....,2.0...2.4,....1....,2.4...2.1,....1....,.4.....1.,...5.3...",
  ".2....1..2,5......4..,...21...3.,..1..4...4,..4...4...,...1...6..,3...2..3..,.2...23...,..2......4,4..4....3.",
  "4.2.3.2,.......,.2.1.4.,.......,3.4.2.3,.......,.1.2.4.",
  "3.1...3.,.3...3.2,..3.....,.2.2.1..,..1.2.1.,.....3..,3.2...2.,.2...2.1",
  "2..1.1..1,..2...2..,.1..2..2.,3..2.4..2,..3.3.3..,1..2.2..2,.2..3..2.,..2...2..,1..3.2..1",
  "...5....1.,6....3....,..0....3..,....7....3,.6....4...,...5....0.,6....2....,..5....5..,....5....6,.3....5...",
];

const hydrateString = (puzzleString) => {
  return puzzleString.split(",").map((row) =>
    Array.from(row).map((cell) => {
      return cell === "." ? null : parseInt(cell);
    })
  );
};

const puzzles = data.map((raw) => hydrateString(raw));

export default class InitialPuzzles {
  get(id) {
    return puzzles[id - 1];
  }

  maxId() {
    return puzzles.length;
  }

  minId() {
    return 1;
  }
}
