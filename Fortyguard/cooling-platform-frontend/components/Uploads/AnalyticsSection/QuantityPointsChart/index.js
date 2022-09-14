import React from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const QuantityPointsChart = ({ common: { darkThemeState } }) => {
	const state = {
		series: [
			{
				data: [21, 22, 10, 28, 16, 21],
			},
		],
		options: {
			yaxis: {
				labels: {
					style: {
						colors: darkThemeState ? '#AEAEAE' : '#494D58',
						fontSize: '12px',
						fontFamily: 'Roboto',
						fontWeight: 600,
					},
				},
				axisBorder: {
					show: true,
					color: darkThemeState ? '#AEAEAE' : '#AEAEAE',
					offsetX: 0,
					offsetY: 0,
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: darkThemeState ? '#AEAEAE' : '#AEAEAE',
					height: 6,
					offsetX: 0,
					offsetY: 0,
				},
			},

			grid: {
				show: false,
			},

			chart: {
				height: 240,
				type: 'bar',
				events: {
					click: function (chart, w, e) {
						// console.log(chart, w, e)
					},
				},
			},
			colors: ['#0091D0'],
			plotOptions: {
				bar: {
					columnWidth: '45%',
					distributed: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: false,
			},
			xaxis: {
				categories: [
					['24', 'Jan'],
					['25', 'Jan'],
					['26', 'Jan'],
					['27', 'Jan'],
					['28', 'Jan'],
					['29', 'Jan'],
				],
				labels: {
					style: {
						colors: darkThemeState ? '#AEAEAE' : '#494D58',
						fontSize: '12px',
						fontWeight: 600,
						fontFamily: 'Roboto',
					},
				},
			},
		},
	};

	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div id='chart'>
				<ReactApexChart
					options={state.options}
					series={state.series}
					type='bar'
					height={state.options.chart.height}
				/>
			</div>
		</div>
	);
};

QuantityPointsChart.propTypes = {};

const mapStateToProps = (state) => ({
	common: state.common,
});

export default connect(mapStateToProps, {})(QuantityPointsChart);
