import SelectFeatureMode, { drawStyles as selectFeatureDrawStyles } from "..";
import defaultDrawStyle from "https://unpkg.com/@mapbox/mapbox-gl-draw@1.3.0/src/lib/theme.js";

import "./index.css";

let map;
let draw;
let drawBar;

const selectFeature = () => {
  try {
    draw?.changeMode("select_feature", {
      // selectHighlightColor: "blue",
      onSelect(selectedFeatureID) {
        alert(`Selected Feature ID: ${selectedFeatureID}`);
      },
    });
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
};

class extendDrawBar {
  constructor(opt) {
    let ctrl = this;
    ctrl.draw = opt.draw;
    ctrl.buttons = opt.buttons || [];
    ctrl.onAddOrig = opt.draw.onAdd;
    ctrl.onRemoveOrig = opt.draw.onRemove;
  }
  onAdd(map) {
    let ctrl = this;
    ctrl.map = map;
    ctrl.elContainer = ctrl.onAddOrig(map);
    ctrl.buttons.forEach((b) => {
      ctrl.addButton(b);
    });
    return ctrl.elContainer;
  }
  onRemove(map) {
    let ctrl = this;
    ctrl.buttons.forEach((b) => {
      ctrl.removeButton(b);
    });
    ctrl.onRemoveOrig(map);
  }
  addButton(opt) {
    let ctrl = this;
    var elButton = document.createElement("button");
    elButton.className = "mapbox-gl-draw_ctrl-draw-btn";
    if (opt.classes instanceof Array) {
      opt.classes.forEach((c) => {
        elButton.classList.add(c);
      });
    }
    elButton.addEventListener(opt.on, opt.action);
    ctrl.elContainer.appendChild(elButton);
    opt.elButton = elButton;
  }
  removeButton(opt) {
    opt.elButton.removeEventListener(opt.on, opt.action);
    opt.elButton.remove();
  }
}

if (mapboxgl.getRTLTextPluginStatus() === "unavailable")
  mapboxgl.setRTLTextPlugin(
    "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
    (err) => {
      err && console.error(err);
    },
    true
  );

map = new mapboxgl.Map({
  container: "map",
  style: `https://map.ir/vector/styles/main/mapir-xyz-light-style.json`,
  center: [51.3857, 35.6102],
  zoom: 7.78,
  pitch: 0,
  interactive: true,
  hash: true,
  attributionControl: true,
  customAttribution: "© Map © Openstreetmap",
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRiZWU0YWU4OTk4OTA3MmQ3OTFmMjQ4ZDE5N2VhZTgwZWU2NTUyYjhlYjczOWI2NDdlY2YyYzIzNWRiYThiMzIzOTM5MDkzZDM0NTY2MmU3In0.eyJhdWQiOiI5NDMyIiwianRpIjoiZGJlZTRhZTg5OTg5MDcyZDc5MWYyNDhkMTk3ZWFlODBlZTY1NTJiOGViNzM5YjY0N2VjZjJjMjM1ZGJhOGIzMjM5MzkwOTNkMzQ1NjYyZTciLCJpYXQiOjE1OTA4MjU0NzIsIm5iZiI6MTU5MDgyNTQ3MiwiZXhwIjoxNTkzNDE3NDcyLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.M_z4xJlJRuYrh8RFe9UrW89Y_XBzpPth4yk3hlT-goBm8o3x8DGCrSqgskFfmJTUD2wC2qSoVZzQKB67sm-swtD5fkxZO7C0lBCMAU92IYZwCdYehIOtZbP5L1Lfg3C6pxd0r7gQOdzcAZj9TStnKBQPK3jSvzkiHIQhb6I0sViOS_8JceSNs9ZlVelQ3gs77xM2ksWDM6vmqIndzsS-5hUd-9qdRDTLHnhdbS4_UBwNDza47Iqd5vZkBgmQ_oDZ7dVyBuMHiQFg28V6zhtsf3fijP0UhePCj4GM89g3tzYBOmuapVBobbX395FWpnNC3bYg7zDaVHcllSUYDjGc1A", //dev api key
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

draw = new MapboxDraw({
  modes: {
    ...SelectFeatureMode(MapboxDraw.modes),
  },
  styles: [...selectFeatureDrawStyles(defaultDrawStyle)],
  userProperties: true,
  selectHighlightColor: "red",
});

window.draw = draw;

drawBar = new extendDrawBar({
  draw: draw,
  buttons: [
    {
      on: "click",
      action: selectFeature,
      classes: ["select-icon"],
    },
  ],
});

map.once("load", () => {
  map.resize();
  map.addControl(drawBar, "top-right");

  draw.set({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [51.03172414839912, 35.920869678862005],
              [51.03172414839912, 35.62049410212656],
              [51.461567534481134, 35.62049410212656],
              [51.461567534481134, 35.920869678862005],
              [51.03172414839912, 35.920869678862005],
            ],
          ],
          type: "Polygon",
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [51.6404618916944, 35.57806814108352],
            [51.82929482430853, 35.860482623322696],
          ],
          type: "LineString",
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [51.40193608207707, 35.45267939803206],
          type: "Point",
        },
      },
    ],
  });

  map.on("draw.update", function (e) {
    console.log("🚀 ~ file: index.js ~ line 158 ~ e", e);
  });
});
