import React, { useContext } from 'react';
import styles from './StartTradingNowCard.module.css';
import { LoginContext } from '../../common/LoginContext';
import LoginAndRegisterModal from '../../LoginAndRegisterModal';
import Image from 'next/image';

const StartTradingNowCard = () => {
  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setModalShow(true);
    setLogin(false);
  };
  return (
    <div className={styles.mainDiv}>
      <div className={styles.upperDiv}>
        <div className={styles.img}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              src={'/side-panel.png'}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      <div className={styles.middleDiv}>
        <text className={styles.largeLabel}>Get Crypto Analysis</text>
        <text className={styles.smallLabel}>Create a 365Crypto account</text>
      </div>
      <div className={styles.lowerDiv}>
        <button className={styles.btn} onClick={handleLoginClick}>
          Start Now
        </button>
        {modalShow && (
          <LoginAndRegisterModal show={modalShow} isLogin={isLogin} />
        )}
      </div>
    </div>
  );
};

export default StartTradingNowCard;
