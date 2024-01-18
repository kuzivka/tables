import { FC, useEffect, useState } from 'react';
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
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/profile/${id}`, { state: { id: id } });
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
    <Table tableName="ACCOUNTS" list={accountList} handleClick={handleClick} />
  );
};
