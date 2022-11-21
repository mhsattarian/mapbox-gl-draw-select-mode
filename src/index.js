import { default as selectFeatureMode } from "./mode.js";
import { default as drawStyles } from "./customDrawStyles.js";

import { modeName } from "./constants";

export { selectFeatureMode };
export { drawStyles };

export default function SelectFeatureMode(modes) {
  return {
    ...modes,
    [modeName]: selectFeatureMode,
  };
}
