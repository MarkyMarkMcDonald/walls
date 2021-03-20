import * as React from "react";
import Solver from "../components/solver";
import useLocalStorage from "@rehooks/local-storage";
import InitialPuzzles from "../data/initialPuzzles";
import Puzzle from "../core/puzzle";
import styled from "styled-components";

const IndexPage = () => {
  const initialPuzzles = new InitialPuzzles();

  let [puzzleId, setPuzzleId] = useLocalStorage("github/MarkyMarkMcDonald/walls/currentPuzzle", 1);
  let [puzzleData, setPuzzleData] = useLocalStorage(
    `github/MarkyMarkMcdonald/walls/${puzzleId}`,
    initialPuzzles.get(puzzleId)
  );

  const puzzle = new Puzzle(puzzleData, setPuzzleData);

  return (
    <Main>
      <title>Walls | Puzzle {puzzleId}</title>
      <Solver puzzle={puzzle} />
      <Stepper
        puzzleId={puzzleId}
        setPuzzleId={setPuzzleId}
        maxPuzzleId={initialPuzzles.maxId()}
        minPuzzleId={initialPuzzles.minId()}
      />
    </Main>
  );
};

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
  margin-top: 64px;
  display: flex;
  justify-content: center;
`;

const Switcher = styled.button`
  margin-left: 8px;
  margin-right: 8px;
  font-size: clamp(100%, 1rem + 3vw, 100vmin);
`;

const Main = styled.main`
  font-size: clamp(100%, 1rem + 3vw, 100vmin);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default IndexPage;
