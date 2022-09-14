import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { IoCaretDown } from 'react-icons/io5';
import OutsideClickHandler from 'react-outside-click-handler';
import Skeleton from '@material-ui/lab/Skeleton';
// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories } from '../../../../actions/CoinEvents';

const CategoryDropdownMobile = ({
	isCategoryDropdownMobileActive,
	setIsCategoryDropdownMobileActive,
	categoryDropdownSelected,
	setCategoryDropdownSelected,
	handleChange,
	getCategories,
	coinEvents: { categoriesList, loadingCategories },
}) => {
	const DUMMY_LIST = [
		{ id: '1' },
		{ id: '2' },
		{ id: '3' },
		{ id: '4' },
		{ id: '5' },
	];

	const handleDropdownBtnClick = () => {
		setIsCategoryDropdownMobileActive(!isCategoryDropdownMobileActive);
	};
	//Getting Categories
	useEffect(() => {
		getCategories();
	}, []);

	return (
		<div className={`${styles.mainDiv}`}>
			<div className={`${styles.dropdown}`}>
				<OutsideClickHandler
					onOutsideClick={() => {
						setIsCategoryDropdownMobileActive(false);
					}}
				>
					<div
						onClick={handleDropdownBtnClick}
						className={`${styles.dropdownBtn}`}
					>
						<div className={`${styles.titleSpan}`}>
							{categoryDropdownSelected}
						</div>
						<div className={`${styles.arrowSpan}`}>
							<IoCaretDown className={`${styles.arrow}`} />
						</div>
					</div>
					{isCategoryDropdownMobileActive && (
						<div className={`${styles.dropdownContent}`}>
							{loadingCategories
								? DUMMY_LIST.map((item, index) => (
										<Skeleton
											style={{ background: '#232327' }}
											variant='text'
											className={`${styles.dropdownItemDiv}`}
											key={index}
											height={30}
										/>
								  ))
								: categoriesList !== null &&
								  categoriesList.map((item, index) => (
										<div
											onClick={(e) => {
												setCategoryDropdownSelected(item.name);
												setIsCategoryDropdownMobileActive(false);
												handleChange(item._id);
											}}
											className={`${styles.dropdownItemDiv}`}
											key={index}
										>
											<div className={`${styles.dropdownItem}`}>
												<span>{item.name}</span>
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

CategoryDropdownMobile.propTypes = {
	getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	coinEvents: state.coinEvents,
});

export default connect(mapStateToProps, {
	getCategories,
})(CategoryDropdownMobile);
