import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import StepsBarSection from './StepsBarSection';
import UploadsSection from './UploadsSection';
import AnalyticsSection from './AnalyticsSection';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Uploads = ({ common: { darkThemeState } }) => {
	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div className={darkThemeState ? dark.pageTitle : light.pageTitle}>
				Uploads
			</div>
			<div
				className={darkThemeState ? dark.stepBarSection : light.stepBarSection}
			>
				<StepsBarSection />
			</div>
			<div
				className={darkThemeState ? dark.uploadsSection : light.uploadsSection}
			>
				<UploadsSection />
			</div>
			<div
				className={
					darkThemeState ? dark.analyticsSection : light.analyticsSection
				}
			>
				<AnalyticsSection />
			</div>
		</div>
	);
};

Uploads.propTypes = {};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(Uploads);
