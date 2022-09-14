import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import { TiArrowSortedDown } from 'react-icons/ti';
import SearchBox from './SearchBox';
import AddUserButton from './AddUserButton';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Toolbar = ({ common: { darkThemeState } }) => {
	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div className={darkThemeState ? dark.tableToolbar : light.tableToolbar}>
				<div className={darkThemeState ? dark.leftDiv : light.leftDiv}>
					<div
						className={darkThemeState ? dark.allUsersDiv : light.allUsersDiv}
					>
						All Users <TiArrowSortedDown />
					</div>
					<div
						className={darkThemeState ? dark.vDevider : light.vDevider}
					></div>
					<div
						className={
							darkThemeState ? dark.activeInactiveDiv : light.activeInactiveDiv
						}
					>
						<div className={darkThemeState ? dark.active : light.active}>
							<div
								className={
									darkThemeState ? dark.activeCircle : light.activeCircle
								}
							></div>
							Active
						</div>
						<div className={darkThemeState ? dark.inactive : light.inactive}>
							<div
								className={
									darkThemeState ? dark.inactiveCircle : light.inactiveCircle
								}
							></div>
							Inactive
						</div>
					</div>
				</div>
				<div className={darkThemeState ? dark.rightDiv : light.rightDiv}>
					<div className={darkThemeState ? dark.SearchDiv : light.SearchDiv}>
						<SearchBox />
					</div>
					<div className={darkThemeState ? dark.AddUserDiv : light.AddUserDiv}>
						<AddUserButton />
					</div>
				</div>
			</div>
		</div>
	);
};

Toolbar.propTypes = {
	setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(Toolbar);
