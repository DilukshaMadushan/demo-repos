import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UpperTitles = ({ common: { darkThemeState } }) => {
	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div className={darkThemeState ? dark.bar : light.bar}>
				<div className={darkThemeState ? dark.tickBox : light.tickBox}>
					<input
						type='checkbox'
						className={darkThemeState ? dark.checkBox : light.checkBox}
					/>
				</div>
				<div className={darkThemeState ? dark.infoDiv : light.infoDiv}>
					<div className={darkThemeState ? dark.nameDiv : light.nameDiv}>
						Name
					</div>
					<div
						className={darkThemeState ? dark.siteRoleDiv : light.siteRoleDiv}
					>
						Site Role
					</div>
					<div className={darkThemeState ? dark.actionsDiv : light.actionsDiv}>
						Actions
					</div>
				</div>
			</div>
		</div>
	);
};

UpperTitles.propTypes = {
	setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(UpperTitles);
