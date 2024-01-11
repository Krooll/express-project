import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout.js';

// import routes
import Home from './components/pages/Home/HomePage.js';
import NotFound from './components/pages/NotFound/NotFoundPage.js';
import Prices from './components/pages/Prices/PricesPage.js';
import Order from './components/pages/Order/OrderPage.js';

const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prices" element={<Prices />} />
      <Route path="/order-a-ticket" element={<Order />} />
      <Route element={<NotFound />} />
    </Routes>
  </MainLayout>
);

export default App;
