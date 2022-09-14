import React, { useState } from "react";
import styles from "./index.module.css";
import DatePicker, { getDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "./CustomButton";

const DateRangeDropdown = ({
  dateRange,
  setDateRange,
  startDate,
  endDate,
  handleChange,
  isMaxDate,
  setIsMaxDate,
  handleDateChangeforSentimentChart,
}) => {
  const handleStartDate = (firstInput) => {
    setIsMaxDate(firstInput);
  };

  return (
    <div className={`${styles.mainDiv}`}>
      <DatePicker
        customInput={<CustomButton />}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
          handleChange(update);
          handleStartDate(update[0]);
          handleDateChangeforSentimentChart(update);
        }}
        minDate={isMaxDate}
        maxDate={
          isMaxDate.valueOf() + 86400000 * 31 >= new Date() || isMaxDate === ""
            ? new Date()
            : isMaxDate.valueOf() + 86400000 * 31
        }
      />
    </div>
  );
};

export default DateRangeDropdown;
