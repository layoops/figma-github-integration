import { Navigate, Route, Routes } from 'react-router-dom';

import { CreatePage } from '@/pages/create-page/create-page';
import { ImportPage } from '@/pages/import-page/import-page';
import { ResyncPage } from '@/pages/resync-page/resync-page';
import { SettingsPage } from '@/pages/settings-page';

import { ROUTES, ROUTES_MAP } from './routes-map';

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES_MAP[ROUTES.IMPORT]} />} />
      <Route path={ROUTES_MAP[ROUTES.IMPORT]} element={<ImportPage />} />
      <Route path={ROUTES_MAP[ROUTES.CREATE]} element={<CreatePage />} />
      <Route path={ROUTES_MAP[ROUTES.SETTINGS]} element={<SettingsPage />} />
      <Route path={ROUTES_MAP[ROUTES.RESYNC]} element={<ResyncPage />} />
    </Routes>
  );
};
