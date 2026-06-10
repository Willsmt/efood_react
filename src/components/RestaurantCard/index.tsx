import { Link } from 'react-router-dom';
import type { Restaurant } from '../../types';
import * as S from './styles';

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
  const { id, titulo, descricao, capa, avaliacao, tipo, destacado } =
    restaurant;

  return (
    <S.Card>
      <S.ImageWrapper>
        <img src={capa} alt={titulo} />
        <S.Tags>
          {destacado && <S.Tag>Destaque da semana</S.Tag>}
          <S.Tag>{tipo}</S.Tag>
        </S.Tags>
      </S.ImageWrapper>
      <S.Info>
        <S.TitleRow>
          <S.Name>{titulo}</S.Name>
          <S.Rating>
            <span>{avaliacao}</span>
            <S.Star>★</S.Star>
          </S.Rating>
        </S.TitleRow>
        <S.Description>{descricao}</S.Description>
        {/* `as={Link}` faz o botão virar um link do Router (navega sem
            recarregar a página — comportamento de SPA) */}
        <S.Button as={Link} to={`/restaurantes/${id}`}>
          Saiba mais
        </S.Button>
      </S.Info>
    </S.Card>
  );
};

export default RestaurantCard;
