[![NPM](https://img.shields.io/npm/v/mapbox-gl-draw-select-mode.svg)](https://www.npmjs.com/package/mapbox-gl-draw-select-mode)
![Release](https://github.com/mhsattarian/mapbox-gl-draw-select-mode/workflows/Release/badge.svg)

# mapbox-gl-draw-select-mode

A custom mode for [MapboxGL-Draw](https://github.com/mapbox/mapbox-gl-draw) to select features that highlights features on hover.

## Install

```bash
npm install mapbox-gl-draw-select-mode
```

or use CDN:

```html
<script src="https://unpkg.com/mapbox-gl-draw-select-mode"></script>
```

## Usage

```js
import mapboxGl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import defaultDrawStyle from "@mapbox/mapbox-gl-draw/src/lib/theme.js";

import SelectFeatureMode, {
  drawStyles as selectFeatureDrawStyles,
} from "mapbox-gl-draw-select-mode";

const map = new mapboxgl.Map({
  container: "map",
  center: [-91.874, 42.76],
  zoom: 12,
});

draw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false,
  modes: {
    ...SelectFeatureMode(MapboxDraw.modes),
  },
  styles: [...selectFeatureDrawStyles(defaultDrawStyle)],
  userProperties: true,
  // Config select-mode
  selectHighlightColor: "red",
});

map.addControl(draw);

draw?.changeMode("select_feature", {
  /// you can override the highlight color for this operation:
  selectHighlightColor: "blue",
  onSelect(selectedFeatureID) {
    alert(`Selected Feature ID: ${selectedFeatureID}`);
  },
});
```
