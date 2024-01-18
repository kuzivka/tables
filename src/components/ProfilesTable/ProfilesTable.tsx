import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    navigate('/');
    console.log('click');
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
      <h2>Accounts Table</h2>
      <table>
        <thead>
          <tr>
            <th>Profile ID</th>
            <th>Country</th>
            <th>Marketplace</th>
          </tr>
        </thead>
        <tbody>
          {profileList.map(({ profileId, marketplace, country }) => (
            <tr key={profileId} onClick={() => handleClick(profileId)}>
              <td>{profileId}</td>
              <td>{country}</td>
              <td>{marketplace}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};
