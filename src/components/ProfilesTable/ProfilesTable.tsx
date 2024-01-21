import { ChangeEvent, FC, useEffect, useState } from 'react';
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
  const [countriesFilter, setCountriesFilter] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<IProfile[]>([]);
  const navigate = useNavigate();

  const countries = Array.from(
    new Set(profileList.map((profile) => profile.country))
  );

  const handleClick = (id: number) => {
    navigate(`/campaign/${id}`, { state: { id } });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCountriesFilter([...countriesFilter, event.target.value]);
    }
    if (!event.target.checked) {
      setCountriesFilter(
        [...countriesFilter].filter((country) => country !== event.target.value)
      );
    }
  };

  const handleFilter = () => {
    setFilteredList(
      [...profileList].filter(
        (profile) =>
          countriesFilter.includes(profile.country) || !countriesFilter.length
      )
    );
  };

  useEffect(() => {
    const fetchAccounts = async (): Promise<void> => {
      const res = await fetch('/data/profiles.json');
      const profileList = await res.json();
      const accountProfiles = profileList.filter(
        (profile: IProfile) => profile.accountId === id
      );
      setProfileList(accountProfiles);
      setFilteredList(accountProfiles);
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <div className="filters">
        {countries.map((country) => (
          <div key={country}>
            <input
              value={country}
              type="checkbox"
              name={country}
              id={country}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={country}>{country}</label>
          </div>
        ))}
        <button onClick={handleFilter}>Filter</button>
      </div>
      <Table
        tableName="PROFILES"
        list={filteredList}
        handleClick={handleClick}
      />
    </div>
  );
};
