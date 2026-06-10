import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as S from './styles';

// Página de fallback: rota "*" (qualquer URL que não casou com as outras).
const NotFound = () => (
  <S.PageWrapper>
    <Header />
    <S.Main>
      <S.Title>Página não encontrada</S.Title>
      <S.Text>O endereço que você acessou não existe ou foi removido.</S.Text>
      <S.HomeLink as={Link} to="/">
        Voltar para a Home
      </S.HomeLink>
    </S.Main>
    <Footer />
  </S.PageWrapper>
);

export default NotFound;
