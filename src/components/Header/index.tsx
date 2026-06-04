import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openSidebar, selectCartItems } from '../../store/cartSlice';
import * as S from './styles';

const Header = () => {
  const items = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  return (
    <S.HeaderContainer>
      <S.Inner>
        <S.NavLink as={Link} to="/">
          Restaurantes
        </S.NavLink>
        <S.Logo as={Link} to="/">
          efood
        </S.Logo>
        <S.CartButton onClick={() => dispatch(openSidebar())}>
          {items.length} produto(s) no carrinho
        </S.CartButton>
      </S.Inner>
    </S.HeaderContainer>
  );
};

export default Header;
