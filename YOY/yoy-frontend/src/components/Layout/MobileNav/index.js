import React from "react";
import styles from "./index.module.css";

const MobileNav = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menuItem}>
        <img className={styles.tv} src="/nav/TV1.png" alt="O" />
        <h6 className={styles.tvText}>TV en vivo</h6>
      </div>
      <div className={styles.menuItem}>
        <img className={styles.od} src="/nav/OD2.png" alt="O" />
        <h6 className={styles.odText}>On Demand</h6>
      </div>
      <div className={styles.menuItem}>
        <img className={styles.music} src="/nav/Musica1.png" alt="O" />
        <h6 className={styles.musicText}>Radio</h6>
      </div>
      <div className={styles.menuItem}>
        <img className={styles.game} src="/nav/Juegos1.png" alt="O" />
        <h6 className={styles.gameText}>Juegos</h6>
      </div>
      <div className={styles.menuItem}>
        <i className="fa fa-search"></i>
        <h6 className={styles.searchText}>Buscar</h6>
      </div>
    </div>
  );
};

export default MobileNav;
