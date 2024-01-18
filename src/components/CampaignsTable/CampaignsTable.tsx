import { FC, useEffect, useState } from 'react';
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
      <Table list={campaignsList} tableName="CAMPAIGNS" />
    </div>
  );
};
