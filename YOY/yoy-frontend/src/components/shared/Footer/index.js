import React from "react";
import styles from "./index.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="/blanco.png" alt="logo" />
      </div>
      <div className={styles.copyrights}>
        <h6>© 2022 Coppel. Todos los derechos reservados.</h6>
      </div>

      <div className={styles.pagesMenu}>
        <h6>FAQs</h6>
        <h6>Contacto</h6>
        <h6>Aviso de privacidad</h6>
        <h6>Términos y Condiciones</h6>
      </div>

      <div className={styles.socialMediaIcons}>
        <i className="fa fa-facebook"></i>
        <i className="fa fa-twitter"></i>
        <i className="fa fa-instagram"></i>
        <i className="fa fa-youtube"></i>
      </div>
    </div>
  );
};

export default Footer;
