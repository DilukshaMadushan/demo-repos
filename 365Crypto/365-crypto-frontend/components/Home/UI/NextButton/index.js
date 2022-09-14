import React from 'react';
import styles from './index.module.css';
import { IoIosArrowForward } from 'react-icons/io';

const NextButton = ({ onClick, ...rest }) => {
	const {
		onMove,
		carouselState: { currentSlide, deviceType },
	} = rest;

	return (
		<div className={styles.transparentArea}>
			<div className={styles.customNextBtnDiv}>
				<button className={styles.customNextBtn} onClick={() => onClick()}>
					<IoIosArrowForward />
				</button>
			</div>
		</div>
	);
};

export default NextButton;
