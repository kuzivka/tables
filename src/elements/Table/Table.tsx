import { useEffect, useState } from 'react';
import { TABLES, TableNames } from '../../assets/constants/tables';
import './TableStyles.scss';

interface IProps {
  tableName: (typeof TableNames)[keyof typeof TableNames];
  list: Record<string, any>[];
  handleClick?: (id: number) => void;
}

type TSortingOrder = 'asc' | 'desc' | undefined;

export const Table = ({ handleClick, tableName, list }: IProps) => {
  const { HEADER, TITLES } = TABLES[tableName];
  const titles = Object.keys(TITLES);
  const selection = window.getSelection();

  const [recordsList, setRecordsList] = useState(list);
  const [sortingOption, setSortingOption] = useState<string>(titles[0]);
  const [sortingOrder, setSortingOrder] = useState<TSortingOrder>('asc');

  const onClick = (id: number) => {
    if (handleClick && !selection?.toString().length) {
      return handleClick(id);
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
  }, [list]);

  return (
    <>
      {list && (
        <div>
          <h2 className="header">{HEADER}</h2>
          <table className="table">
            <thead className="table-header">
              <tr>
                {Object.entries(TITLES).map(([key, value]) => (
                  <th key={key} onClick={() => handleSorting(key)}>
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recordsList?.map((record) => (
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
        </div>
      )}
    </>
  );
};
