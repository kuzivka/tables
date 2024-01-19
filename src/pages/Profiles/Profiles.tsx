import { ProfilesTable } from '../../components/ProfilesTable/ProfilesTable';
import { GoBackBtn } from '../../elements/GoBackBtn/GoBackBtn';
import './ProfilesStyle.scss';

export const Profiles = () => {
  return (
    <div className="profiles-page">
      <div className="nav">
        <GoBackBtn />
      </div>

      <ProfilesTable />
    </div>
  );
};
