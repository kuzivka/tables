import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Accounts Table</h2>
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Email</th>
            <th>Auth Token</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {accountList.map(({ accountId, email, authToken, creationDate }) => (
            <tr key={accountId} onClick={() => handleClick(accountId)}>
              <td>{accountId}</td>
              <td>{email}</td>
              <td>{authToken}</td>
              <td>{creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
