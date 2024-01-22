import { useEffect, useMemo, useState } from 'react';
import { TABLES, TableNames } from '../../assets/constants/tables';
import './TableStyles.scss';

interface IProps {
  tableName: (typeof TableNames)[keyof typeof TableNames];
  list: Record<string, any>[];
  handleClick?: (id: number) => void;
}

type TSortingOrder = 'asc' | 'desc';

export const Table = ({ handleClick, tableName, list }: IProps) => {
  const { TITLES } = TABLES[tableName];
  const titles = Object.keys(TITLES);
  const selection = window.getSelection();
  const SHOW_ON_PAGE = 5;

  const [recordsList, setRecordsList] = useState(list);
  const [sortingOption, setSortingOption] = useState<string>(titles[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortingOrder, setSortingOrder] = useState<TSortingOrder>('asc');

  const amountOfPages = Math.ceil(list.length / SHOW_ON_PAGE);
  const getRange = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, i) => i + start);
  };
  const pagesArray = getRange(1, amountOfPages);

  const paginatedList = recordsList.slice(
    (currentPage - 1) * SHOW_ON_PAGE,
    currentPage * SHOW_ON_PAGE
  );

  const onClick = (id: number) => {
    if (handleClick && !selection?.toString().length) {
      return handleClick(id);
    }
  };

  const pageListRange = useMemo(() => {
    const leftPage = Math.max(currentPage - 1, 1);
    const rightPage = Math.min(currentPage + 1, amountOfPages);
    const addLeftDots = leftPage > 2;
    const addRightDots = rightPage < amountOfPages - 2;

    if (4 >= amountOfPages) {
      return pagesArray;
    }
    if (!addLeftDots && addRightDots) {
      const leftRange = getRange(1, 4);
      return [...leftRange, '...', amountOfPages];
    }
    if (addLeftDots && !addRightDots) {
      const rightRange = getRange(amountOfPages - 4 + 1, amountOfPages);
      return [1, '...', ...rightRange];
    }
    if (addLeftDots && addRightDots) {
      const middleRange = getRange(leftPage, rightPage);
      return [1, '...', ...middleRange, '...', amountOfPages];
    }
  }, [amountOfPages, currentPage, pagesArray]);

  const onPageChange = (page: number | string) => () => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  const handleSorting = (option: string) => {
    const sortedList = [...list].sort((a, b) => {
      const isString = typeof a[option] === 'string';
      const isDate = !!Date.parse(a[option]) && isString;

      const ascSort = () =>
        isDate
          ? Date.parse(a[option]) - Date.parse(b[option])
          : isString
          ? a[option].localeCompare(b[option])
          : a[option] - b[option];
      const descOrder = () =>
        isDate
          ? Date.parse(b[option]) - Date.parse(a[option])
          : isString
          ? b[option].localeCompare(a[option])
          : b[option] - a[option];

      if (option !== sortingOption) {
        setSortingOption(option);
        setSortingOrder('asc');
        return ascSort();
      } else if (option === sortingOption) {
        if (sortingOrder === 'desc') {
          setSortingOrder('asc');
          return ascSort();
        } else {
          setSortingOrder('desc');
          return descOrder();
        }
      }
    });

    setRecordsList(sortedList);
  };

  useEffect(() => {
    setRecordsList(list);
    setCurrentPage(1);
  }, [list]);

  return (
    <>
      {list && (
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                {Object.entries(TITLES).map(([key, value]) => (
                  <th key={key} onClick={() => handleSorting(key)}>
                    <span
                      className={`material-symbols-outlined sort-icon ${
                        key === sortingOption ? 'sorting ' + sortingOrder : ''
                      }`}
                    >
                      arrow_downward
                    </span>
                    <span className="th-text">{value}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedList?.map((record) => (
                <tr
                  className={!!handleClick ? 'table-row' : ''}
                  key={record[titles[0]]}
                  onClick={() => onClick(record[titles[0]])}
                >
                  {titles.map((title, index) => (
                    <td className="table-data" key={`${record[title]}${index}`}>
                      {record[title]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <span>Page:</span>
            {pageListRange?.map((pageNumber: number | string) => (
              <span
                key={pageNumber}
                className={currentPage === pageNumber ? 'active page-number' : 'page-number'}
                onClick={onPageChange(pageNumber)}
              >
                {pageNumber}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
