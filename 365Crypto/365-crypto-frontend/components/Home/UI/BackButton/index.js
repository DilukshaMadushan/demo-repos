import React from 'react';
import styles from './index.module.css';
import { IoIosArrowBack } from 'react-icons/io';

const BackButton = ({ onClick, ...rest }) => {
	const {
		onMove,
		carouselState: { currentSlide, deviceType },
	} = rest;

	return (
		<div className={styles.transparentArea}>
			<div className={styles.customBackBtnDiv}>
				<button className={styles.customBackBtn} onClick={() => onClick()}>
					<IoIosArrowBack />
				</button>
			</div>
		</div>
	);
};

export default BackButton;
