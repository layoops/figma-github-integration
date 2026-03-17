import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import './styles/app.css';

import { AppContextProvider } from '@/shared/lib/contexts/app-context';
import { Layout } from '@/widgets/layout';

import { MyRoutes } from './routes/routes';
import { ROUTES, ROUTES_MAP } from './routes/routes-map';

const Main = () => {
  return (
    <Router
      initialEntries={[
        ROUTES_MAP[ROUTES.IMPORT],
        ROUTES_MAP[ROUTES.CREATE],
        ROUTES_MAP[ROUTES.SETTINGS],
        ROUTES_MAP[ROUTES.RESYNC],
      ]}
      initialIndex={0}
    >
      <AppContextProvider>
        <Layout>
          <MyRoutes />
        </Layout>
      </AppContextProvider>
    </Router>
  );
};

const domNode = document.getElementById('root') as HTMLElement;

ReactDOM.render(<Main />, domNode);
