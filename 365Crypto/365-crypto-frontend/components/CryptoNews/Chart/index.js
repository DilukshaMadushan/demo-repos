import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import LoadingComp from './LoadingComp';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSentimentChartData } from '../../../actions/CryptoNews';
import EmptyDataHandler from '../../Layout/common/EmptyDataHandler';

const Chart = ({
	sentimentGraphState,
	setSentimentGraphState,
	cryptoNews: {
		sentimentChartDataList,
		loadingSentimentChart,
		selectedSentiment,
	},
	getSentimentChartData,
}) => {
	//------------------Get Sentiment chart data ,action calling for first time  ----------------------
	useEffect(() => {
		getSentimentChartData();
	}, []);

	useEffect(() => {
		if (sentimentChartDataList !== null && selectedSentiment === '') {
			setSentimentGraphState({
				...sentimentGraphState,
				positiveData: sentimentChartDataList.map((item) => item.positive),
				negativeData: sentimentChartDataList.map((item) => item.negative),
				neutralData: sentimentChartDataList.map((item) => item.neutral),
				datesData: sentimentChartDataList.map((item) =>
					new Intl.DateTimeFormat('en-GB', {
						month: 'short',
						day: '2-digit',
						year: 'numeric',
					}).format(new Date(item.date))
				),
			});
		}
		if (sentimentChartDataList !== null && selectedSentiment === 'Positive') {
			setSentimentGraphState({
				...sentimentGraphState,
				positiveData: sentimentChartDataList.map((item) => item.positive),
				negativeData: [],
				neutralData: [],
				datesData: sentimentChartDataList.map((item) =>
					new Intl.DateTimeFormat('en-GB', {
						month: 'short',
						day: '2-digit',
						year: 'numeric',
					}).format(new Date(item.date))
				),
			});
		}
		if (sentimentChartDataList !== null && selectedSentiment === 'Negative') {
			setSentimentGraphState({
				...sentimentGraphState,
				positiveData: [],
				negativeData: sentimentChartDataList.map((item) => item.negative),
				neutralData: [],
				datesData: sentimentChartDataList.map((item) =>
					new Intl.DateTimeFormat('en-GB', {
						month: 'short',
						day: '2-digit',
						year: 'numeric',
					}).format(new Date(item.date))
				),
			});
		}
		if (sentimentChartDataList !== null && selectedSentiment === 'Neutral') {
			setSentimentGraphState({
				...sentimentGraphState,
				positiveData: [],
				negativeData: [],
				neutralData: sentimentChartDataList.map((item) => item.neutral),
				datesData: sentimentChartDataList.map((item) =>
					new Intl.DateTimeFormat('en-GB', {
						month: 'short',
						day: '2-digit',
						year: 'numeric',
					}).format(new Date(item.date))
				),
			});
		}
	}, [sentimentChartDataList]);

	const state = {
		series: [
			{
				name: 'Positive',
				data: sentimentGraphState.positiveData,
			},
			{
				name: 'Negative',
				data: sentimentGraphState.negativeData,
			},
			{
				name: 'Neutral',
				data: sentimentGraphState.neutralData,
			},
		],
		options: {
			dataLabels: {
				enabled: false,
				style: {
					fontSize: '12px',
					fontFamily: 'Helvetica, Arial, sans-serif',
					fontWeight: 400,
				},
			},
			chart: {
				toolbar: {
					show: false,
				},
				type: 'bar',

				foreColor: '#fff',
				type: 'bar',
				height: 500,
				stacked: true,
			},

			grid: {
				show: false,
			},

			plotOptions: {
				bar: {
					horizontal: true,
				},
			},
			stroke: {
				width: 0,
				colors: ['#fff'],
			},
			title: {
				text: '',
			},
			xaxis: {
				labels: {
					style: {
						fontSize: '10px',
						fontFamily: 'Montserrat',
						fontWeight: 400,
					},
					// formatter: function (val) {
					// 	return val + 'K';
					// },
				},
				categories: sentimentGraphState.datesData,
			},
			yaxis: {
				labels: {
					style: {
						fontSize: '10px',
						fontFamily: 'Montserrat',
						fontWeight: 400,
					},
				},
				title: {
					text: undefined,
				},
			},
			tooltip: {
				y: {
					// formatter: function (val) {
					// 	return val + 'K';
					// },
				},
			},
			fill: {
				opacity: 1,
				colors: ['#2bbf7f', '#ff4a55', '#40b0ff'],
			},

			legend: {
				fontFamily: 'Montserrat',
				position: 'top',
				horizontalAlign: 'center',
				offsetX: 0,
				itemMargin: {
					horizontal: 10,
					vertical: 0,
				},
				markers: {
					fillColors: ['#2bbf7f', '#ff4a55', '#40b0ff'],
					width: 12,
					height: 12,
				},
			},
			responsive: [
				{
					breakpoint: 500,
					options: {
						chart: {
							toolbar: {
								show: false,
							},
							type: 'bar',

							foreColor: '#fff',
							type: 'bar',
							height: 400,
							stacked: true,
						},

						legend: {
							fontFamily: 'Montserrat',
							position: 'top',
							horizontalAlign: 'center',
							offsetX: 0,
							itemMargin: {
								horizontal: 5,
								vertical: 0,
							},
							markers: {
								fillColors: ['#2bbf7f', '#ff4a55', '#40b0ff'],
								width: 15,
								height: 15,
							},
						},
					},
				},
			],
		},
	};

	return (
		<div className={`${styles.mainDiv}`}>
			{loadingSentimentChart ? (
				<div className={`${styles.loadingDiv}`}>
					<LoadingComp />
				</div>
			) : sentimentChartDataList.length === 0 ? (
				<div className={`${styles.loadingDiv}`}>
					<EmptyDataHandler type='cryptoNewsChart' />
				</div>
			) : (
				<div className={`${styles.chartDiv}`} id='chart'>
					<ReactApexChart
						options={state.options}
						series={state.series}
						type='bar'
						height={state.options.chart.height}
					/>
				</div>
			)}
		</div>
	);
};

Chart.propTypes = {
	getSentimentChartData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	cryptoNews: state.cryptoNews,
});

export default connect(mapStateToProps, {
	getSentimentChartData,
})(Chart);
