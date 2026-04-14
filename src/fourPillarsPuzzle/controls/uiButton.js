export const createUiButton = (
  centerX,
  centerY,
  width,
  height,
  text,
  onClick,
) => {
  const left = centerX - width / 2;
  const top = centerY - height / 2;
  const right = centerX + width / 2;
  const bottom = centerY + height / 2;

  return {
    centerX,
    centerY,
    left,
    top,
    right,
    bottom,
    width,
    height,
    onClick,
    text,
    isHover: false,
  };
};

export const uiButtonIntersectsWithPoint = (uiButton, x, y) => {
  return (
    x >= uiButton.left &&
    x <= uiButton.right &&
    y >= uiButton.top &&
    y <= uiButton.bottom
  );
};
