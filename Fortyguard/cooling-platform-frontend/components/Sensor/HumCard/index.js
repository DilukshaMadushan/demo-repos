import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import { MdWaterDrop } from 'react-icons/md';
import { BiArrowFromTop } from 'react-icons/bi';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HumCard = ({ common: { darkThemeState } }) => {
	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div className={darkThemeState ? dark.card : light.card}>
				<div className={darkThemeState ? dark.title : light.title}>
					Humidity
				</div>
				<div className={darkThemeState ? dark.upperDiv : light.upperDiv}>
					<div className={darkThemeState ? dark.leftDiv : light.leftDiv}>
						<div className={darkThemeState ? dark.iconCard : light.iconCard}>
							<MdWaterDrop />
						</div>
						<div className={darkThemeState ? dark.temp : light.temp}>56.4%</div>
					</div>
					<div className={darkThemeState ? dark.rightDiv : light.rightDiv}>
						<div
							className={
								darkThemeState ? dark.variationIcon : light.variationIcon
							}
						>
							<BiArrowFromTop />
						</div>
						<div className={darkThemeState ? dark.variation : light.variation}>
							3%
						</div>
					</div>
				</div>
				<div className={darkThemeState ? dark.lowerDiv : light.lowerDiv}>
					<div
						className={
							darkThemeState ? dark.percentageSec : light.percentageSec
						}
					>
						<div className={darkThemeState ? dark.outerBar : light.outerBar}>
							<div
								className={darkThemeState ? dark.innerBar : light.innerBar}
							></div>
						</div>
					</div>
					<div className={darkThemeState ? dark.sticksSec : light.sticksSec}>
						<div className={darkThemeState ? dark.stick : light.stick}></div>
						<div className={darkThemeState ? dark.stick : light.stick}></div>
						<div className={darkThemeState ? dark.stick : light.stick}></div>
						<div className={darkThemeState ? dark.stick : light.stick}></div>
						<div className={darkThemeState ? dark.stick : light.stick}></div>
						<div className={darkThemeState ? dark.stick : light.stick}></div>
					</div>
					<div
						className={
							darkThemeState ? dark.measurementSec : light.measurementSec
						}
					>
						<div
							className={darkThemeState ? dark.measurement : light.measurement}
						>
							0
						</div>
						<div
							className={darkThemeState ? dark.measurement : light.measurement}
						>
							20
						</div>
						<div
							className={darkThemeState ? dark.measurement : light.measurement}
						>
							40
						</div>
						<div
							className={darkThemeState ? dark.measurement : light.measurement}
						>
							60
						</div>
						<div
							className={darkThemeState ? dark.measurement : light.measurement}
						>
							80
						</div>
						<div
							className={darkThemeState ? dark.measurement : light.measurement}
						>
							100
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

HumCard.propTypes = {
	setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(HumCard);
