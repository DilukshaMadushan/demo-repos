import React, { useState } from 'react';
import styles from './index.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import Skeleton from '@material-ui/lab/Skeleton';
// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { webSocketParams2 } from '../../../../actions/Websocket';
import { getPerpetualData } from '../../../../actions/MarketDataGraph';

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const skeletonList = [
	{ id: '1' },
	{ id: '2' },
	{ id: '3' },
	{ id: '4' },
	{ id: '5' },
];

const PerpetualToggleButtons = ({
	exchange: { exchangeList, loadingExchange },
	webSocketParams2,
	getPerpetualData,
	togglebuttonPerpetual,
	setTogglebuttonPerpetual,
}) => {
	return (
		<div className={styles.mainDiv}>
			<Carousel
				additionalTransfrom={0}
				// arrows
				// autoPlay
				// autoPlaySpeed={1000}
				centerMode={false}
				className={styles.carousel}
				containerClass='container-with-dots'
				customLeftArrow={<BackButton />}
				customRightArrow={<NextButton />}
				dotListClass=''
				draggable
				focusOnSelect={false}
				infinite
				itemClass=''
				keyBoardControl
				minimumTouchDrag={80}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
				responsive={{
					desktop: {
						breakpoint: {
							max: 3000,
							min: 1024,
						},
						items: 5,
						partialVisibilityGutter: 40,
					},
					mobile: {
						breakpoint: {
							max: 464,
							min: 0,
						},
						items: 3,
						partialVisibilityGutter: 30,
					},
					tablet: {
						breakpoint: {
							max: 1024,
							min: 464,
						},
						items: 4,
						partialVisibilityGutter: 30,
					},
				}}
				showDots={false}
				sliderClass={`${styles['sldr-style']}`}
				slidesToSlide={1}
				swipeable
			>
				{loadingExchange
					? skeletonList.map((item, id) => (
							<div className={styles.FutureCoin}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='rect'
									width={'100%'}
									height={'100%'}
								/>
							</div>
					))
					: exchangeList !== null &&
					exchangeList.map((item, id) => (
							<div
								key={id}
								className={
									togglebuttonPerpetual === item.name
										? styles.togglebutton
										: styles.togglebuttonSelected
								}
								onClick={() => {
									setTogglebuttonPerpetual(item.name);
									getPerpetualData(item._id, item.name);
									webSocketParams2('perpectual', item.name, null);
								}}
							>
								<img
									className={`${styles['toggle-img']}`}
									src={IMAGE_BASE_URL + item.image}
								/>
							</div>
					))}
			</Carousel>
		</div>
	);
};

PerpetualToggleButtons.propTypes = {
	exchange: PropTypes.object.isRequired,
	webSocketParams2: PropTypes.func.isRequired,
	getPerpetualData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	exchange: state.exchange,
});
export default connect(mapStateToProps, {
	webSocketParams2,
	getPerpetualData,
})(PerpetualToggleButtons);
