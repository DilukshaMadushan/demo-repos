import { combineReducers } from "redux";

import alert from "./Alert";
import auth from "./Auth";
import common from "./Common";
import map from "./Map";
import uploads from "./Uploads";
import sensor from "./Sensor";

export default combineReducers({
  alert,
  auth,
  common,
  map,
  uploads,
  sensor,
});
