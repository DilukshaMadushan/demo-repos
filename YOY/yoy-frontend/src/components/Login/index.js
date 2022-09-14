import React, { useState } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";

import { SET_LOGIN_MODAL, SET_REGISTER_MODAL } from "@actions/types";
import { loginUser } from "@actions/Auth";

const Login = ({ loginUser }) => {
  // Login state.
  const dispatch = useDispatch();
  const loginModal = useSelector(state => state.site.loginModal);
  const registerModal = useSelector(state => state.site.registerModal);

  const toggleLoginModal = () => {
    dispatch({ type: SET_LOGIN_MODAL, payload: !loginModal });
  };

  const switchForms = () => {
    dispatch({ type: SET_REGISTER_MODAL, payload: !registerModal });
    dispatch({ type: SET_LOGIN_MODAL, payload: !loginModal });
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    loginUser(formData);
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className={!loginModal ? styles.container : styles.show}>
      <form onSubmit={e => onSubmit(e)} className={styles.card}>
        <i
          className="fa fa-times-circle"
          aria-hidden="true"
          onClick={toggleLoginModal}
        ></i>
        <img src={process.env.SITE_LOGO} alt="SiteLogo" />
        <h1>Iniciar Sesión</h1>
        <p>Utiliza tu cuenta Coppel Digital. ¿No tienes membresía?</p>
        <h2 onClick={switchForms}>Regístrate aquí</h2>
        <input
          name="email"
          value={formData.email}
          onChange={e => onChange(e)}
          type="email"
          placeholder="Ingresa tu usuario"
          autoFocus
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={e => onChange(e)}
          type="password"
          placeholder="Contrasena"
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { loginUser })(Login);
