import React, { useState } from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import { RiAccountCircleFill } from 'react-icons/ri';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import SideNavMob from './SideNavMob';
import OutsideClickHandler from 'react-outside-click-handler';
import ProfileDropdown from './ProfileDropdown';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setToOppositeTheme } from '../../../actions/Common/index';

const TopNav = ({ common: { darkThemeState }, setToOppositeTheme }) => {
	const [viewSidebar, setViewSidebar] = useState(false);
	const [dropdownActive, setDropdownActive] = useState(false);

	const handleViewSidebar = () => {
		setViewSidebar(!viewSidebar);
	};

	const handleOnClick = () => {
		setDropdownActive(!dropdownActive);
	};

	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<OutsideClickHandler
				onOutsideClick={() => {
					setViewSidebar(false);
				}}
			>
				<div className={darkThemeState ? dark.topNav : light.topNav}>
					<div
						className={
							darkThemeState ? dark.burgerIconDiv : light.burgerIconDiv
						}
						onClick={handleViewSidebar}
					>
						<HiOutlineMenuAlt2 />
					</div>
					<div className={darkThemeState ? dark.logoDiv : light.logoDiv}>
						<img
							className={darkThemeState ? dark.logo : light.logo}
							src='/FortyGuard_LOGO.png'
							alt=''
						/>
					</div>

					<div className={darkThemeState ? dark.profileDiv : light.profileDiv}>
						<OutsideClickHandler
							onOutsideClick={() => {
								setDropdownActive(false);
							}}
						>
							<div
								onClick={handleOnClick}
								className={
									darkThemeState ? dark.profileIconDiv : light.profileIconDiv
								}
							>
								<RiAccountCircleFill />
							</div>

							<ProfileDropdown
								dropdownActive={dropdownActive}
								setDropdownActive={setDropdownActive}
							/>
						</OutsideClickHandler>
					</div>
				</div>

				<div
					className={
						darkThemeState && viewSidebar
							? `${dark.sideNavMobile} ${dark.active}`
							: darkThemeState && !viewSidebar
							? `${dark.sideNavMobile}`
							: !darkThemeState && viewSidebar
							? `${light.sideNavMobile} ${light.active}`
							: !darkThemeState && !viewSidebar
							? `${light.sideNavMobile}`
							: ''
					}
				>
					<SideNavMob />
				</div>
			</OutsideClickHandler>
		</div>
	);
};

TopNav.propTypes = {
	setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, { setToOppositeTheme })(TopNav);
