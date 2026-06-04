import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { CartProvider } from './contexts/CartContext';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CartProvider>
        <AppRoutes />
        <Sidebar />
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
