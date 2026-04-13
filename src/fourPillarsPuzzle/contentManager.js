import arrowClockwiseUrl from "../../images/arrow_clockwise.svg";
import arrowCounterClockwiseUrl from "../../images/arrow_counterclockwise.svg";
import restartUrl from "../../images/restart.svg";
import restartHoverUrl from "../../images/restart_hover.svg";

export let arrowClockwiseImage = null;

export let arrowCounterClockwiseImage = null;

export let restartImage = null;

export let restartHoverImage = null;

export const loadContent = () => {
  arrowClockwiseImage = loadImage(arrowClockwiseUrl);
  arrowCounterClockwiseImage = loadImage(arrowCounterClockwiseUrl);
  restartImage = loadImage(restartUrl);
  restartHoverImage = loadImage(restartHoverUrl);
};

const loadImage = (url) => {
  const img = new Image();

  img.src = url;

  return img;
};
