import React, { useState } from 'react';
import styles from './index.module.css';
import { IoCaretDown } from 'react-icons/io5';
import OutsideClickHandler from 'react-outside-click-handler';

const SortByDropdown = ({
	isSortByDropdownActive,
	setIsSortByDropdownActive,
	sortByDropdownSelected,
	setSortByDropdownSelected,
	handleChange,
}) => {
	const DROPDOWN_OPTIONS = [
		{
			id: '1',
			sortBy: 'Date',
			urlString: 'sort=-dateEvent',
		},
		{
			id: '2',
			sortBy: 'Last added',
			urlString: 'sort=-createdDate',
		},
		{
			id: '3',
			sortBy: 'Hot',
			urlString: 'isHot=true',
		},
		{
			id: '4',
			sortBy: 'Trending',
			urlString: 'isTrending=true',
		},
		{
			id: '5',
			sortBy: 'Significant',
			urlString: 'isSignificant=true',
		},
	];

	return (
		<div className={`${styles.mainDiv}`}>
			<div className={`${styles.dropdown}`}>
				<OutsideClickHandler
					onOutsideClick={() => {
						setIsSortByDropdownActive(false);
					}}
				>
					<div
						onClick={(e) => setIsSortByDropdownActive(!isSortByDropdownActive)}
						className={`${styles.dropdownBtn}`}
					>
						<div className={`${styles.titleSpan}`}>
							{sortByDropdownSelected}
						</div>
						<div className={`${styles.arrowSpan}`}>
							<IoCaretDown className={`${styles.arrow}`} />
						</div>
					</div>
					{isSortByDropdownActive && (
						<div className={`${styles.dropdownContent}`}>
							{DROPDOWN_OPTIONS.map((item) => (
								<div
									onClick={(e) => {
										setSortByDropdownSelected(item.sortBy);
										setIsSortByDropdownActive(false);
										handleChange(item.urlString);
									}}
									className={`${styles.dropdownItemDiv}`}
								>
									<div className={`${styles.dropdownItem}`}>
										<span>{item.sortBy}</span>
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

export default SortByDropdown;
