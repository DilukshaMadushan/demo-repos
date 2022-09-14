import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import QuantityPointsChart from './QuantityPointsChart';
import GeolocationBox from './GeolocationBox';
import MinMaxTempBox from './MinMaxTempBox';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AnalyticsSections = ({ common: { darkThemeState } }) => {
	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div className={darkThemeState ? dark.title : light.title}>
				CSV Format Info
			</div>
			<div className={darkThemeState ? dark.subTitle : light.subTitle}>
				Quick Data Analytics
			</div>
			<div className={darkThemeState ? dark.cardsSec : light.cardsSec}>
				<div className={darkThemeState ? dark.card : light.card}>
					<div className={darkThemeState ? dark.title : light.title}>
						Geolocation
					</div>
					<div className={darkThemeState ? dark.contentBox : light.contentBox}>
						<GeolocationBox />
					</div>
				</div>
				<div className={darkThemeState ? dark.card : light.card}>
					<div className={darkThemeState ? dark.title : light.title}>
						Quantity Points
					</div>
					<div className={darkThemeState ? dark.contentBox : light.contentBox}>
						<QuantityPointsChart />
					</div>
				</div>
				<div className={darkThemeState ? dark.card : light.card}>
					<div className={darkThemeState ? dark.title : light.title}>
						Min / max °C
					</div>
					<div className={darkThemeState ? dark.contentBox : light.contentBox}>
						<MinMaxTempBox />
					</div>
				</div>
			</div>
		</div>
	);
};

AnalyticsSections.propTypes = {};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(AnalyticsSections);
