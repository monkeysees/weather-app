/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce } from "lodash";

function getPxSizeFromEm(em: string) {
  return Number(em.slice(0, 2)) * 16;
}

const rootEl = document.documentElement;
const rootStyles = getComputedStyle(rootEl);
const largeScreenWidth = getPxSizeFromEm(
  rootStyles.getPropertyValue("--large-screen-width"),
);
const mediumScreenWidth = getPxSizeFromEm(
  rootStyles.getPropertyValue("--medium-screen-width"),
);
const smallScreenWidth = getPxSizeFromEm(
  rootStyles.getPropertyValue("--small-screen-width"),
);

function getFontChangeRate(currentWidth: number, baseWidth: number) {
  return currentWidth < baseWidth ? 0.15 : 1;
}

function handleWindowResize() {
  const windowWidth = window.innerWidth;
  const baseScreenWidth =
    windowWidth > mediumScreenWidth ? largeScreenWidth : smallScreenWidth;
  const fontChangeRate = getFontChangeRate(windowWidth, baseScreenWidth);
  const fontBaseSizeMultiplier =
    (windowWidth / baseScreenWidth) ** fontChangeRate;
  const newFontBaseSize = fontBaseSizeMultiplier * 62.5;
  rootEl.style.fontSize = `${newFontBaseSize.toFixed(4)}%`;
}

// eslint-disable-next-line import/prefer-default-export
export function registerWindowResizeHandler() {
  window.addEventListener("resize", debounce(handleWindowResize, 150));
  handleWindowResize();
}
