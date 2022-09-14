import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import { TiArrowSortedDown } from 'react-icons/ti';
import { BiReset } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TiChevronLeft } from 'react-icons/ti';
import { TiChevronRight } from 'react-icons/ti';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Pagination = ({ common: { darkThemeState } }) => {
	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div className={darkThemeState ? dark.pagiDiv : light.pagiDiv}>
				<div className={darkThemeState ? dark.pageNo : light.pageNo}>
					1 of 3 pages
				</div>
				<div className={darkThemeState ? dark.pagePrev : light.pagePrev}>
					<TiChevronLeft />
				</div>
				<div className={darkThemeState ? dark.pageNext : light.pageNext}>
					<TiChevronRight />
				</div>
			</div>
		</div>
	);
};

Pagination.propTypes = {
	setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(Pagination);
