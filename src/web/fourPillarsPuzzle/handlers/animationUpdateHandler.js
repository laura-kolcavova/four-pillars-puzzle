const PILLAR_ROTATE_ANIMATION_DURATION_IN_MS = 1000;

export const createAnimationUpdateHandler = (game, scene) => {
  const handle = (gameTime) => {
    if (scene.pillarsAreRotating) {
      return;
    }

    scene.uiPillars.forEach((uiPillar) => {
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

  return {
    handle,
  };
};

const handleUiPillarClockwiseRotation = (gameTime, uiPillar, puzzleGame) => {
  const deltaTime = gameTime.elapsedGameTimeInMs;

  const step = deltaTime / PILLAR_ROTATE_ANIMATION_DURATION_IN_MS;

  const newRotateAnimationProgress = uiPillar.rotateAnimationProgress + step;

  uiPillar.rotateAnimationProgress = Math.min(1.0, newRotateAnimationProgress);

  if (uiPillar.rotateAnimationProgress >= 1.0) {
    endUiPillarClockwiseRotation(uiPillar);
  }
};

const handleUiPillarCounterClockwiseRotation = (
  gameTime,
  uiPillar,
  puzzleGame,
) => {
  const deltaTime = gameTime.elapsedGameTimeInMs;

  const step = deltaTime / PILLAR_ROTATE_ANIMATION_DURATION_IN_MS;

  updateUiPillarRotateAnimationProgress(uiPillar, step);
  const newRotateAnimationProgress = uiPillar.rotateAnimationProgress + step;

  uiPillar.rotateAnimationProgress = Math.min(1.0, newRotateAnimationProgress);
};
