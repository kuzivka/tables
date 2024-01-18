import { Link } from 'react-router-dom';
import { CampaignsTable } from '../../components/CampaignsTable/CampaignsTable';
import { GoBackBtn } from '../../elements/GoBackBtn/GoBackBtn';

export const Campaigns = () => {
  return (
    <div>
      <Link to="/">Back to Accounts</Link>
      <GoBackBtn />
      <CampaignsTable />
    </div>
  );
};
