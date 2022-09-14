import styles from './index.module.css';
import React from 'react';

const PrimaryButton = props => {
  return (
    <div>
      <div className={styles.btn}>{props.children}</div>
    </div>
  );
};

export default PrimaryButton;
