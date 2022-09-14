import React, { useState } from 'react';
import styles from './index.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomButton from './CustomButton';

const DateRangeDropdown = ({
	dateRange,
	setDateRange,
	startDate,
	endDate,
	handleChange,
}) => {
	return (
		<div className={`${styles.mainDiv}`}>
			<DatePicker
				customInput={<CustomButton />}
				selectsRange={true}
				dateFormat='dd-MM-yyyy'
				startDate={startDate}
				endDate={endDate}
				onChange={(update) => {
					setDateRange(update);
					handleChange(update);
				}}
			/>
		</div>
	);
};

export default DateRangeDropdown;
