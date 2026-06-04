import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/format';
import * as S from './styles';

const generateOrderId = (): string =>
  Math.random().toString(36).slice(2, 10).toUpperCase();

const Sidebar = () => {
  const {
    items,
    isOpen,
    step,
    total,
    removeItem,
    closeSidebar,
    setStep,
    clearCart,
  } = useCart();
  const [orderId, setOrderId] = useState('');

  if (!isOpen) {
    return null;
  }

  const finishPayment = () => {
    setOrderId(generateOrderId());
    setStep('success');
  };

  const finishOrder = () => {
    clearCart();
    closeSidebar();
  };

  const renderCart = () => (
    <>
      {items.length === 0 ? (
        <S.EmptyText>
          O carrinho está vazio, adicione pelo menos um produto para continuar
          com a compra.
        </S.EmptyText>
      ) : (
        <>
          <S.ProductList>
            {items.map((item) => (
              <S.Product key={item.cartId}>
                <S.ProductImage src={item.foto} alt={item.nome} />
                <S.ProductInfo>
                  <S.ProductName>{item.nome}</S.ProductName>
                  <S.ProductPrice>{formatPrice(item.preco)}</S.ProductPrice>
                </S.ProductInfo>
                <S.RemoveButton
                  onClick={() => removeItem(item.cartId)}
                  aria-label="Remover do carrinho"
                >
                  🗑
                </S.RemoveButton>
              </S.Product>
            ))}
          </S.ProductList>
          <S.TotalRow>
            <span>Valor total</span>
            <span>{formatPrice(total)}</span>
          </S.TotalRow>
          <S.Button onClick={() => setStep('delivery')}>
            Continuar com a entrega
          </S.Button>
        </>
      )}
    </>
  );

  const renderDelivery = () => (
    <>
      <S.Title>Entrega</S.Title>
      <S.Field>
        <label htmlFor="receiver">Quem irá receber</label>
        <input id="receiver" type="text" />
      </S.Field>
      <S.Field>
        <label htmlFor="address">Endereço</label>
        <input id="address" type="text" />
      </S.Field>
      <S.Field>
        <label htmlFor="city">Cidade</label>
        <input id="city" type="text" />
      </S.Field>
      <S.FieldRow>
        <S.Field>
          <label htmlFor="zipcode">CEP</label>
          <input id="zipcode" type="text" />
        </S.Field>
        <S.Field>
          <label htmlFor="number">Número</label>
          <input id="number" type="text" />
        </S.Field>
      </S.FieldRow>
      <S.Field>
        <label htmlFor="complement">Complemento (opcional)</label>
        <input id="complement" type="text" />
      </S.Field>
      <S.Buttons>
        <S.Button onClick={() => setStep('payment')}>
          Continuar com o pagamento
        </S.Button>
        <S.Button onClick={() => setStep('cart')}>
          Voltar para o carrinho
        </S.Button>
      </S.Buttons>
    </>
  );

  const renderPayment = () => (
    <>
      <S.Title>Pagamento - Valor a pagar {formatPrice(total)}</S.Title>
      <S.Field>
        <label htmlFor="cardName">Nome no cartão</label>
        <input id="cardName" type="text" />
      </S.Field>
      <S.FieldRow $template="1fr 87px">
        <S.Field>
          <label htmlFor="cardNumber">Número do cartão</label>
          <input id="cardNumber" type="text" />
        </S.Field>
        <S.Field>
          <label htmlFor="cvv">CVV</label>
          <input id="cvv" type="text" />
        </S.Field>
      </S.FieldRow>
      <S.FieldRow>
        <S.Field>
          <label htmlFor="expMonth">Mês de vencimento</label>
          <input id="expMonth" type="text" />
        </S.Field>
        <S.Field>
          <label htmlFor="expYear">Ano de vencimento</label>
          <input id="expYear" type="text" />
        </S.Field>
      </S.FieldRow>
      <S.Buttons>
        <S.Button onClick={finishPayment}>Finalizar pagamento</S.Button>
        <S.Button onClick={() => setStep('delivery')}>
          Voltar para a edição de endereço
        </S.Button>
      </S.Buttons>
    </>
  );

  const renderSuccess = () => (
    <>
      <S.Title>Pedido realizado - {orderId}</S.Title>
      <S.SuccessText>
        Estamos felizes em informar que seu pedido já está em processo de
        preparação e, em breve, será entregue no endereço fornecido.
        {'\n\n'}
        Gostaríamos de ressaltar que nossos entregadores não estão autorizados a
        realizar cobranças extras.
        {'\n\n'}
        Lembre-se da importância de higienizar as mãos após o recebimento do
        pedido, garantindo assim sua segurança e bem-estar durante a refeição.
        {'\n\n'}
        Esperamos que desfrute de uma deliciosa e agradável experiência
        gastronômica. Bom apetite!
      </S.SuccessText>
      <S.Button onClick={finishOrder}>Concluir</S.Button>
    </>
  );

  const renderStep = () => {
    switch (step) {
      case 'delivery':
        return renderDelivery();
      case 'payment':
        return renderPayment();
      case 'success':
        return renderSuccess();
      default:
        return renderCart();
    }
  };

  return (
    <S.Overlay onClick={step === 'success' ? undefined : closeSidebar}>
      <S.Aside onClick={(event) => event.stopPropagation()}>
        {renderStep()}
      </S.Aside>
    </S.Overlay>
  );
};

export default Sidebar;
