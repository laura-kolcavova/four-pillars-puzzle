import { createPuzzleGame } from "../../core/fourPillarsPuzzle/puzzleGame";
import { loadContent } from "./contentManager";
import { createUiPillar } from "./uiPillar";
import { createUiPillarButton } from "./uiPillarButton";
import {
  arrowClockwiseImage,
  arrowCounterClockwiseImage,
} from "./contentManager";
import { drawUiPillar, drawUiPillarButton } from "./renderer";

const PILLAR_RADIUS = 55;
const PILLAR_OFFSET_X = 220;
const PILLAR_OFFSET_Y = 120;

const PILLARS_GAP_X = 220;
const PILLARS_GAP_Y = 170;

const TURN_BUTTON_SIZE = 46;
const TURN_BUTTON_DISTANCE_FROM_CENTER = 86;

export const createPlayScene = (game) => {
  const scene = {
    puzzleGame: null,
    uiPillars: [],
    uiPillarButtons: [],
  };

  const initialize = () => {
    loadContent();

    scene.puzzleGame = createPuzzleGame();

    scene.uiPillars = createUiPillars(scene.puzzleGame.puzzle.pillars);

    scene.uiPillarButtons = createUiPillarButtons(scene.uiPillars);
  };

  const update = (gameTime) => {};

  const draw = (gameTime) => {
    drawUiPillars(game.canvasContext, scene.uiPillars);
    drawUiPillarButtons(game.canvasContext, scene.uiPillarButtons);
  };

  return {
    initialize,
    update,
    draw,
  };
};

const createUiPillars = (pillars) => {
  const uiPillars = pillars.map((pillar, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;

    const centerX = PILLAR_OFFSET_X + col * PILLARS_GAP_X;
    const centerY = PILLAR_OFFSET_Y + row * PILLARS_GAP_Y;

    return createUiPillar(pillar, centerX, centerY, PILLAR_RADIUS);
  });

  return uiPillars;
};

const createUiPillarButtons = (uiPillars) => {
  const uiPillarButtons = [];

  uiPillars.forEach((uiPillar) => {
    const turnClockwiseButton = createTurnClockwiseButton(uiPillar);
    const turnCounterClockwiseButton =
      createTurnCounterClockwiseButton(uiPillar);

    uiPillarButtons.push(turnClockwiseButton);
    uiPillarButtons.push(turnCounterClockwiseButton);
  });

  return uiPillarButtons;
};

const createTurnClockwiseButton = (uiPillar) => {
  const { centerX, centerY } = uiPillar;

  const angle = -Math.PI / 4;

  const x = centerX + Math.cos(angle) * TURN_BUTTON_DISTANCE_FROM_CENTER;
  const y = centerY + Math.sin(angle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

  const rotate = -(45 * Math.PI) / 180;

  return createUiPillarButton(
    x,
    y,
    TURN_BUTTON_SIZE,
    TURN_BUTTON_SIZE,
    arrowClockwiseImage,
    rotate,
    undefined,
  );
};

const createTurnCounterClockwiseButton = (uiPillar) => {
  const { centerX, centerY } = uiPillar;

  const angle = -Math.PI / 4 - Math.PI / 2;

  const x = centerX + Math.cos(angle) * TURN_BUTTON_DISTANCE_FROM_CENTER;
  const y = centerY + Math.sin(angle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

  const rotate = (45 * Math.PI) / 180;

  return createUiPillarButton(
    x,
    y,
    TURN_BUTTON_SIZE,
    TURN_BUTTON_SIZE,
    arrowCounterClockwiseImage,
    rotate,
    undefined,
  );
};

const drawUiPillars = (context, uiPillars) => {
  uiPillars.forEach((uiPillar) => {
    drawUiPillar(context, uiPillar);
  });
};

const drawUiPillarButtons = (context, uiPillarButtons) => {
  uiPillarButtons.forEach((uiPillarButton) => {
    drawUiPillarButton(context, uiPillarButton);
  });
};
