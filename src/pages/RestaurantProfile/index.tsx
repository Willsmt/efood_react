import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import { getRestaurant } from '../../services/api';
import type { MenuItem, Restaurant } from '../../types';
import * as S from './styles';

const truncate = (text: string, max = 150): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const RestaurantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    getRestaurant(Number(id))
      .then((data) => setRestaurant(data))
      .catch(() => setError('Não foi possível carregar o restaurante.'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <S.PageWrapper>
        <Header />
        <S.Main>
          <p>Carregando...</p>
        </S.Main>
        <Footer />
      </S.PageWrapper>
    );
  }

  if (error || !restaurant) {
    return (
      <S.PageWrapper>
        <Header />
        <S.Main>
          <p>{error ?? 'Restaurante não encontrado.'}</p>
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
