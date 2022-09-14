import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const StepsBarSection = ({ common: { darkThemeState } }) => {
	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div className={darkThemeState ? dark.barDiv : light.barDiv}>
				<div className={darkThemeState ? dark.line : light.line}>
					<div
						className={darkThemeState ? dark.lineFill : light.lineFill}
					></div>
					<div className={darkThemeState ? dark.bubblesDiv : light.bubblesDiv}>
						<div className={darkThemeState ? dark.bubbleOne : light.bubbleOne}>
							<div
								className={darkThemeState ? dark.textTitOne : light.textTitOne}
							>
								UPLOAD
							</div>
						</div>
						<div className={darkThemeState ? dark.bubbleTwo : light.bubbleTwo}>
							<div
								className={darkThemeState ? dark.textTitTwo : light.textTitTwo}
							>
								ANALYSE
							</div>
						</div>
						<div
							className={darkThemeState ? dark.bubbleThree : light.bubbleThree}
						>
							<div
								className={
									darkThemeState ? dark.textTitThree : light.textTitThree
								}
							>
								PROCESSING
							</div>
						</div>
						<div
							className={darkThemeState ? dark.bubbleFour : light.bubbleFour}
						>
							<div
								className={
									darkThemeState ? dark.textTitFour : light.textTitFour
								}
							>
								DONE
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

StepsBarSection.propTypes = {};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(StepsBarSection);
