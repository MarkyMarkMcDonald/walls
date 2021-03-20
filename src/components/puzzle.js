import useLocalStorage from "@rehooks/local-storage";
import styled from "styled-components";
import * as React from "react";

const initialPuzzles = [
  [
    [2, null, 1, null, 3, null],
    [null, null, null, null, null, null],
    [null, null, null, 2, null, 3],
    [1, null, 4, null, null, null],
    [null, null, null, null, null, null],
    [null, 4, null, 2, null, 1],
  ],
]

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

const Puzzle = ({ number }) => {
  let [puzzle, setPuzzle] = useLocalStorage('github/MarkyMarkMcdonald/walls/1', initialPuzzles[number - 1])

  const toggleOpening = (rowIndex, cellIndex) => {
    const newPuzzle = [...puzzle];
    const currentValue = newPuzzle[rowIndex][cellIndex];
    newPuzzle[rowIndex][cellIndex] = nextValue(currentValue);
    setPuzzle(newPuzzle);
  }

  return (
    <PuzzleUI>
      <PuzzleSquare>
        {puzzle.map((row, rowIndex) => {
          return <Row>
            {row.map((cell, cellIndex) => {
              let inside;
              let onClick;
              if (typeof cell !== 'number') {
                onClick = () => toggleOpening(rowIndex, cellIndex)
                inside = <Opening line={cell}/>
              } else {
                inside = <Number>{cell}</Number>
              }

              return <Cell onClick={onClick}>{inside}</Cell>
            })
            }
          </Row>
        })}
      </PuzzleSquare>
    </PuzzleUI>
  )
}

const PuzzleUI = styled.div`
  font-size: clamp(100%, 1rem + 3vw, 100vMin);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PuzzleSquare = styled.div`
  display: flex;
  flex-direction: column;
  height: 65vMin;
  width: 65vMin;
`
const Cell = styled.div`
  align-items: center;
  
  border-left: 1px solid black;
  &:last-child {
    border-right: 1px solid black;
  }
  
  display: flex;
  flex: 1;
  text-align: center;
  justify-content: center;
  
  ${({ onClick }) => {
  if (onClick) {
    return `cursor: pointer;`
  }
}}
`
const Number = styled.div`
  flex: 1;
`
const Opening = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  
  &:after {
    ${({ line }) => {
  if (line === '|') {
    return `
          background: black;
          content: "";
          height: 90%;
          left: 50%;
          position: absolute;
          top: 5%;
          width: 2px;
        `
  } else if (line === '-') {
    return `
          background: black;
          content: "";
          position: absolute;
          left: 5%;
          top: 50%;
          height: 2px;
          width: 90%;
        `
  }
}}
  } 
`

const Row = styled.div`
  border-top: 1px solid black;
  &:last-child {
    border-bottom: 1px solid black;
  }
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: stretch;
`

export default Puzzle;