import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import RestaurantProfile from '../pages/RestaurantProfile';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes/:id" element={<RestaurantProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
