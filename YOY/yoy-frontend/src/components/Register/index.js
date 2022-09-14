import React, { useState } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";

import { registerUser } from "@actions/Auth";

import { SET_REGISTER_MODAL, SET_LOGIN_MODAL } from "@actions/types";

const Register = ({ registerUser }) => {
  // Login state.
  const dispatch = useDispatch();
  const registerModal = useSelector((state) => state.site.registerModal);
  const loginModal = useSelector((state) => state.site.loginModal);

  const toggleLoginModal = () => {
    dispatch({ type: SET_REGISTER_MODAL, payload: !registerModal });
  };

  const switchForms = () => {
    dispatch({ type: SET_REGISTER_MODAL, payload: !registerModal });
    dispatch({ type: SET_LOGIN_MODAL, payload: !loginModal });
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
    dateOfBirth: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
    setFormData({
      email: "",
      password: "",
      userName: "",
      dateOfBirth: "",
    });
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className={!registerModal ? styles.container : styles.show}
    >
      <div className={styles.card}>
        <i
          className="fa fa-times-circle"
          aria-hidden="true"
          onClick={toggleLoginModal}
        ></i>
        <h1>Añadir Breaking Bad a Mi Lista</h1>
        <p>
          Para guardar tu podcast en favoritos es necesario una membresía
          ¿Tienes membresía?
        </p>
        <h2 onClick={switchForms}>Inicia sesión</h2>
        <input
          name="userName"
          value={formData.userName}
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="Ingresa tu usuario"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={(e) => onChange(e)}
          type="email"
          placeholder="correo electrónico"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={(e) => onChange(e)}
          type="password"
          placeholder="Contrasena"
          required
        />
        <input
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="Año de nacimiento"
          required
        />
        <button>Registrarme</button>
      </div>
    </form>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { registerUser })(Register);
