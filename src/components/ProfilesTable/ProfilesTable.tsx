import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table } from '../../elements/Table/Table';

interface IProfile {
  profileId: number;
  country: string;
  marketplace: string;
  accountId: number;
}

export const ProfilesTable: FC = () => {
  const { state } = useLocation();
  const { id } = state;
  const [profileList, setProfileList] = useState<IProfile[]>([]);
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/campaign/${id}`, { state: { id } });
  };

  useEffect(() => {
    const fetchAccounts = async (): Promise<void> => {
      const res = await fetch('/data/profiles.json');
      const profileList = await res.json();
      setProfileList(
        profileList.filter((profile: IProfile) => profile.accountId === id)
      );
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <Table
        tableName="PROFILES"
        list={profileList}
        handleClick={handleClick}
      />
    </div>
  );
};
