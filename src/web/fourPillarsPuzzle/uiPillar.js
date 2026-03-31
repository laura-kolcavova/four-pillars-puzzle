export const createUiPillar = (pillarPosition, centerX, centerY, radius) => {
  return {
    pillarPosition,
    radius,
    centerX,
    centerY,
    isRotatingClockwise: false,
    isRotatingCounterClockwise: false,
    rotateAnimationProgress: 0,
  };
};

export const startUiPillarClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingClockwise = true;
  uiPillar.rotateAnimationProgress = 0;
};

export const startUiPillarCounterClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingCounterClockwise = true;
  uiPillar.rotateAnimationProgress = 0;
};

export const endUiPillarClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingClockwise = false;
  uiPillar.rotateAnimationProgress = 0;
};

export const endUiPillarCounterClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingCounterClockwise = false;
  uiPillar.rotateAnimationProgress = 0;
};

export const updateUiPillarRotateAnimationProgress = (uiPillar, step) => {
  const newRotateAnimationProgress = uiPillar.rotateAnimationProgress + step;

  uiPillar.rotateAnimationProgress = Math.min(1.0, newRotateAnimationProgress);
};
