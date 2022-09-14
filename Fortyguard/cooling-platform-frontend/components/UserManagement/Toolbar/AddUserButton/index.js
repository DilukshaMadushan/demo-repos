import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { HiPlusSm } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddUser = ({ common: { darkThemeState } }) => {
  const router = useRouter();
  return (
    <div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
      <div
        className={darkThemeState ? dark.btn : light.btn}
        onClick={() =>
          router.push("/user-management/createUser", null, { shallow: true })
        }
      >
        Add User
        <div className={darkThemeState ? dark.icon : light.icon}>
          <HiPlusSm />
        </div>
      </div>
    </div>
  );
};

AddUser.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(AddUser);
