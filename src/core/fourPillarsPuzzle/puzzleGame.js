import { createPuzzle } from "./puzzle";

export const createPuzzleGame = () => {
  const puzzle = createPuzzle();

  const getConnectedPillars = (pillar) => {
    const position = pillar.position;
    const connectedPositions = puzzle.connectedPositions[position];

    const connectedPillarA = puzzle.pillars[connectedPositions[0]];
    const connectedPillarB = puzzle.pillars[connectedPositions[1]];

    return [connectedPillarA, connectedPillarB];
  };

  const rotatePillarClockwise = (pillar) => {
    const connectedPillars = getConnectedPillars(pillar);

    rotateSinglePillarClockwise(pillar);
    rotateSinglePillarClockwise(connectedPillars[0]);
    rotateSinglePillarClockwise(connectedPillars[1]);
  };

  const rotatePillarCounterClockwise = (pillar) => {
    const connectedPillars = getConnectedPillars(pillar);

    rotateSinglePillarCounterClockwise(pillar);
    rotateSinglePillarCounterClockwise(connectedPillars[0]);
    rotateSinglePillarCounterClockwise(connectedPillars[1]);
  };

  return {
    puzzle,
    getConnectedPillars,
    rotatePillarClockwise,
    rotatePillarCounterClockwise,
  };
};

const rotateSinglePillarClockwise = (pillar) => {
  if (pillar.rotationState === pillar.parts.length - 1) {
    pillar.rotationState = 0;

    return;
  }

  pillar.rotationState++;
};

const rotateSinglePillarCounterClockwise = (pillar) => {
  if (pillar.rotationState === 0) {
    pillar.rotationState = pillar.parts.length - 1;

    return;
  }

  pillar.rotationState--;
};
