import styles from './index.module.css';
import React, { useContext, useState, useEffect } from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { FiMail } from 'react-icons/fi';
import { LoginContext } from '../../../common/LoginContext';
import { setAlert } from '../../../../../actions/Alert';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitResetPassword ,setShowResetPasswordModal  } from '../../../../../actions/Auth';

const ForgotPasswordBox = ({
	auth: { loading,resetPasswordToken},
	alert,
	submitResetPassword,
	setShowResetPasswordModal
	
}) => {
	const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =useContext(LoginContext);

	const [resetPasswordFormData, setresetPasswordFormData] = useState({
		password: '',
		confirmPassword: '',
	
	});



	// Destructure resetPasswordFormData data
	const { password, confirmPassword} = resetPasswordFormData;

	//Form validaions
	const [errors, setErrors] = useState({});

	//disable button
	const [isButtonDisable, setIsButtonDisable] = useState(false);

	// Handle Onchange events in login form
	const handleChange = async (event) => {
		setresetPasswordFormData({
			...resetPasswordFormData,
			[event.target.name]: event.target.value,
		});
	
	};

	// Handle submit events in login form
	const handleSubmit = (event) => {
		event.preventDefault();

		
		const errors = {
			
		
			password: '',
			confirmPassword: '',
		
		  };
	  
		
		
		  if (!resetPasswordFormData.password) {
			errors.password = 'Password is required.';
		  } else if (resetPasswordFormData.password.length < 6) {
			errors.password = 'Password is too short.';
		  }
		  if (!resetPasswordFormData.confirmPassword) {
			errors.confirmPassword = 'Password is required.';
		  } else if (resetPasswordFormData.password !== resetPasswordFormData.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match.';
		  }
	  
	
	  
		  if (
			
			errors.password.length === 0 &&
			errors.confirmPassword.length === 0 
		  ) {
			setIsButtonDisable(true);
			submitResetPassword(resetPasswordFormData.password,resetPasswordToken);

			setShowResetPasswordModal(false,"")
			setModalShow(false)
		  }
	  
		  setErrors(errors);
	};

	useEffect(() => {
		setIsButtonDisable(false);
	}, [alert]);

	return (
		<div className='container-fluid'>

			<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
			<div className="form-group ">
            <div class={`${styles['input-group']}`}>
              <input
                type="password"
                className={`${styles['form-control']}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Password"
                name="password"
                maxlength="250"
                value={password}
                //required
                onChange={e => handleChange(e)}
              />
              <div className={`${styles['input-group-addon']}`}>
                <HiOutlineLockClosed color="white" />
              </div>
            </div>
            {errors.password && (
              <p className={styles.errors}>{errors.password}</p>
            )}
          </div>
          <div className="form-group ">
            <div class={`${styles['input-group']}`}>
              <input
                type="password"
                className={`${styles['form-control']}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Confirm Password"
                name="confirmPassword"
                maxlength="250"
                value={confirmPassword}
                //required
                onChange={e => handleChange(e)}
              />
              <div className={`${styles['input-group-addon']}`}>
                <HiOutlineLockClosed color="white" />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className={styles.errors}>{errors.confirmPassword}</p>
            )}
          </div>
				
			

				{isButtonDisable ? (
					<button
						type='submit'
						className={styles.signinDisable}
						disabled={true}
					>
						Please Wait...
					</button>
				) : (
					<button type='submit' className={styles.signin} disabled={false}>
						Continue
					</button>
				)}

			
			</form>
		</div>
	);
};

ForgotPasswordBox.propTypes = {
	submitForgotPassword: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	// alert: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	alert: state.alert,
});

export default connect(mapStateToProps,{submitResetPassword,setAlert,setShowResetPasswordModal})(ForgotPasswordBox);
