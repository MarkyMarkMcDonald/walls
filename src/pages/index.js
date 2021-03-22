import * as React from "react";
import Solver from "../components/solver";
import useLocalStorage from "../hooks/useLocalStorage";
import InitialPuzzles from "../data/initialPuzzles";
import Puzzle from "../core/puzzle";
import styled from "styled-components";

const initialPuzzles = new InitialPuzzles();

const IndexPage = () => {
  let [puzzleId, setPuzzleId] = useLocalStorage("github/MarkyMarkMcDonald/walls/currentPuzzle", 1);

  return (
    <Main>
      <title>Walls | Puzzle {puzzleId}</title>
      <PuzzleLoader key={puzzleId} puzzleId={puzzleId} />
      <Stepper
        puzzleId={puzzleId}
        setPuzzleId={setPuzzleId}
        maxPuzzleId={initialPuzzles.maxId()}
        minPuzzleId={initialPuzzles.minId()}
      />
    </Main>
  );
};

const PuzzleLoader = ({puzzleId}) => {
  let [puzzleData, setPuzzleData] = useLocalStorage(
    `github/MarkyMarkMcdonald/walls/${puzzleId}`,
    initialPuzzles.get(puzzleId)
  );

  const puzzle = new Puzzle(puzzleData, setPuzzleData);

  return (<Solver puzzle={puzzle} />)
}

const Stepper = ({ puzzleId, setPuzzleId, maxPuzzleId, minPuzzleId }) => {
  return (
    <StepperContainer>
      <Switcher disabled={puzzleId <= minPuzzleId} onClick={() => setPuzzleId(puzzleId - 1)}>
        {"<"}
      </Switcher>
      {puzzleId}
      <Switcher disabled={puzzleId >= maxPuzzleId} onClick={() => setPuzzleId(puzzleId + 1)}>
        {">"}
      </Switcher>
    </StepperContainer>
  );
};

const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Switcher = styled.button`
  margin-left: 8px;
  margin-right: 8px;
  font-size: clamp(100%, 1rem + 3vw, 100vmin);
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: clamp(100%, 1rem + 3vw, 100vmin);
  justify-content: space-evenly;
  height: 85vh;
`;

export default IndexPage;
