import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import ReactCodeInput from 'react-verification-code-input';
import { verificationSubmit } from '../../../../../actions/Auth';
import { resendVerification } from '../../../../../actions/Auth';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { MdRefresh  } from 'react-icons/md';
import RefreshIcon from '@material-ui/icons/Refresh';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const VerificationBox = ({
	auth: { userId, registerEmail, verificationLoading },
	alert,
	verificationSubmit,
  resendVerification ,
}) => {
	//OnSubmit
	const handleComplete = (inputNumbers) => {
		verificationSubmit(inputNumbers, userId);
	};

  //on Verification resend
  const handleResendVerification = (e) => {

		resendVerification(userId);
	};

	return (
		<div className={`${styles.mainDiv}`}>
			{verificationLoading ? (
				<CircularProgress />
			) : (
				<div className={`${styles.formDiv}`}>
					<div className={`${styles.verificationHeadingDiv}`}>
						VERIFICATION CODE
					</div>
					<div className={styles.verificationBoxParaDiv}>
						<div className={styles.verificationBoxPara}>
							Please enter the 6-digit verification code that was sent to
							<span
								className={styles.verificationBoxEmailSpan}
							>{` ${registerEmail}`}</span>
							<div className={styles.verificationBoxPara}>
								The code is valid for 30 minutes.
							</div>
						</div>
					</div>
					<form className={`${styles.form}`}>
						<div className={`${styles.inputDiv}`}>
							<ReactCodeInput onComplete={(e) => handleComplete(e)} />
						</div>
					</form>
					<div className={styles.hzlineDiv}>
						<div className={styles.hzline}></div>
					</div>
          <div className={styles.resendContainer}>
		  <RefreshIcon color="success" />
              <button
              onClick={() => handleResendVerification()}
              style={{
                color: '#33b18a',
                marginLeft: '2px',
                border: '2px',
                borderColor:"green",
                backgroundColor: 'black',
              }}
            >
              Resend code
            </button>
              
            </div>
				</div>
			)}
		</div>
	);
};

VerificationBox.propTypes = {
	verificationSubmit: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	alert: state.alert,
});
export default connect(mapStateToProps, { verificationSubmit ,resendVerification })(
	VerificationBox
);
