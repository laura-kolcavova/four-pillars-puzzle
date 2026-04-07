import { drawUiPillarButton } from "../renderers/uiPillarButtonRenderer";
import { drawUiPillar } from "../renderers/uiPillarRenderer";

export const createRenderDrawHandler = (game, scene, puzzle) => {
  const handle = (gameTime) => {
    drawUiPillars();
    drawUiPillarButtons();
  };

  const drawUiPillars = () => {
    scene.uiPillars.forEach((uiPillar) => {
      drawUiPillar(game.canvasContext, puzzle, uiPillar);
    });
  };

  const drawUiPillarButtons = () => {
    scene.uiPillarButtons.forEach((uiPillarButton) => {
      drawUiPillarButton(game.canvasContext, uiPillarButton);
    });
  };

  return {
    handle,
  };
};
