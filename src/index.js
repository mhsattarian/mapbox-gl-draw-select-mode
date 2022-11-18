import { default as splitPolygonMode } from "./mode.js";
import { default as drawStyles } from "./customDrawStyles.js";

import { modeName } from "./constants";

export { splitPolygonMode };
export { drawStyles };

export default function SplitPolygonMode(modes) {
  return {
    ...modes,
    [modeName]: splitPolygonMode,
  };
}
