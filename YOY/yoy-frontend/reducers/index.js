import { combineReducers } from "redux";
import landing from "./Landing";
import onDemand from "./OnDemand";
import site from "./Site";
import alert from "./Alert";
import auth from "./Auth";

export default combineReducers({
  landing,
  onDemand,
  site,
  alert,
  auth,
});
