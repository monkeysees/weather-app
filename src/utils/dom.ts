import { debounce } from "lodash";

function getPxSizeFromEm(em: string) {
  return Number(em.slice(0, -2)) * 16;
}

// eslint-disable-next-line import/prefer-default-export
export function registerWindowResizeHandler() {
  // Initialization of variables and functions is put into register function
  // in order for all DOM elements to have valid values.
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

  function getFontChangeRate(currentWidth: number) {
    if (currentWidth < mediumScreenWidth) {
      return currentWidth < smallScreenWidth ? 0.375 : 0.75;
    }

    return currentWidth < largeScreenWidth ? 0.15 : 1.15;
  }

  function handleWindowResize() {
    const windowWidth = window.innerWidth;
    const baseScreenWidth =
      windowWidth > mediumScreenWidth ? largeScreenWidth : smallScreenWidth;
    const fontChangeRate = getFontChangeRate(windowWidth);
    const fontBaseSizeMultiplier =
      (windowWidth / baseScreenWidth) ** fontChangeRate;
    const newFontBaseSize = fontBaseSizeMultiplier * 62.5;
    rootEl.style.fontSize = `${newFontBaseSize.toFixed(4)}%`;
  }

  window.addEventListener("resize", debounce(handleWindowResize, 150));
  handleWindowResize();
}
