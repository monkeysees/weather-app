import { countBy, maxBy, nth } from "lodash";

function getMostFreqValue(arr: unknown[]) {
  return nth(maxBy(Object.entries(countBy(arr)), 1), 0);
}

// eslint-disable-next-line import/prefer-default-export
export { getMostFreqValue };
