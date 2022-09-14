import React, { useContext } from 'react';
import styles from './index.module.css';
import Modal from '@material-ui/core/Modal';
import { IoClose } from 'react-icons/io5';
import { LoginContext } from '../../../Layout/common/LoginContext';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	showLearnMoreAbout365,
	hideLearnMoreAbout365,
} from '../../../../actions/Home/index';

const LearnMoreAbout365 = ({
	showLearnMoreAbout365,
	hideLearnMoreAbout365,
	home: { learnMoreAbout365PopUpVisibility },
}) => {
	const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
		useContext(LoginContext);

	const handleClose = () => {
		hideLearnMoreAbout365();
	};

	const handleSignUpOpen = () => {
		setModalShow(true);
	};

	return (
		<Modal
			open={learnMoreAbout365PopUpVisibility}
			onClose={handleClose}
			aria-labelledby='simple-modal-title'
			aria-describedby='simple-modal-description'
			className={styles.modal}
		>
			<div className={styles.card}>
				<div className={styles.closeBtnDiv}>
					<div className={styles.closeBtn} onClick={handleClose}>
						<IoClose />
					</div>
				</div>
				<div className={styles.title}>About 365Crypto</div>
				<div className={styles.content}>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
						eveniet aliquam aut itaque maxime necessitatibus aliquid fugiat
						perspiciatis veniam, deserunt temporibus, esse soluta, ex ea dolores
						molestiae vitae vel. Quo? Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Adipisci eveniet aliquam aut itaque maxime
						necessitatibus aliquid fugiat perspiciatis veniam, deserunt
						temporibus, esse soluta, ex ea dolores molestiae vitae vel.
					</p>

					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
						eveniet aliquam aut itaque maxime necessitatibus aliquid fugiat
						perspiciatis veniam, deserunt temporibus, esse soluta, ex ea dolores
						molestiae vitae vel. Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Adipisci eveniet aliquam aut itaque maxime
						necessitatibus aliquid fugiat perspiciatis veniam, deserunt
						temporibus, esse soluta, ex ea dolores molestiae vitae vel.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
						eveniet aliquam aut itaque maxime necessitatibus aliquid fugiat
						perspiciatis veniam, deserunt temporibus, esse soluta, ex ea dolores
						molestiae vitae vel. Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Adipisci eveniet aliquam aut itaque maxime
						necessitatibus aliquid fugiat perspiciatis veniam, deserunt
						temporibus, esse soluta, ex ea dolores molestiae vitae vel.Lorem
						ipsum dolor sit amet consectetur, adipisicing elit. Adipisci eveniet
						aliquam aut itaque maxime necessitatibus aliquid fugiat perspiciatis
						veniam, deserunt temporibus, esse soluta, ex ea dolores molestiae
						vitae vel. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Adipisci eveniet aliquam aut itaque maxime necessitatibus aliquid
						fugiat perspiciatis veniam, deserunt temporibus, esse soluta, ex ea
						dolores molestiae vitae vel.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
						eveniet aliquam aut itaque maxime necessitatibus aliquid fugiat
						perspiciatis veniam, deserunt temporibus, esse soluta, ex ea dolores
						molestiae vitae vel. Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Adipisci eveniet aliquam aut itaque maxime
						necessitatibus aliquid fugiat perspiciatis veniam, deserunt
						temporibus, esse soluta, ex ea dolores molestiae vitae vel.
					</p>
				</div>
				<button
					onClick={() => {
						handleClose();
						handleSignUpOpen();
					}}
					className={styles.signUp}
				>
					Sign Up
				</button>
			</div>
		</Modal>
	);
};

LearnMoreAbout365.propTypes = {
	showLearnMoreAbout365: PropTypes.func.isRequired,
	hideLearnMoreAbout365: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	home: state.home,
});

export default connect(mapStateToProps, {
	showLearnMoreAbout365,
	hideLearnMoreAbout365,
})(LearnMoreAbout365);
