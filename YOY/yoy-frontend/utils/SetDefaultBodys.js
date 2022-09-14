import axios from "axios";

const SetDefaultBodys = body => {
  if (body) {
    axios.defaults.body.common["id"] = `${body.id}`;
  } else {
    delete axios.defaults.common["Authorization"];
  }
};

export default SetDefaultBodys;
