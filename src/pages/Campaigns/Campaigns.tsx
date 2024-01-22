import { Link } from 'react-router-dom';
import { CampaignsTable } from '../../components/CampaignsTable/CampaignsTable';
import { GoBackBtn } from '../../elements/GoBackBtn/GoBackBtn';
import './CampaignsStyle.scss';

export const Campaigns = () => {
  return (
    <div className="campaigns-page">
      <div className="nav">
        <GoBackBtn />
        <Link className='to-accounts' to="/">Back to Accounts</Link>
      </div>
      <CampaignsTable />
    </div>
  );
};
