import rotateClockwiseUrl from "../../images/rotate_clockwise.svg";
import rotateClockwiseHoverUrl from "../../images/rotate_clockwise_hover.svg";
import rotateCounterClockwiseUrl from "../../images/rotate_counterclockwise.svg";
import rotateCounterClockwiseHoverUrl from "../../images/rotate_counterclockwise_hover.svg";
import restartUrl from "../../images/restart.svg";
import restartHoverUrl from "../../images/restart_hover.svg";

export let arrowClockwiseImage = null;

export let arrowClockwiseHoverImage = null;

export let arrowCounterClockwiseImage = null;

export let arrowCounterClockwiseHoverImage = null;

export let restartImage = null;

export let restartHoverImage = null;

export const loadContent = () => {
  arrowClockwiseImage = loadImage(rotateClockwiseUrl);
  arrowClockwiseHoverImage = loadImage(rotateClockwiseHoverUrl);
  arrowCounterClockwiseImage = loadImage(rotateCounterClockwiseUrl);
  arrowCounterClockwiseHoverImage = loadImage(rotateCounterClockwiseHoverUrl);
  restartImage = loadImage(restartUrl);
  restartHoverImage = loadImage(restartHoverUrl);
};

const loadImage = (url) => {
  const img = new Image();

  img.src = url;

  return img;
};
