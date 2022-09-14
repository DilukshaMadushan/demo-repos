import styles from './index.module.css';
import React, { useContext, useState, useEffect } from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { FiMail } from 'react-icons/fi';
import { LoginContext } from '../../../common/LoginContext';
import { setAlert } from '../../../../../actions/Alert';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitForgotPassword ,setShowForgotPasswordModal  } from '../../../../../actions/Auth';

const ForgotPasswordBox = ({
	auth: { loading},
	alert,
	submitForgotPassword,
	setShowForgotPasswordModal,
}) => {
	const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =useContext(LoginContext);

	const [forgotPasswordFormData, setforgotPasswordFormData] = useState({
		email: '',
	
	});


	// Destructure forgotPasswordFormData data
	const { email} = forgotPasswordFormData;

	//Form validaions
	const [errors, setErrors] = useState({});

	//disable button
	const [isButtonDisable, setIsButtonDisable] = useState(false);

	// Handle Onchange events in login form
	const handleChange = async (event) => {
		setforgotPasswordFormData({
			...forgotPasswordFormData,
			[event.target.name]: event.target.value,
		});
	};

	// Handle submit events in login form
	const handleSubmit = (event) => {
		event.preventDefault();

		const errors = {
			email: '',

		};

		if (!forgotPasswordFormData.email) {
			errors.email = 'Email is required.';
		} else if (!/\S+@\S+\.\S+/.test(forgotPasswordFormData.email)) {
			errors.email = 'Email is invalid.';
		}else{
			setIsButtonDisable(true);
			submitForgotPassword(forgotPasswordFormData.email);
			
		
			setShowForgotPasswordModal (false)
			setModalShow(false)
		}
		

		setErrors(errors);
	};


	useEffect(() => {
		setIsButtonDisable(false);
	}, [alert]);

	return (
		<div className='container-fluid'>
			<p className={styles.description} >Hey, We are here to help you.Enter your email below.We will send reset link</p>
			<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
				<div className='form-group '>
					<div className={`${styles['input-group']}`}>
						<input
							//type='email'
							className={`${styles['form-control']}`}
							id='exampleInputEmail1'
							aria-describedby='emailHelp'
							placeholder='Email'
							value={email}
							name='email'
							onChange={(e) => handleChange(e)}
							//required
						/>

						<div className={`${styles['input-group-addon']}`}>
							<FiMail color='white' />
						</div>
					</div>
					{errors.email && <p className={styles.errors}>{errors.email}</p>}
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

export default connect(mapStateToProps,{submitForgotPassword,setAlert,setShowForgotPasswordModal})(ForgotPasswordBox);
