import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../elements/Table/Table';

interface IAccount {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: string;
}

export const AccountsTable: FC = () => {
  const [accountList, setAccountList] = useState<IAccount[]>([]);
  const [filterStart, setFilterStart] = useState<string>();
  const [filterEnd, setFilterEnd] = useState<string>();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/profile/${id}`, { state: { id: id } });
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterStart(event.target.value);
  };
  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterEnd(event.target.value);
  };

  const handleFilter = () => {
    if (filterStart && filterEnd) {
      setAccountList(
        [...accountList].filter(
          (account) =>
            Date.parse(account.creationDate) > Date.parse(filterStart) &&
            Date.parse(account.creationDate) < Date.parse(filterEnd)
        )
      );
    }
  };

  useEffect(() => {
    const fetchAccounts = async (): Promise<void> => {
      const res = await fetch('/data/accounts.json');
      const accList = await res.json();
      setAccountList(accList);
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h2 className="header">Accounts Table</h2>
      <div className="filters-container">
        <h3 className='filters-header'>Filter By Date</h3>
        <div className="filters">
          <input
            type="date"
            name="start-date"
            id="start-date"
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            name="end-date"
            id="end-date"
            onChange={handleEndDateChange}
          />
          <button
            className="filter-btn"
            onClick={handleFilter}
            disabled={!(filterEnd && filterStart)}
          >
            Filter
          </button>
        </div>
      </div>
      <Table
        tableName="ACCOUNTS"
        list={accountList}
        handleClick={handleClick}
      />
    </div>
  );
};
