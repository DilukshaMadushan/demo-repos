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

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
import Pagination from '../Pagination/Pagination';
import EmptyDataHandler from '../../../Layout/common/EmptyDataHandler';

const columns = [
  {
    id: '1',
    label: 'Exchange',
    sortVariable: 'exchange',
    sortSubVariable: 'name',
  },
  {
    id: '2',
    label: 'Pair',
    sortVariable: 'pair',
    sortSubVariable: 'symbolCode',
  },
  { id: '3', label: 'Price($)', sortVariable: 'price' },
  { id: '4', label: '24H Volume($)', sortVariable: 'volume' },
  { id: '5', label: '24H Change(%)', sortVariable: 'change' },
  { id: '6', label: '24H High', sortVariable: 'high' },
  { id: '7', label: '24H Low', sortVariable: 'low' },
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

const SpotTable = ({
  websocket: { webSocketDataList, coinData, isLoading },
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortVar, setSortVar] = useState('exchange');
  const [sortSubVar, setSortSubVar] = useState('name');
  const [sortLoading, setSortLoading] = useState(false);
  const [lebelSelect, setLebelSelect] = useState('exchange');
  const [orderSelect, setOrderSelect] = useState(true);
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    if (sortVar !== 'exchange' && sortVar !== 'pair') {
      setSortedList(
        webSocketDataList &&
          webSocketDataList.sort(function (a, b) {
            return orderSelect === true
              ? b[sortVar] - a[sortVar]
              : a[sortVar] - b[sortVar];
          })
      );
    }
    if (sortVar === 'exchange' || sortVar === 'pair') {
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
    setSortVar('exchange');
    setSortSubVar('name');
    setLebelSelect('exchange');
    setOrderSelect(true);
  }, [coinData]);

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
  const changeMeasure = (changeValues) => {
    if (changeValues === null || changeValues === 0) {
      return '-';
    }
    if (changeValues) {
      return changeValues.toFixed(5);
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
                    {columns.map((item, id) => (
                      <TableCell
                        style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                      >
                        {skeletonType}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skeletonArray &&
                    skeletonArray.map((item) => (
                      <TableRow>
                        <TableCell
                          style={{
                            borderBottomColor: 'rgb(63, 61, 61)',
                            paddingLeft: '0%',
                          }}
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
      ) : webSocketDataListArray && webSocketDataListArray.length === 0 ? (
        <div className={`row ${styles.dataTable}`}>
          <EmptyDataHandler type="dataTables" />
        </div>
      ) : (
        <div>
          <div className={`row ${styles.dataTable}`}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((item, id) => (
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
                          key={id}
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
                    webSocketDataListArray.map((item, index) => (
                      <TableRow>
                        <TableCell
                          style={{
                            borderBottomColor: 'rgb(63, 61, 61)',
                            paddingLeft: '0%',
                            color: '#fff',
                          }}
                        >
                          <div className={`${styles['cell-data']}`}>
                            <img
                              className={`${styles['img-style']}`}
                              src={IMAGE_BASE_URL + item.exchange.image}
                              alt={`${item.exchange.name} Exchange`}
                            />
                          </div>
                        </TableCell>
                        <TableCell
                          style={{ borderBottomColor: 'rgb(63, 61, 61)' }}
                        >
                          <text className={`${styles['cell-data']}`}>
                            {item.pair.symbolCode.replace(/[-/]/g, '')}
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
                                      parseFloat(prevCountRef.current[index]) &&
                                    parseFloat(prevCountRef.current[index])
                                  ? '#33B18A'
                                  : parseFloat(priceMeasure(item.price)) &&
                                    parseFloat(priceMeasure(item.price)) <
                                      parseFloat(prevCountRef.current[index]) &&
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
                                changeMeasure(item.change) !== '-'
                                  ? parseFloat(changeMeasure(item.change))
                                  : changeMeasure(item.change)
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
                            {changeMeasure(item.change) &&
                            changeMeasure(item.change)[
                              changeMeasure(item.change).length - 1
                            ] === 'M'
                              ? 'M'
                              : changeMeasure(item.change) &&
                                changeMeasure(item.change)[
                                  changeMeasure(item.change).length - 1
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
                                priceMeasure(item.high) !== '-'
                                  ? parseFloat(priceMeasure(item.high))
                                  : priceMeasure(item.high)
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
                            {priceMeasure(item.high) &&
                            priceMeasure(item.high)[
                              priceMeasure(item.high).length - 1
                            ] === 'M'
                              ? 'M'
                              : priceMeasure(item.high) &&
                                priceMeasure(item.high)[
                                  priceMeasure(item.high).length - 1
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
                                priceMeasure(item.low) !== '-'
                                  ? parseFloat(priceMeasure(item.low))
                                  : priceMeasure(item.low)
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
                            {priceMeasure(item.low) &&
                            priceMeasure(item.low)[
                              priceMeasure(item.low).length - 1
                            ] === 'M'
                              ? 'M'
                              : priceMeasure(item.low) &&
                                priceMeasure(item.low)[
                                  priceMeasure(item.low).length - 1
                                ] === 'B'
                              ? 'B'
                              : ''}
                          </text>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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

// SpotTable.propTypes = {
//   websocket: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  websocket: state.websocket,
});
export default connect(mapStateToProps, {})(SpotTable);
