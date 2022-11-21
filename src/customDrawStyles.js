import {
  modeName,
  highlightPropertyName as _highlightPropertyName,
} from "./constants";

const highlightPropertyName = `user_${_highlightPropertyName}`;

const customDrawStyles = (defaultStyle) =>
  defaultStyle.concat([
    {
      id: `${modeName}-fill`,
      type: "fill",
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["has", highlightPropertyName],
      ],
      paint: {
        "fill-color": ["get", highlightPropertyName],
        "fill-outline-color": ["get", highlightPropertyName],
        "fill-opacity": 0.2,
      },
    },
    {
      id: `${modeName}-stroke`,
      type: "line",
      filter: [
        "all",
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
    {
      id: `${modeName}-line`,
      type: "line",
      filter: [
        "all",
        ["==", "$type", "LineString"],
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
    {
      id: `${modeName}-point`,
      type: "circle",
      filter: ["all", ["==", "$type", "Point"], ["has", highlightPropertyName]],
      paint: {
        "circle-color": ["get", highlightPropertyName],
        "circle-radius": 3,
      },
    },
  ]);

export default customDrawStyles;
