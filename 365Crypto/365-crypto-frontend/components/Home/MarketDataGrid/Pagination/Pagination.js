import React from "react";
import { usePagination, DOTS } from "./usePagination";
import styles from "./index.module.css";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <div className={`row ${styles.paginationDiv}`}>
      <div className={`${styles.paginationDiv1}`}>
        <div
          className={
            1 === currentPage ? styles.disabled : styles.paginationitem
          }
          onClick={onPrevious}
        >
          <text className={`${styles["prev-btn"]}`}>
            <FaAngleDoubleLeft />
            &nbsp;&nbsp;Previous
          </text>
          <text className={`${styles["prev-btn-mobile"]}`}>
            <FaAngleDoubleLeft />
            &nbsp;&nbsp;Prev
          </text>
        </div>

        {paginationRange &&
          paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <div className={styles.paginationitem} dots>
                  &#8230;
                </div>
              );
            }

            return (
              <div
                className={
                  currentPage === pageNumber
                    ? styles.selected
                    : styles.paginationitem
                }
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </div>
            );
          })}
        <div
          className={
            lastPage === currentPage ? styles.disabled : styles.paginationitem
          }
          onClick={onNext}
        >
          <text className={`${styles["next-btn"]}`}>
            Next&nbsp;&nbsp;
            <FaAngleDoubleRight />
          </text>
          <text className={`${styles["next-btn-mobile"]}`}>
            Next&nbsp;&nbsp;
            <FaAngleDoubleRight />
          </text>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
