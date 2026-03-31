export const createRenderDrawHandler = (game, scene) => {
  const handle = (gameTime) => {
    if (scene.pillarsAreRotating) {
      drawUiPillars(game.canvasContext, scene.puzzleGame, scene.uiPillars);
    } else {
      drawUiPillars(game.canvasContext, scene.puzzleGame, scene.uiPillars);
      drawUiPillarButtons(game.canvasContext, scene.uiPillarButtons);
    }
  };

  return {
    handle,
  };
};

const drawUiPillars = (context, puzzleGame, uiPillars) => {
  uiPillars.forEach((uiPillar) => {
    drawUiPillar(context, puzzleGame, uiPillar);
  });
};

const drawUiPillarButtons = (context, uiPillarButtons) => {
  uiPillarButtons.forEach((uiPillarButton) => {
    drawUiPillarButton(context, uiPillarButton);
  });
};
