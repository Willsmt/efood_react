import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import * as S from './styles';

const Header = () => {
  const { items, openSidebar } = useCart();

  return (
    <S.HeaderContainer>
      <S.Inner>
        <S.NavLink as={Link} to="/">
          Restaurantes
        </S.NavLink>
        <S.Logo as={Link} to="/">
          efood
        </S.Logo>
        <S.CartButton onClick={openSidebar}>
          {items.length} produto(s) no carrinho
        </S.CartButton>
      </S.Inner>
    </S.HeaderContainer>
  );
};

export default Header;
