import React from "react";
import Footer from "../shared/Footer";
import MobileNav from "./MobileNav";
import TopNavigator from "./TopNavigator";

const Layout = (props) => {
  return (
    <div>
      <div>
        <TopNavigator />
      </div>
      <div>{props.children}</div>
      <div>
        <MobileNav />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
