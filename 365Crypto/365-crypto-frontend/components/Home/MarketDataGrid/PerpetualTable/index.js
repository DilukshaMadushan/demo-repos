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
// //pagination
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
  { id: '4', label: 'Long 24($)', sortVariable: 'long' },
  { id: '5', label: 'Long%', sortVariable: 'longPer' },
  { id: '6', label: 'Short 24(H)', sortVariable: 'short' },
  { id: '7', label: 'Short(%)', sortVariable: 'shortPer' },
  { id: '8', label: '24H Volume($)', sortVariable: 'volume' },
  { id: '9', label: 'Funding Rate(%)', sortVariable: 'fundingRate' },
  { id: '10', label: 'Open Interest($)', sortVariable: 'openInterest' },
];
const skeletonArray = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
];

let PageSize = 6;

const PerpetualTable = ({
  websocket: { webSocketDataList, isLoading, exchangeData, type },
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

  const fundingRateMeadure = (frValues) => {
    if (frValues === null || frValues === 0) {
      return '-';
    }
    if (frValues) {
      return frValues.toFixed(5);
    }
  };

  const oiPerMeadure = (oiValues) => {
    if (oiValues === null) {
      return '-';
    }
    if (oiValues === 0) {
      return '0.01';
    }
    if (oiValues) {
      return oiValues.toFixed(2);
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

  return (
    <div>
      {isLoading === true || sortLoading === true ? (
        <div>
          <div className={`row ${styles.dataTable}`}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                      >
                        <Skeleton
                          variant="text"
                          width={'100%'}
                          height={20}
                          style={{ background: '#1b1a20' }}
                        />
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
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
                        </TableCell>

                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <Skeleton
                            variant="text"
                            width={'100%'}
                            height={20}
                            style={{ background: '#1b1a20' }}
                          />
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
          <div className={`row ${styles.dataTable}`}>
            {webSocketDataListArray && webSocketDataListArray.length === 0 ? (
              <EmptyDataHandler type="dataTables" />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                          onClick={() => {
                            setLebelSelect(column.sortVariable);
                            setSortVar(column.sortVariable);
                            setSortSubVar(column.sortSubVariable);
                            setSortLoading(true);
                            if (sortVar === column.sortVariable) {
                              setOrderSelect(!orderSelect);
                            }
                            if (sortVar !== column.sortVariable) {
                              setOrderSelect(true);
                            }
                          }}
                        >
                          <text
                            className={
                              lebelSelect === column.sortVariable
                                ? styles.tableHeadSelected
                                : styles.tableHead
                            }
                          >
                            {column.label}&nbsp;
                            {lebelSelect === column.sortVariable ? (
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
                                {type === 'perpectual' &&
                                exchangeData === 'Kucoin'
                                  ? item.pair.symbolCode &&
                                    item.pair.symbolCode
                                      .slice(0, -1)
                                      .replace(/[-/_]/g, '')
                                  : item.pair.symbolCode &&
                                    item.pair.symbolCode.replace(/[-/_]/g, '')}
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
                                    oiPerMeadure(item.oiPer) !== '-'
                                      ? parseFloat(oiPerMeadure(item.oiPer))
                                      : oiPerMeadure(item.oiPer)
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
                                {oiPerMeadure(item.oiPer) &&
                                oiPerMeadure(item.oiPer)[
                                  oiPerMeadure(item.oiPer).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : oiPerMeadure(item.oiPer) &&
                                    oiPerMeadure(item.oiPer)[
                                      oiPerMeadure(item.oiPer).length - 1
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
                                    fundingRateMeadure(
                                      item.fundingRate && item.fundingRate
                                    ) !== '-'
                                      ? parseFloat(
                                          fundingRateMeadure(
                                            item.fundingRate && item.fundingRate
                                          )
                                        )
                                      : fundingRateMeadure(
                                          item.fundingRate && item.fundingRate
                                        )
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
                                {fundingRateMeadure(
                                  item.fundingRate && item.fundingRate
                                ) &&
                                fundingRateMeadure(
                                  item.fundingRate && item.fundingRate
                                )[
                                  fundingRateMeadure(
                                    item.fundingRate && item.fundingRate
                                  ).length - 1
                                ] === 'M'
                                  ? 'M'
                                  : fundingRateMeadure(
                                      item.fundingRate && item.fundingRate
                                    ) &&
                                    fundingRateMeadure(
                                      item.fundingRate && item.fundingRate
                                    )[
                                      fundingRateMeadure(
                                        item.fundingRate && item.fundingRate
                                      ).length - 1
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
                          </TableRow>
                        ))
                        .slice(0, 6)}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
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

PerpetualTable.propTypes = {
  websocket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  websocket: state.websocket,
});
export default connect(mapStateToProps, null)(PerpetualTable);
