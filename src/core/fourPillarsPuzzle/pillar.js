const PILLAR_INITIAL_ROTATION_STATE = 0;
const PILLAR_LAST_ROTATION_STATE = 3;

export const createPillar = (position) => {
  const pillar = {};

  pillar.position = position;
  pillar.rotationState = PILLAR_INITIAL_ROTATION_STATE;

  pillar.rotateClockwise = () => {
    if (pillar.rotationState === PILLAR_LAST_ROTATION_STATE) {
      pillar.rotationState = PILLAR_INITIAL_ROTATION_STATE;

      return;
    }

    pillar.rotationState++;
  };

  pillar.rotateCounterClockwise = () => {
    if (pillar.rotationState === PILLAR_INITIAL_ROTATION_STATE) {
      pillar.rotationState = PILLAR_LAST_ROTATION_STATE;

      return;
    }

    pillar.rotationState--;
  };

  return pillar;
};
