import { createPillar } from "./pillar";

export const POSITION_LEFT_TOP = 0;
export const POSITION_RIGHT_TOP = 1;
export const POSITION_LEFT_BOTTOM = 2;
export const POSITION_RIGHT_BOTTOM = 3;

export const createPuzzle = () => {
  const puzzle = {};

  puzzle.isSolved = false;

  puzzle.pillars = initializePillars();

  puzzle.connectedPositions = initializeConnectedPositions();

  puzzle.getPillar = (position) => {
    const pillar = puzzle.pillars[position];

    return pillar;
  };

  puzzle.getConnectedPositions = (position) => {
    const connectedPositions = puzzle.connectedPositions[position];

    return connectedPositions;
  };

  puzzle.rotatePillarClockwise = (position) => {
    const connectedPositions = puzzle.getConnectedPositions(position);

    const masterPillar = puzzle.getPillar(position);
    const slavePillarA = puzzle.getPillar(connectedPositions[0]);
    const slavePillarB = puzzle.getPillar(connectedPositions[1]);

    masterPillar.rotateClockwise();
    slavePillarA.rotateClockwise();
    slavePillarB.rotateClockwise();
  };

  puzzle.rotatePillarCounterClockwise = (position) => {
    const connectedPositions = puzzle.getConnectedPositions(position);

    const masterPillar = puzzle.getPillar(position);
    const slavePillarA = puzzle.getPillar(connectedPositions[0]);
    const slavePillarB = puzzle.getPillar(connectedPositions[1]);

    masterPillar.rotateCounterClockwise();
    slavePillarA.rotateCounterClockwise();
    slavePillarB.rotateCounterClockwise();
  };

  return puzzle;
};

const initializePillars = () => {
  const pillars = [];

  pillars[POSITION_LEFT_TOP] = createPillar(POSITION_LEFT_TOP);
  pillars[POSITION_RIGHT_TOP] = createPillar(POSITION_RIGHT_TOP);
  pillars[POSITION_LEFT_BOTTOM] = createPillar(POSITION_LEFT_BOTTOM);
  pillars[POSITION_RIGHT_BOTTOM] = createPillar(POSITION_RIGHT_BOTTOM);

  return pillars;
};

const initializeConnectedPositions = () => {
  const connectedPositions = [];

  connectedPositions[POSITION_LEFT_TOP] = [
    POSITION_LEFT_BOTTOM,
    POSITION_RIGHT_TOP,
  ];

  connectedPositions[POSITION_RIGHT_TOP] = [
    POSITION_LEFT_TOP,
    POSITION_RIGHT_BOTTOM,
  ];

  connectedPositions[POSITION_LEFT_BOTTOM] = [
    POSITION_RIGHT_BOTTOM,
    POSITION_LEFT_TOP,
  ];

  connectedPositions[POSITION_RIGHT_BOTTOM] = [
    POSITION_RIGHT_TOP,
    POSITION_LEFT_BOTTOM,
  ];

  return connectedPositions;
};
