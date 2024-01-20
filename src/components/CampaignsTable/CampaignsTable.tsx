import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from '../../elements/Table/Table';

interface ICampaign {
  campaignId: number;
  clicks: number;
  cost: number;
  date: string;
  profileId: number;
}

export const CampaignsTable: FC = () => {
  const { state } = useLocation();
  const { id } = state;
  const [campaignsList, setCampaignsList] = useState<ICampaign[]>([]);
  const [filteredList, setFilteredList] = useState<ICampaign[]>(campaignsList);
  const [min, setMin] = useState<string>();
  const [max, setMax] = useState<string>();

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMin(event.target.value.replace(/^0+(?=\d)/, '').replace(/^\D*$/, ''));
  };
  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMax(event.target.value.replace(/^0+(?=\d)/, '').replace(/^\D*$/, ''));
  };

  const handleFilter = () => {
    setFilteredList(
      [...campaignsList].filter(
        (campaign) =>
          campaign.cost > Number(min) &&
          campaign.cost < Number(max ? max : Infinity)
      )
    );
  };

  useEffect(() => {
    const fetchAccounts = async (): Promise<void> => {
      const res = await fetch('/data/campaigns.json');
      const list = await res.json();
      setCampaignsList(
        list.filter((campaign: ICampaign) => campaign.profileId === id)
      );
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <div className="filters">
        <h3>Cost Filter</h3>
        <label htmlFor="min-price">Min</label>
        <input
          type="number"
          name="min-price"
          id="min-price"
          min={0}
          step={1}
          value={min}
          onChange={handleMinChange}
        />
        <label htmlFor="max-price">Min</label>
        <input
          type="number"
          name="max-price"
          id="max-price"
          onChange={handleMaxChange}
          min={0}
          step={1}
          value={max}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <Table list={filteredList} tableName="CAMPAIGNS" />
    </div>
  );
};
