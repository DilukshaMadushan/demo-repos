import React, { useEffect } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Router from "next/router";

import styles from "./index.module.css";

const TopNavigator = (props) => {
  useEffect(() => {
    // if (!props.auth.isAuthenticated) {
    //   Router.push("/");
    // }
  }, [props.auth]);

  return (
    <div className={styles.topNavContainer}>
      <div className={styles.topNavBar}>
        <div className={styles.leftContainer}>
          <div
            className={styles.logoContainer}
            onClick={() => Router.push("/")}
          >
            <div className={styles.logoImageContainer}>
              <Image
                className={styles.image}
                src="/yoy.png"
                alt="YOY"
                layout="fill"
              />
            </div>
            <div className={styles.logoImageContainerHover}>
              <Image
                className={styles.image}
                src="/blanco.png"
                alt="YOY"
                layout="fill"
              />
            </div>
          </div>

          <div className={styles.searchBox}>
            <i className="fa fa-search"></i>
            <h6>Buscar</h6>
          </div>
        </div>

        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <img className={styles.tvImage} src="/nav/TV1.png" alt="TV" />
            <h6>TV en vivo</h6>
          </div>
          <div
            className={
              props.site.menuItemState == 2
                ? styles.menuItemActive
                : styles.menuItem
            }
          >
            {props.site.menuItemState == 2 ? (
              <img className={styles.odImage} src="/nav/OD2.png" alt="TV" />
            ) : (
              <img className={styles.odImage} src="/nav/OD1.png" alt="TV" />
            )}
            <h6>OnDemand</h6>
          </div>
          <div className={styles.menuItem}>
            <img
              className={styles.radioImage}
              src="/nav/Musica1.png"
              alt="TV"
            />
            <h6>Radio</h6>
          </div>
          <div className={styles.menuItem}>
            <img className={styles.gameImage} src="/nav/Juegos1.png" alt="TV" />
            <h6>Juegos</h6>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.userNameContainer}>
            <h6>{props.auth.isAuthenticated && props.auth.data.data.name}</h6>
          </div>
          <div className={styles.profileButtonContainer}>
            <img
              src={props.auth.isAuthenticated && props.auth.data.data.picture}
              alt="profile"
            />
          </div>

          <div className={styles.dropDownContainer}>
            <div className={styles.dropDownItem}>
              <h6>Cuenta</h6>
            </div>
            <div className={styles.dropDownItem}>
              <h6
                onClick={() => {
                  Router.push("/on-demand/my-list");
                }}
              >
                Mi lista
              </h6>
            </div>
            <div className={styles.dropDownItem}>
              <h6>Preferencias</h6>
            </div>
            <div className={styles.dropDownItem}>
              <h6
                onClick={() => {
                  Router.push("/");
                }}
              >
                Cerrar Sesión
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopNavigator.propTypes = {
  site: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  site: state.site,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TopNavigator);
