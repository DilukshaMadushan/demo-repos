import React, { useState, useEffect } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Alert from "../Common/Alert";
import { useRouter } from "next/router";

//cookies
import { useCookies } from "react-cookie";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setToOppositeTheme } from "../../actions/Common/index";

const Layout = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const darkThemeState = props.common.darkThemeState;
  const router = useRouter();

  // //open in same tab
  // useEffect(() => {
  //   if (!cookies.Logintoken) {
  //     router.push(`/login`, null, { shallow: true });
  //   }
  // }, [cookies.Logintoken, router]);

  return (
    <div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
      <Alert />
      <div className={darkThemeState ? dark.topNav : light.topNav}>
        <TopNav />
      </div>
      <div className={darkThemeState ? dark.lowerDiv : light.lowerDiv}>
        <div className={darkThemeState ? dark.sideNav : light.sideNav}>
          <SideNav />
        </div>
        <div className={darkThemeState ? dark.dummyDiv : light.dummyDiv}>
          <div className={darkThemeState ? dark.dummy : light.dummy}></div>
        </div>

        <main className={darkThemeState ? dark.main : light.main}>
          {props.children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, { setToOppositeTheme })(Layout);
