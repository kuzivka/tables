import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Accounts } from '../pages/Accounts/Accounts';
import { Campaigns } from '../pages/Campaigns/Campaigns';
import { Profiles } from '../pages/Profiles/Profiles';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Accounts />} />
      <Route path={'/profile/:id'} element={<Profiles />} />
      <Route path={'/campaign/:id'} element={<Campaigns />} />
    </Routes>
  );
};
