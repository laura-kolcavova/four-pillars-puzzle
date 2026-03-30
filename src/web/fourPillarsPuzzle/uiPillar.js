export const createUiPillar = (pillar, centerX, centerY, radius) => {
  return {
    pillar,
    radius,
    centerX,
    centerY,
    isRotatingClockwise: false,
    isRotatingCounterClockwise: false,
    rotateAnimationProgress: 0,
  };
};
