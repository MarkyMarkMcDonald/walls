const nextValue = (currentValue) => {
  switch (currentValue) {
    case null:
      return '-'
    case '-':
      return '|'
    case '|':
      return null
    default:
      throw new Error(`Do not know next value of: ${currentValue}`)
  }
}

export default class Puzzle {
  constructor(puzzleData, setPuzzleData) {
    this.puzzleData = puzzleData
    this.setPuzzleData = setPuzzleData
  }

  toggleOpening(rowIndex, cellIndex) {
    const newPuzzle = [...this.puzzleData];
    const currentValue = newPuzzle[rowIndex][cellIndex];
    newPuzzle[rowIndex][cellIndex] = nextValue(currentValue);
    this.setPuzzleData(newPuzzle);
  }

  rows() {
    return this.puzzleData;
  }
}
