import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { IoCaretDown } from 'react-icons/io5';
import { ImEyePlus } from 'react-icons/im';
import OutsideClickHandler from 'react-outside-click-handler';

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const PlatformsDropdown = ({
	isPlatformsDropdownActive,
	setIsPlatformsDropdownActive,
	platformsDropdownSelected,
	setPlatformsDropdownSelected,
	handleChange,
}) => {
	const DROPDOWN_OPTIONS = [
		{
			id: '1',
			image: '/reddit-logo.png',
			title: 'Reddit',
			urlString: 'platform=reddit',
		},
		{
			id: '2',
			image: '/twitter-logo.png',
			title: 'Twitter',
			urlString: 'platform=twitter',
		},
		{
			id: '3',
			image: '/youtube-logo.png',
			title: 'Youtube',
			urlString: 'platform=youtube',
		},
	];

	return (
		<div className={`${styles.mainDiv}`}>
			<div className={`${styles.dropdown}`}>
				<OutsideClickHandler
					onOutsideClick={() => {
						setIsPlatformsDropdownActive(false);
					}}
				>
					<div
						onClick={() =>
							setIsPlatformsDropdownActive(!isPlatformsDropdownActive)
						}
						className={`${styles.dropdownBtn}`}
					>
						<span className={`${styles.titleSpan}`}>
							{platformsDropdownSelected}
						</span>
						<span className={`${styles.arrowSpan}`}>
							<IoCaretDown />
						</span>
					</div>
					{isPlatformsDropdownActive && (
						<div className={`${styles.dropdownContent}`}>
							{DROPDOWN_OPTIONS.map((item) => (
								<div
									onClick={(e) => {
										setPlatformsDropdownSelected(item.title);
										setIsPlatformsDropdownActive(false);
										handleChange(item.urlString);
									}}
									className={`${styles.dropdownItemDiv}`}
								>
									<div className={`${styles.coinImgDiv}`}>
										<img src={item.image} className={`${styles.coinImg}`} />
									</div>
									<div className={`${styles.dropdownItem}`}>
										<span>{item.title}</span>
									</div>
								</div>
							))}
						</div>
					)}
				</OutsideClickHandler>
			</div>
		</div>
	);
};

export default PlatformsDropdown;
