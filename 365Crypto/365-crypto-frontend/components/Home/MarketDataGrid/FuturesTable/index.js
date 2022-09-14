import React, { useEffect, useState, useMemo, useRef } from 'react';
import styles from './index.module.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import { HiArrowSmDown } from 'react-icons/hi';
import { HiArrowSmUp } from 'react-icons/hi';
import AnimatedNumber from 'react-animated-number';
// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//pagination
import Pagination from '../Pagination/Pagination';
import EmptyDataHandler from '../../../Layout/common/EmptyDataHandler';

const columns = [
  {
    id: '1',
    label: 'Pair',
    sortVariable: 'pair',
    sortSubVariable: 'symbolCode',
  },
  { id: '2', label: 'Price($)', sortVariable: 'price' },
  { id: '3', label: 'OI(%)', sortVariable: 'oiPer' },
  { id: '4', label: 'Index($)', sortVariable: 'index' },
  { id: '5', label: 'Long 24($)', sortVariable: 'long' },
  { id: '6', label: 'Long%', sortVariable: 'longPer' },
  { id: '7', label: 'Short 24H($)', sortVariable: 'short' },
  { id: '8', label: 'Short(%)', sortVariable: 'shortPer' },
  { id: '9', label: '24H Volume($)', sortVariable: 'volume' },
  { id: '10', label: 'Open Interest($)', sortVariable: 'openInterest' },
  { id: '11', label: 'Expiry Date', sortVariable: 'expireDate' },
];
const skeletonArray = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
];
const skeletonType = (
  <Skeleton
    variant="text"
    width={'100%'}
    height={20}
    style={{ background: '#1b1a20' }}
  />
);

let PageSize = 6;

