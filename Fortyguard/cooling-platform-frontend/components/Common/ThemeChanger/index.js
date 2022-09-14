import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import { HiSun } from 'react-icons/hi';
import { RiMoonClearFill } from 'react-icons/ri';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setToOppositeTheme } from '../../../actions/Common';

const ThemeChangerLayout = ({
	common: { darkThemeState },
	setToOppositeTheme,
}) => {
	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div
				className={
					darkThemeState ? dark.themeChangerDiv : light.themeChangerDiv
				}
			>
				<div
					onClick={() => setToOppositeTheme(!darkThemeState)}
					className={darkThemeState ? dark.themeChanger : light.themeChanger}
				>
					{darkThemeState ? <HiSun /> : <RiMoonClearFill />}
				</div>
			</div>
		</div>
	);
};

ThemeChangerLayout.propTypes = {
	setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, { setToOppositeTheme })(
	ThemeChangerLayout
);
