export const drawUiPillarButton = (context, uiPillarButton) => {
  const { centerX, centerY, width, height, img, rotate, isHover } =
    uiPillarButton;

  const halfX = width / 2;
  const halfY = height / 2;

  context.save();
  context.translate(centerX, centerY);
  context.rotate(rotate);

  context.beginPath();
  context.arc(0, 0, Math.min(halfX, halfY), 0, 2 * Math.PI);
  context.fillStyle = isHover ? "#bfdbfe" : "#e5e7eb";
  context.fill();

  context.drawImage(img, -halfX, -halfY, width, height);

  context.restore();
};