const FuturesTable = ({
  websocket: { webSocketDataList, isLoading, exchangeData },
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortVar, setSortVar] = useState('pair');
  const [sortSubVar, setSortSubVar] = useState('symbolCode');
  const [sortLoading, setSortLoading] = useState(false);
  const [lebelSelect, setLebelSelect] = useState('pair');
  const [orderSelect, setOrderSelect] = useState(true);
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    if (sortVar !== 'pair') {
      setSortedList(
        webSocketDataList &&
          webSocketDataList.sort(function (a, b) {
            return orderSelect === true
              ? b[sortVar] - a[sortVar]
              : a[sortVar] - b[sortVar];
          })
      );
    }
    if (sortVar === 'pair') {
      if (orderSelect === true) {
        setSortedList(
          webSocketDataList &&
            webSocketDataList.sort(function (a, b) {
              if (a[sortVar][sortSubVar] < b[sortVar][sortSubVar]) {
                return -1;
              }
              if (a[sortVar][sortSubVar] > b[sortVar][sortSubVar]) {
                return 1;
              }
              return 0;
            })
        );
      }
      if (orderSelect === false) {
        setSortedList(
          webSocketDataList &&
            webSocketDataList.sort(function (a, b) {
              if (a[sortVar][sortSubVar] > b[sortVar][sortSubVar]) {
                return -1;
              }
              if (a[sortVar][sortSubVar] < b[sortVar][sortSubVar]) {
                return 1;
              }
              return 0;
            })
        );
      }
    }
  }, [webSocketDataList, sortVar, orderSelect]);

  const webSocketDataListArray = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedList && sortedList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedList]);

  useEffect(() => {
    setCurrentPage(1);
    setSortVar('pair');
    setSortSubVar('symbolCode');
    setLebelSelect('pair');
    setOrderSelect(true);
  }, [exchangeData]);

  useEffect(() => {
    setSortLoading(false);
  }, [webSocketDataListArray]);

  const priceMeasure = (priceValues) => {
    if (priceValues === null || priceValues === 0) {
      return '-';
    }
    if (priceValues) {
      const length = priceValues.toFixed(0).toString().length;
      let measuredPrice;

      if (length >= 10) {
        let value = (priceValues / 1000000000).toFixed(2);
        measuredPrice = `${value.toString()}B`;
      }
      if (length < 10) {
        let value = (priceValues / 1000000).toFixed(2);
        measuredPrice = `${value.toString()}M`;
      }
      if (length < 6) {
        let value = priceValues.toFixed(2);
        measuredPrice = `${value.toString()}`;
      }
      return measuredPrice;
    }
  };
  const dateMeasure = (dateValues) => {
    if (dateValues === null || dateValues === 0) {
      return '-';
    }
    if (dateValues) {
      return dateValues.slice(0, 10);
    }
  };

  //Making current and prev arrays to compare for color change
  const prevCountRef = useRef();

  useEffect(() => {
    if (webSocketDataListArray) {
      prevCountRef.current =
        webSocketDataListArray &&
        webSocketDataListArray.map((item) => item.price);
    }
  }, [webSocketDataListArray]);

  //Making current and prev Index arrays to compare for color change
  const prevCountIndexRef = useRef();
  useEffect(() => {
    if (webSocketDataListArray) {
      prevCountIndexRef.current =
        webSocketDataListArray &&
        webSocketDataListArray.map((item) => item.index);
    }
  }, [webSocketDataListArray]);

  return (
    <div>
      {isLoading === true || sortLoading === true ? (
        <div>
          <div className={`row ${styles['data-table']}`}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((item) => (
                      <TableCell
                        style={{
                          borderBottomColor: 'rgb(63, 61, 61)',
                        }}
                      >
                        {skeletonType}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skeletonArray &&
                    skeletonArray.map((item, id) => (
                      <TableRow>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>

                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>

                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          {skeletonType}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={styles.paginationDiv}>
            <Skeleton
              variant="rect"
              width={'95%'}
              height={'100%'}
              style={{ background: '#1b1a20' }}
            />
          </div>
        </div>
      ) : (
        <div>
          {webSocketDataListArray && webSocketDataListArray.length === 0 ? (
            <div className={`row ${styles['data-table']}`}>
              <EmptyDataHandler type="dataTables" />
            </div>
          ) : (
            <div className={`row ${styles['data-table']}`}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((item) => (
                        <TableCell
                          style={{
                            borderBottomColor: 'rgb(63, 61, 61)',
                          }}
                          onClick={() => {
                            setLebelSelect(item.sortVariable);
                            setSortVar(item.sortVariable);
                            setSortSubVar(item.sortSubVariable);
                            setSortLoading(true);
                            if (sortVar === item.sortVariable) {
                              setOrderSelect(!orderSelect);
                            }
                            if (sortVar !== item.sortVariable) {
                              setOrderSelect(true);
                            }
                          }}
                        >
                          <text
                            className={
                              lebelSelect === item.sortVariable
                                ? styles.tableHeadSelected
                                : styles.tableHead
                            }
                          >
                            {item.label} &nbsp;
                            {lebelSelect === item.sortVariable ? (
                              orderSelect === true ? (
                                <HiArrowSmDown
                                  className={`${styles.arrowIcon}`}
                                  // onClick={() => setOrderSelect(!orderSelect)}
                                />
                              ) : (
                                <HiArrowSmUp
                                  className={`${styles.arrowIcon}`}
                                  // onClick={() => setOrderSelect(!orderSelect)}
                                />
                              )
                            ) : (
                              ''
                            )}
                          </text>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {webSocketDataListArray &&
                      webSocketDataListArray
                        .map((item, index) => (
                          <TableRow>
                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text
                                key={index}
                                className={`${styles['cell-data']}`}
                              >
                                {item.pair.symbolCode.replace(/[-/_]/g, '')}
                              </text>
                            </TableCell>
                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text
                                className={`${styles['cell-data']}`}
                                style={{
                                  color:
                                    parseFloat(priceMeasure(item.price)) &&
                                    parseFloat(priceMeasure(item.price)) ===
                                      parseFloat(prevCountRef.current[index]) &&
                                    parseFloat(prevCountRef.current[index])
                                      ? 'rgb(199, 194, 194)'
                                      : parseFloat(priceMeasure(item.price)) &&
                                        parseFloat(priceMeasure(item.price)) >
                                          parseFloat(
                                            prevCountRef.current[index]
                                          ) &&
                                        parseFloat(prevCountRef.current[index])
                                      ? '#33B18A'
                                      : parseFloat(priceMeasure(item.price)) &&
                                        parseFloat(priceMeasure(item.price)) <
                                          parseFloat(
                                            prevCountRef.current[index]
                                          ) &&
                                        parseFloat(prevCountRef.current[index])
                                      ? '#BD4F62'
                                      : '',
                                }}
                              >
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.price) !== '-'
                                      ? parseFloat(priceMeasure(item.price))
                                      : priceMeasure(item.price)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.price) &&
                                priceMeasure(item.price)[
                                  priceMeasure(item.price).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.price) &&
                                    priceMeasure(item.price)[
                                      priceMeasure(item.price).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text className={`${styles['cell-data']}`}>
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.oiPer) !== '-'
                                      ? parseFloat(priceMeasure(item.oiPer))
                                      : priceMeasure(item.oiPer)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.oiPer) &&
                                priceMeasure(item.oiPer)[
                                  priceMeasure(item.oiPer).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.oiPer) &&
                                    priceMeasure(item.oiPer)[
                                      priceMeasure(item.oiPer).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text
                                className={`${styles['cell-data']}`}
                                style={{
                                  color:
                                    parseFloat(priceMeasure(item.index)) &&
                                    parseFloat(priceMeasure(item.index)) ===
                                      parseFloat(
                                        prevCountIndexRef.current[index]
                                      ) &&
                                    parseFloat(prevCountIndexRef.current[index])
                                      ? 'rgb(199, 194, 194)'
                                      : parseFloat(priceMeasure(item.index)) &&
                                        parseFloat(priceMeasure(item.index)) >
                                          parseFloat(
                                            prevCountIndexRef.current[index]
                                          ) &&
                                        parseFloat(
                                          prevCountIndexRef.current[index]
                                        )
                                      ? '#33B18A'
                                      : parseFloat(priceMeasure(item.index)) &&
                                        parseFloat(priceMeasure(item.index)) <
                                          parseFloat(
                                            prevCountIndexRef.current[index]
                                          ) &&
                                        parseFloat(
                                          prevCountIndexRef.current[index]
                                        )
                                      ? '#BD4F62'
                                      : '',
                                }}
                              >
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.index) !== '-'
                                      ? parseFloat(priceMeasure(item.index))
                                      : priceMeasure(item.index)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.index) &&
                                priceMeasure(item.index)[
                                  priceMeasure(item.index).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.index) &&
                                    priceMeasure(item.index)[
                                      priceMeasure(item.index).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text className={`${styles['cell-data']}`}>
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.long) !== '-'
                                      ? parseFloat(priceMeasure(item.long))
                                      : priceMeasure(item.long)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.long) &&
                                priceMeasure(item.long)[
                                  priceMeasure(item.long).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.long) &&
                                    priceMeasure(item.long)[
                                      priceMeasure(item.long).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text className={`${styles['cell-data']}`}>
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.longPer) !== '-'
                                      ? parseFloat(priceMeasure(item.longPer))
                                      : priceMeasure(item.longPer)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.longPer) &&
                                priceMeasure(item.longPer)[
                                  priceMeasure(item.longPer).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.longPer) &&
                                    priceMeasure(item.longPer)[
                                      priceMeasure(item.longPer).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text className={`${styles['cell-data']}`}>
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.short) !== '-'
                                      ? parseFloat(priceMeasure(item.short))
                                      : priceMeasure(item.short)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.short) &&
                                priceMeasure(item.short)[
                                  priceMeasure(item.short).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.short) &&
                                    priceMeasure(item.short)[
                                      priceMeasure(item.short).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text className={`${styles['cell-data']}`}>
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.shortPer) !== '-'
                                      ? parseFloat(priceMeasure(item.shortPer))
                                      : priceMeasure(item.shortPer)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.shortPer) &&
                                priceMeasure(item.shortPer)[
                                  priceMeasure(item.shortPer).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.shortPer) &&
                                    priceMeasure(item.shortPer)[
                                      priceMeasure(item.shortPer).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text className={`${styles['cell-data']}`}>
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.volume) !== '-'
                                      ? parseFloat(priceMeasure(item.volume))
                                      : priceMeasure(item.volume)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.volume) &&
                                priceMeasure(item.volume)[
                                  priceMeasure(item.volume).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.volume) &&
                                    priceMeasure(item.volume)[
                                      priceMeasure(item.volume).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text className={`${styles['cell-data']}`}>
                                <AnimatedNumber
                                  value={
                                    priceMeasure(item.openInterest) !== '-'
                                      ? parseFloat(
                                          priceMeasure(item.openInterest)
                                        )
                                      : priceMeasure(item.openInterest)
                                  }
                                  duration={1000}
                                  formatValue={(n) =>
                                    n !== '-' ? parseFloat(n).toFixed(2) : '-'
                                  }
                                  frameStyle={(percentage) =>
                                    percentage > 20 && percentage < 80
                                      ? { opacity: 0.5 }
                                      : {}
                                  }
                                />
                                {priceMeasure(item.openInterest) &&
                                priceMeasure(item.openInterest)[
                                  priceMeasure(item.openInterest).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : priceMeasure(item.openInterest) &&
                                    priceMeasure(item.openInterest)[
                                      priceMeasure(item.openInterest).length - 1
                                    ] === 'B'
                                  ? 'B'
                                  : ''}
                              </text>
                            </TableCell>

                            <TableCell
                              style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                            >
                              <text className={`${styles['cell-data']}`}>
                                {dateMeasure(item.expireDate)}
                              </text>
                            </TableCell>
                          </TableRow>
                        ))
                        .slice(0, 6)}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={webSocketDataList && webSocketDataList.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

FuturesTable.propTypes = {
  websocket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  websocket: state.websocket,
});
export default connect(mapStateToProps, null)(FuturesTable);
