import { createPuzzleGame } from "../../core/fourPillarsPuzzle/puzzleGame";
import { loadContent } from "./contentManager";
import { createUiPillar } from "./uiPillar";
import { createUiPillarButton } from "./uiPillarButton";
import {
  arrowClockwiseImage,
  arrowCounterClockwiseImage,
} from "./contentManager";
import { drawUiPillar, drawUiPillarButton } from "./renderer";
import {
  POSITION_LEFT_BOTTOM,
  POSITION_LEFT_TOP,
  POSITION_RIGHT_BOTTOM,
  POSITION_RIGHT_TOP,
} from "../../core/fourPillarsPuzzle/puzzle";

const PILLAR_RADIUS = 55;
const PILLAR_OFFSET_X = 220;
const PILLAR_OFFSET_Y = 120;

const PILLAR_ROTATE_ANIMATION_DURATION_IN_MS = 1000;

const PILLAR_POSITION_MAP = {
  [POSITION_LEFT_TOP]: [0, 0],
  [POSITION_RIGHT_TOP]: [0, 1],
  [POSITION_LEFT_BOTTOM]: [1, 0],
  [POSITION_RIGHT_BOTTOM]: [1, 1],
};

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

    scene.uiPillarButtons = createUiPillarButtons(
      scene.uiPillars,
      scene.puzzleGame,
    );
  };

  const handleClick = (x, y) => {
    for (const uiPillarButton of scene.uiPillarButtons) {
      if (
        x >= uiPillarButton.left &&
        x <= uiPillarButton.right &&
        y >= uiPillarButton.top &&
        y <= uiPillarButton.bottom
      ) {
        uiPillarButton.onClick?.();

        return;
      }
    }
  };

  const handleMouseMove = (x, y) => {
    for (const uiPillarButton of scene.uiPillarButtons) {
      const isIntersect =
        x >= uiPillarButton.left &&
        x <= uiPillarButton.right &&
        y >= uiPillarButton.top &&
        y <= uiPillarButton.bottom;

      if (isIntersect && !uiPillarButton.isHover) {
        uiPillarButton.isHover = true;

        return;
      }

      if (!isIntersect && uiPillarButton.isHover) {
        uiPillarButton.isHover = false;

        return;
      }
    }
  };

  const update = (gameTime) => {
    updateUiPillars(gameTime, scene.uiPillars, scene.puzzleGame);
  };

  const draw = (gameTime) => {
    drawUiPillars(game.canvasContext, scene.uiPillars);
    drawUiPillarButtons(game.canvasContext, scene.uiPillarButtons);
  };

  return {
    initialize,
    update,
    draw,
    handleClick,
    handleMouseMove,
  };
};

const createUiPillars = (pillars) => {
  const uiPillars = pillars.map((pillar) => {
    const pillarMappedPosition = PILLAR_POSITION_MAP[pillar.position];

    const row = pillarMappedPosition[0];
    const col = pillarMappedPosition[1];

    const centerX = PILLAR_OFFSET_X + col * PILLARS_GAP_X;
    const centerY = PILLAR_OFFSET_Y + row * PILLARS_GAP_Y;

    return createUiPillar(pillar, centerX, centerY, PILLAR_RADIUS);
  });

  return uiPillars;
};

const createUiPillarButtons = (uiPillars, puzzleGame) => {
  const uiPillarButtons = [];

  uiPillars.forEach((uiPillar) => {
    const turnClockwiseButton = createTurnClockwiseButton(uiPillar, puzzleGame);
    const turnCounterClockwiseButton = createTurnCounterClockwiseButton(
      uiPillar,
      puzzleGame,
    );

    uiPillarButtons.push(turnClockwiseButton);
    uiPillarButtons.push(turnCounterClockwiseButton);
  });

  return uiPillarButtons;
};

const createTurnClockwiseButton = (uiPillar, puzzleGame) => {
  const pillarAngle = -Math.PI / 4;

  const centerX =
    uiPillar.centerX + Math.cos(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;
  const centerY =
    uiPillar.centerY + Math.sin(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

  const rotate = -(45 * Math.PI) / 180;

  const onClick = () => {
    startUiPillarClockwiseRotation(uiPillar);
  };

  return createUiPillarButton(
    centerX,
    centerY,
    TURN_BUTTON_SIZE,
    TURN_BUTTON_SIZE,
    arrowClockwiseImage,
    rotate,
    onClick,
  );
};

const createTurnCounterClockwiseButton = (uiPillar, puzzleGame) => {
  const pillarAngle = -Math.PI + Math.PI / 4;

  const centerX =
    uiPillar.centerX + Math.cos(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

  const centerY =
    uiPillar.centerY + Math.sin(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

  const rotate = (45 * Math.PI) / 180;

  const onClick = () => {
    startUiPillarCounterClockwiseRotation(uiPillar);
  };

  return createUiPillarButton(
    centerX,
    centerY,
    TURN_BUTTON_SIZE,
    TURN_BUTTON_SIZE,
    arrowCounterClockwiseImage,
    rotate,
    onClick,
  );
};

const startUiPillarClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingClockwise = true;
  uiPillar.rotateAnimationProgress = 0;
};

const startUiPillarCounterClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingCounterClockwise = true;
  uiPillar.rotateAnimationProgress = 0;
};

const endUiPillarClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingClockwise = false;
  uiPillar.rotateAnimationProgress = 0;
};

const endUiPillarCounterClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingCounterClockwise = false;
  uiPillar.rotateAnimationProgress = 0;
};

const handleUiPillarClockwiseRotation = (gameTime, uiPillar, puzzleGame) => {
  const deltaTime = gameTime.elapsedGameTimeInMs;

  const step = deltaTime / PILLAR_ROTATE_ANIMATION_DURATION_IN_MS;

  const newRotateAnimationProgress = uiPillar.rotateAnimationProgress + step;

  uiPillar.rotateAnimationProgress = Math.min(1.0, newRotateAnimationProgress);

  if (uiPillar.rotateAnimationProgress >= 1.0) {
    endUiPillarClockwiseRotation(uiPillar);
    // puzzleGame.rotatePillarClockwise(uiPillar.pillar.position);
  }
};

const handleUiPillarCounterClockwiseRotation = (
  gameTime,
  uiPillar,
  puzzleGame,
) => {
  const deltaTime = gameTime.elapsedGameTimeInMs;

  const step = deltaTime / PILLAR_ROTATE_ANIMATION_DURATION_IN_MS;

  const newRotateAnimationProgress = uiPillar.rotateAnimationProgress + step;

  uiPillar.rotateAnimationProgress = Math.min(1.0, newRotateAnimationProgress);

  if (uiPillar.rotateAnimationProgress >= 1.0) {
    endUiPillarCounterClockwiseRotation(uiPillar);
    // puzzleGame.rotatePillarCounterClockwise(uiPillar.pillar.position);
  }
};

const updateUiPillars = (gameTime, uiPillars, puzzleGame) => {
  uiPillars.forEach((uiPillar) => {
    if (uiPillar.isRotatingClockwise) {
      handleUiPillarClockwiseRotation(gameTime, uiPillar, puzzleGame);

      return;
    }

    if (uiPillar.isRotatingCounterClockwise) {
      handleUiPillarCounterClockwiseRotation(gameTime, uiPillar, puzzleGame);

      return;
    }
  });
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
