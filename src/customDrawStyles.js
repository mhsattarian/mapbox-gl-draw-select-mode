import { highlightPropertyName as _highlightPropertyName } from "./constants";

const highlightPropertyName = `user_${_highlightPropertyName}`;

const customDrawStyles = (defaultStyle) =>
  defaultStyle.concat([
    {
      id: "polygon-fill-hover",
      type: "fill",
      filter: [
        "all",
        // ["==", "active", "false"],
        ["==", "$type", "Polygon"],
        ["==", "user_hover", "true"],
      ],
      paint: {
        "fill-color": "#222",
        // "fill-outline-color": ["get", highlightPropertyName],
        "fill-opacity": 0.2,
      },
    },
    {
      id: "splitpolygon-stroke-active",
      type: "line",
      filter: [
        "all",
        ["==", "active", "false"],
        ["==", "$type", "Polygon"],
        ["has", highlightPropertyName],
      ],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": ["get", highlightPropertyName],
        "line-dasharray": [0.2, 2],
        "line-width": 2,
      },
    },
  ]);

export default customDrawStyles;
