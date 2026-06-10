import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import RestaurantProfile from '../pages/RestaurantProfile';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* :id é um parâmetro dinâmico, lido com useParams no perfil */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes/:id" element={<RestaurantProfile />} />
        {/* "*" casa com qualquer rota não encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
