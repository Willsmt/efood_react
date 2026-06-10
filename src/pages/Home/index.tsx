import Footer from '../../components/Footer';
import RestaurantCard from '../../components/RestaurantCard';
import { getRestaurants } from '../../services/api';
import { useFetch } from '../../hooks/useFetch';
import logo from '../../assets/image/logo.png';
import * as S from './styles';

const Home = () => {
  const {
    data: restaurants,
    isLoading,
    error,
  } = useFetch(getRestaurants, 'Não foi possível carregar os restaurantes.');

  return (
    <S.PageWrapper>
      <S.Hero>
        <S.Logo>
          <img src={logo} alt="efood" />
        </S.Logo>
        <S.HeroText>
          Viva experiências gastronômicas
          <br />
          no conforto da sua casa
        </S.HeroText>
      </S.Hero>
      <S.Main>
        {isLoading && <S.Message>Carregando restaurantes...</S.Message>}
        {error && <S.Message>{error}</S.Message>}
        {!isLoading && !error && restaurants && (
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
