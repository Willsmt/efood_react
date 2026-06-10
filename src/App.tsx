import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';
import AppRoutes from './routes';

// Componente raiz. O ThemeProvider injeta o tema em todos os styled
// components. Sidebar e ScrollToTop ficam fora das rotas porque são globais
// (aparecem sobre qualquer página).
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes />
      <Sidebar />
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default App;
