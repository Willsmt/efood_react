import Footer from '../../components/Footer';
import RestaurantCard from '../../components/RestaurantCard';
import { restaurants } from '../../data/restaurants';
import * as S from './styles';

const Home = () => {
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
        <S.RestaurantGrid>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </S.RestaurantGrid>
      </S.Main>
      <Footer />
    </S.PageWrapper>
  );
};

export default Home;
