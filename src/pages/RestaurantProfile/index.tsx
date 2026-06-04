import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import { restaurants } from '../../data/restaurants';
import type { MenuItem } from '../../types';
import * as S from './styles';

const truncate = (text: string, max = 150): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const RestaurantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const restaurant = restaurants.find((item) => item.id === Number(id));

  if (!restaurant) {
    return (
      <S.PageWrapper>
        <Header />
        <S.Main>
          <p>Restaurante não encontrado.</p>
        </S.Main>
        <Footer />
      </S.PageWrapper>
    );
  }

  return (
    <S.PageWrapper>
      <Header />
      <S.Cover style={{ backgroundImage: `url(${restaurant.capa})` }}>
        <S.CoverOverlay>
          <S.CoverInner>
            <S.Category>{restaurant.tipo}</S.Category>
            <S.RestaurantName>{restaurant.titulo}</S.RestaurantName>
          </S.CoverInner>
        </S.CoverOverlay>
      </S.Cover>
      <S.Main>
        <S.ProductGrid>
          {restaurant.cardapio.map((produto) => (
            <S.ProductCard key={produto.id}>
              <img src={produto.foto} alt={produto.nome} />
              <S.ProductInfo>
                <S.ProductName>{produto.nome}</S.ProductName>
                <S.ProductDescription>
                  {truncate(produto.descricao)}
                </S.ProductDescription>
                <S.AddButton onClick={() => setSelectedItem(produto)}>
                  Mais detalhes
                </S.AddButton>
              </S.ProductInfo>
            </S.ProductCard>
          ))}
        </S.ProductGrid>
      </S.Main>
      <Footer />
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </S.PageWrapper>
  );
};

export default RestaurantProfile;
