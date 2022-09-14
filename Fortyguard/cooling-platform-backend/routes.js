//Route Files
const auth = require("./Routes/authRoutes");
const users = require("./Routes/usersRoutes");
const heatPoint = require("./Routes/heatPoint");
const sensor = require("./Routes/sensorRoutes");
const vehicle = require("./Routes/vehicleRoutes");

//Routes Array
const pathRoutes = [
  { path: "/api/auth", route: auth },
  { path: "/api/users", route: users },
  { path: "/api/heat-points", route: heatPoint },
  { path: "/api/sensors", route: sensor },
  { path: "/api/vehicles", route: vehicle },
];

module.exports = pathRoutes;
