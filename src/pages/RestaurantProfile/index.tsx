import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import { getRestaurant } from '../../services/api';
import { useFetch } from '../../hooks/useFetch';
import { truncate } from '../../utils/format';
import type { MenuItem } from '../../types';
import * as S from './styles';

const RestaurantProfile = () => {
  // `id` vem do parâmetro dinâmico da rota (/restaurantes/:id).
  const { id } = useParams<{ id: string }>();
  // Prato selecionado para abrir no modal (null = modal fechado).
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Rebusca sempre que o `id` da URL mudar (3º argumento = dependências).
  const {
    data: restaurant,
    isLoading,
    error,
  } = useFetch(
    () => getRestaurant(Number(id)),
    'Não foi possível carregar o restaurante.',
    [id],
  );

  if (isLoading) {
    return (
      <S.PageWrapper>
        <Header />
        <S.Main>
          <S.Message>Carregando...</S.Message>
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
          <S.Message>{error ?? 'Restaurante não encontrado.'}</S.Message>
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
                  Adicionar ao carrinho
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
