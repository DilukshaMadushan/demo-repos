import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});
import Skeleton from '@material-ui/lab/Skeleton';
import Loader from 'react-loader-spinner';
// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SKELETON_DATA_LIST = [
	{ id: '1' },
	{ id: '2' },
	{ id: '3' },
	{ id: '4' },
	{ id: '5' },
];

const PieChart = ({
	websocket: { webSocketDataList, isLoading },
	exchange: { exchangeList },
}) => {
	const [pieChartData, setPieChartData] = useState({
		allExchangesVolume: [],
		binanceVolume: [],
		bybitVolume: [],
		ftxVolume: [],
		kukoinVolume: [],
		huobiVolume: [],
	});

	//sum calculator
	const Sum = (id) => {
		const ExchangeSum =
			webSocketDataList &&
			webSocketDataList
				.filter((item) => item && item.exchange && item.exchange._id === id)
				.map((item) => item && item.volume);
		return (
			ExchangeSum.length > 0 && ExchangeSum.reduce((x, y) => x + y) / 1000000000
		);
	};

	//percentage calculator
	const percentage = (exchangeVolume) => {
		return (
			(exchangeVolume && exchangeVolume / pieChartData.allExchangesVolume) * 100
		).toFixed(2);
	};

	//set websocket data
	useEffect(() => {
		if (webSocketDataList) {
			setPieChartData({
				...pieChartData,
				allExchangesVolume:
					webSocketDataList &&
					webSocketDataList
						.map((item) => item && item.volume)
						.reduce((x, y) => x + y) / 1000000000,
				binanceVolume: Sum(exchangeList[0]._id),
				bybitVolume: Sum(exchangeList[1]._id),
				ftxVolume: Sum(exchangeList[2]._id),
				huobiVolume: Sum(exchangeList[3]._id),
				kukoinVolume: Sum(exchangeList[4]._id),
			});
		}
	}, [webSocketDataList]);

	const DATA_LIST = [
		{
			id: '1',
			color: '#008ffb',
			title: 'Binance',
			percentage: `${percentage(pieChartData.binanceVolume)}`,
		},
		{
			id: '2',
			color: '#00e396',
			title: 'Bybit',
			percentage: `${percentage(pieChartData.bybitVolume)}`,
		},
		{
			id: '3',
			color: '#feb019',
			title: 'Ftx',
			percentage: `${percentage(pieChartData.ftxVolume)}`,
		},
		{
			id: '4',
			color: '#ff4560',
			title: 'Kucoin',
			percentage: `${percentage(pieChartData.kukoinVolume)}`,
		},
		{
			id: '5',
			color: '#775dd0',
			title: 'Huobi',
			percentage: `${percentage(pieChartData.huobiVolume)}`,
		},
	];

	const SORTED_DATA_LIST = DATA_LIST.sort(function (a, b) {
		return b.percentage - a.percentage;
	});

	const state = {
		series: [
			pieChartData.binanceVolume,
			pieChartData.bybitVolume,
			pieChartData.ftxVolume,
			pieChartData.kukoinVolume,
			pieChartData.huobiVolume,
		],

		options: {
			labels: ['Binance', 'Bybit', 'Ftx', 'Kucoin', 'Huobi'],

			chart: {
				width: '100%',
				type: 'donut',
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				colors: ['#232327'],
				width: 1,
			},
			Responsive: [
				{
					breakpoint: 3000,
					options: {
						chart: {
							width: '100%',
						},
					},
				},
			],
			legend: false,
			tooltip: {
				shared: true,
				intersect: false,
				y: {
					formatter: function (y) {
						if (typeof y !== 'undefined') {
							return y.toFixed(2) + ' Billion';
						}
						return y;
					},
				},
			},
		},
	};

	return (
		<div className={`row ${styles['head-div']}`}>
			<h6 className={`${styles['title-div']}`}>Volume Analysis</h6>
			<div className={` ${styles['chart-div']}`}>
				{isLoading === true ? (
					<div className={` ${styles['spinner-div']}`}>
						<Loader type='Oval' color='#1b1a20' height={'70%'} width={'70%'} />
					</div>
				) : (
					<div className={` ${styles['pieChart-div']}`}>
						<ReactApexChart
							options={state.options}
							series={state.series}
							type='donut'
							width='100%'
						/>
					</div>
				)}
			</div>
			<div className=''>
				{isLoading === true
					? SKELETON_DATA_LIST.map((item, id) => (
							<div key={id} className={`row ${styles['data-div']}`}>
								<Skeleton
									style={{ background: '#1b1a20' }}
									variant='rect'
									width={'100%'}
									height={'100%'}
								/>
							</div>
					  ))
					: SORTED_DATA_LIST &&
					  SORTED_DATA_LIST.map((item, id) =>
							item.percentage <= 0.0 ? (
								<div
									key={id}
									className={`row ${styles['data-div-none']}`}
								></div>
							) : (
								<div key={id} className={`row ${styles['data-div']}`}>
									<div className={`col-2`}>
										<div
											className={`${styles['color-div']}`}
											style={{ backgroundColor: item.color }}
										></div>
									</div>
									<div className={`col-6 ${styles['exchange-div']}`}>
										{item.title}
									</div>
									<div className={`col-4 ${styles['percentage-div']}`}>
										{`${item.percentage}%`}
									</div>
								</div>
							)
					  )}
			</div>
		</div>
	);
};

PieChart.propTypes = {
	websocket: PropTypes.object.isRequired,
	exchange: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	websocket: state.websocket,
	exchange: state.exchange,
});
export default connect(mapStateToProps, {})(PieChart);
