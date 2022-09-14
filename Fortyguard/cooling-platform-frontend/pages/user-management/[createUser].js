import React from "react";
import CreateUser from "../../components/UserManagement/CreateUser";
import Layout from "../../components/Layout";

const createUser = () => {
  return (
    <div>
      <CreateUser />
    </div>
  );
};

export default createUser;

createUser.getLayout = function getLayout(createUser) {
  return <Layout>{createUser}</Layout>;
};
