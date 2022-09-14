import React, { useState } from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import { TabData } from '../TabData';
import { HiSun } from 'react-icons/hi';
import { RiMoonClearFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ThemeChanger from '../../Common/ThemeChanger';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setToOppositeTheme, setTabState } from '../../../actions/Common';

const SideNav = ({
	common: { darkThemeState, tabState },
	setToOppositeTheme,
	setTabState,
}) => {
	const { pathname } = useRouter();

	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div className={darkThemeState ? dark.sideNav : light.sideNav}>
				<div className={darkThemeState ? dark.profileBox : light.profileBox}>
					<img
						className={darkThemeState ? dark.dp : light.dp}
						src='/Alan Wildes Profile Pic.png'
						alt=''
					/>
					<div className={darkThemeState ? dark.infoDiv : light.infoDiv}>
						<div className={darkThemeState ? dark.name : light.name}>
							Alan Wildes 
						</div>
						<div className={darkThemeState ? dark.position : light.position}>
							Manager
						</div>
					</div>
				</div>
				<div className={darkThemeState ? dark.tabDiv : light.tabDiv}>
					<div>
						{TabData.map((item, index) => (
							<Link href={item.path}>
								<div
									onClick={() => {
										setTabState(item.path);
									}}
									className={
										darkThemeState && tabState === item.path
											? dark.tabSelected
											: darkThemeState && tabState !== item.path
											? dark.tab
											: !darkThemeState && tabState === item.path
											? light.tabSelected
											: light.tab
									}
								>
									{item.icon}
									<div
										className={darkThemeState ? dark.tabName : light.tabName}
									>
										{item.title}
									</div>
								</div>
							</Link>
						))}
					</div>
					<div className={darkThemeState ? dark.themeDiv : light.themeDiv}>
						<ThemeChanger />
					</div>
				</div>
			</div>
		</div>
	);
};

SideNav.propTypes = {
	setToOppositeTheme: PropTypes.func.isRequired,
	setTabState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, { setToOppositeTheme, setTabState })(
	SideNav
);
