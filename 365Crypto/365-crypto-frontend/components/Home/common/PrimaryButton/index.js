import React from 'react';
import styles from './index.module.css';

const PrimaryButton = (props) => {
  const classes = `${styles.primaryButton} ${props.className}`;

  return (
    <button className={classes} type={props.type} onCLick={props.onClick}>
      {props.children}
    </button>
  );
};

export default PrimaryButton;
