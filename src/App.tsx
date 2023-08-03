import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Navbar from './components/Navbar';
import AppRoutes from './components/Routes';
import Viewport from './components/Viewport';
import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Viewport>
          <AppRoutes />
        </Viewport>
      </Layout>
      <Loading />
    </BrowserRouter>
  );
}

export default App;
