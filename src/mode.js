import doubleClickZoom from "@mapbox/mapbox-gl-draw/src/lib/double_click_zoom";
import * as Constants from "@mapbox/mapbox-gl-draw/src/constants";

const select_mode = {};

select_mode.onSetup = function (opt) {
  const { onSelect, onCancel } = opt;
  const state = {};
  state.onSelect = onSelect;
  state.onCancel = onCancel;
  state.api = this._ctx.api;
  state.hoveredStateId = null;
  return state;
};

select_mode.onMouseMove = function (state, e) {
  const { api } = state;
  const { featureTarget } = e;
  // this.originOnMouseMove(state, e);

  if (featureTarget) {
    this.updateUIClasses({ mouse: Constants.cursors.POINTER });
    const hoveringFeatureID = featureTarget.properties.id;
    if (
      state.hoveredStateId !== null &&
      state.hoveredStateId !== hoveringFeatureID
    ) {
      api.setFeatureProperty(state.hoveredStateId, "hover", "false");
    }
    state.hoveredStateId = hoveringFeatureID;
    api.setFeatureProperty(state.hoveredStateId, "hover", "true");
  } else {
    if (state.hoveredStateId)
      api.setFeatureProperty(state.hoveredStateId, "hover", "false");
    state.hoveredStateId = null;
  }
};

select_mode.onClick = function (state, e) {
  this.onStop(state, e);
};

select_mode.toDisplayFeatures = function (state, geojson, display) {
  display(geojson);
};

select_mode.onStop = function (state) {
  const selectedFeatureID = state.hoveredStateId;

  this.updateUIClasses({ mouse: Constants.cursors.NONE });
  doubleClickZoom.enable(this);
  this.activateUIButton();

  if (selectedFeatureID === null) {
    /// Call `onCancel` if exists.
    if (typeof state.onCancel === "function") state.onCancel();
  } else {
    if (typeof state.onSelect === "function")
      state.onSelect(selectedFeature.id);
    else
      this.map.fire("draw.select_mode.select", {
        featureID: selectedFeatureID,
      });
  }

  this.changeMode(Constants.modes.SIMPLE_SELECT, {}, { silent: true });
};

export default select_mode;
