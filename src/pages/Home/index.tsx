import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import RestaurantCard from '../../components/RestaurantCard';
import { getRestaurants } from '../../services/api';
import type { Restaurant } from '../../types';
import * as S from './styles';

const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRestaurants()
      .then((data) => setRestaurants(data))
      .catch(() => setError('Não foi possível carregar os restaurantes.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <S.PageWrapper>
      <S.Hero>
        <S.Logo>efood</S.Logo>
        <S.HeroText>
          Viva experiências gastronômicas
          <br />
          no conforto da sua casa
        </S.HeroText>
      </S.Hero>
      <S.Main>
        {isLoading && <S.Message>Carregando restaurantes...</S.Message>}
        {error && <S.Message>{error}</S.Message>}
        {!isLoading && !error && (
          <S.RestaurantGrid>
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </S.RestaurantGrid>
        )}
      </S.Main>
      <Footer />
    </S.PageWrapper>
  );
};

export default Home;
