import React, { useState } from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import { HiOutlineSearch } from 'react-icons/hi';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchBox = ({ common: { darkThemeState } }) => {
	return (
		<div className={`${darkThemeState ? dark['main-div'] : light['main-div']}`}>
			<div
				className={`${darkThemeState ? dark['icon-div'] : light['icon-div']}`}
			>
				<HiOutlineSearch size='14px' />
			</div>
			<input
				className={`${darkThemeState ? dark['input-div'] : light['input-div']}`}
				placeholder='Search'
				type='text'
			/>
		</div>
	);
};

SearchBox.propTypes = {
	setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(SearchBox);
