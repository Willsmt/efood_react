import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  clearCart,
  closeSidebar,
  removeItem,
  selectCartIsOpen,
  selectCartItems,
  selectCartStep,
  selectCartTotal,
  setStep,
} from '../../store/cartSlice';
import { checkout } from '../../services/api';
import { formatPrice } from '../../utils/format';
import * as S from './styles';

const Sidebar = () => {
  const items = useAppSelector(selectCartItems);
  const isOpen = useAppSelector(selectCartIsOpen);
  const step = useAppSelector(selectCartStep);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const [orderId, setOrderId] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useFormik({
    initialValues: {
      receiver: '',
      description: '',
      city: '',
      zipCode: '',
      number: '',
      complement: '',
      cardName: '',
      cardNumber: '',
      cardCode: '',
      expiresMonth: '',
      expiresYear: '',
    },
    validationSchema: Yup.object({
      receiver: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('Campo obrigatório'),
      description: Yup.string()
        .min(5, 'O endereço precisa ter pelo menos 5 caracteres')
        .required('Campo obrigatório'),
      city: Yup.string()
        .min(3, 'A cidade precisa ter pelo menos 3 caracteres')
        .required('Campo obrigatório'),
      zipCode: Yup.string()
        .min(8, 'O CEP precisa ter pelo menos 8 caracteres')
        .required('Campo obrigatório'),
      number: Yup.string().required('Campo obrigatório'),
      complement: Yup.string(),
      cardName: Yup.string().required('Campo obrigatório'),
      cardNumber: Yup.string().required('Campo obrigatório'),
      cardCode: Yup.string()
        .min(3, 'O CVV precisa ter pelo menos 3 dígitos')
        .required('Campo obrigatório'),
      expiresMonth: Yup.string().required('Campo obrigatório'),
      expiresYear: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      setApiError(null);
      try {
        const response = await checkout({
          products: items.map((item) => ({
            id: item.id,
            price: item.preco,
          })),
          delivery: {
            receiver: values.receiver,
            address: {
              description: values.description,
              city: values.city,
              zipCode: values.zipCode,
              number: Number(values.number),
              complement: values.complement,
            },
          },
          payment: {
            card: {
              name: values.cardName,
              number: values.cardNumber,
              code: Number(values.cardCode),
              expires: {
                month: Number(values.expiresMonth),
                year: Number(values.expiresYear),
              },
            },
          },
        });
        setOrderId(response.orderId);
        dispatch(setStep('success'));
      } catch {
        setApiError('Não foi possível concluir o pedido. Tente novamente.');
      }
    },
  });

  if (!isOpen) {
    return null;
  }

  const checkInputHasError = (fieldName: keyof typeof form.values) => {
    const isTouched = fieldName in form.touched;
    const isInvalid = fieldName in form.errors;
    return isTouched && isInvalid;
  };

  const goToPayment = async () => {
    const errors = await form.validateForm();
    const deliveryFields: (keyof typeof form.values)[] = [
      'receiver',
      'description',
      'city',
      'zipCode',
      'number',
    ];
    form.setTouched({
      ...form.touched,
      receiver: true,
      description: true,
      city: true,
      zipCode: true,
      number: true,
    });
    const hasError = deliveryFields.some((field) => field in errors);
    if (!hasError) {
      dispatch(setStep('payment'));
    }
  };

  const finishOrder = () => {
    dispatch(clearCart());
    dispatch(closeSidebar());
    setOrderId('');
    setApiError(null);
    form.resetForm();
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
                  type="button"
                  onClick={() => dispatch(removeItem(item.cartId))}
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
          <S.Button type="button" onClick={() => dispatch(setStep('delivery'))}>
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
        <input
          id="receiver"
          name="receiver"
          type="text"
          value={form.values.receiver}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className={checkInputHasError('receiver') ? 'error' : ''}
        />
        {checkInputHasError('receiver') && (
          <S.ErrorText>{form.errors.receiver}</S.ErrorText>
        )}
      </S.Field>
      <S.Field>
        <label htmlFor="description">Endereço</label>
        <input
          id="description"
          name="description"
          type="text"
          value={form.values.description}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className={checkInputHasError('description') ? 'error' : ''}
        />
        {checkInputHasError('description') && (
          <S.ErrorText>{form.errors.description}</S.ErrorText>
        )}
      </S.Field>
      <S.Field>
        <label htmlFor="city">Cidade</label>
        <input
          id="city"
          name="city"
          type="text"
          value={form.values.city}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className={checkInputHasError('city') ? 'error' : ''}
        />
        {checkInputHasError('city') && (
          <S.ErrorText>{form.errors.city}</S.ErrorText>
        )}
      </S.Field>
      <S.FieldRow>
        <S.Field>
          <label htmlFor="zipCode">CEP</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={form.values.zipCode}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={checkInputHasError('zipCode') ? 'error' : ''}
          />
          {checkInputHasError('zipCode') && (
            <S.ErrorText>{form.errors.zipCode}</S.ErrorText>
          )}
        </S.Field>
        <S.Field>
          <label htmlFor="number">Número</label>
          <input
            id="number"
            name="number"
            type="text"
            value={form.values.number}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={checkInputHasError('number') ? 'error' : ''}
          />
          {checkInputHasError('number') && (
            <S.ErrorText>{form.errors.number}</S.ErrorText>
          )}
        </S.Field>
      </S.FieldRow>
      <S.Field>
        <label htmlFor="complement">Complemento (opcional)</label>
        <input
          id="complement"
          name="complement"
          type="text"
          value={form.values.complement}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
      </S.Field>
      <S.Buttons>
        <S.Button type="button" onClick={goToPayment}>
          Continuar com o pagamento
        </S.Button>
        <S.Button type="button" onClick={() => dispatch(setStep('cart'))}>
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
        <input
          id="cardName"
          name="cardName"
          type="text"
          value={form.values.cardName}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className={checkInputHasError('cardName') ? 'error' : ''}
        />
        {checkInputHasError('cardName') && (
          <S.ErrorText>{form.errors.cardName}</S.ErrorText>
        )}
      </S.Field>
      <S.FieldRow $template="1fr 87px">
        <S.Field>
          <label htmlFor="cardNumber">Número do cartão</label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            value={form.values.cardNumber}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={checkInputHasError('cardNumber') ? 'error' : ''}
          />
          {checkInputHasError('cardNumber') && (
            <S.ErrorText>{form.errors.cardNumber}</S.ErrorText>
          )}
        </S.Field>
        <S.Field>
          <label htmlFor="cardCode">CVV</label>
          <input
            id="cardCode"
            name="cardCode"
            type="text"
            value={form.values.cardCode}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={checkInputHasError('cardCode') ? 'error' : ''}
          />
          {checkInputHasError('cardCode') && (
            <S.ErrorText>{form.errors.cardCode}</S.ErrorText>
          )}
        </S.Field>
      </S.FieldRow>
      <S.FieldRow>
        <S.Field>
          <label htmlFor="expiresMonth">Mês de vencimento</label>
          <input
            id="expiresMonth"
            name="expiresMonth"
            type="text"
            value={form.values.expiresMonth}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={checkInputHasError('expiresMonth') ? 'error' : ''}
          />
          {checkInputHasError('expiresMonth') && (
            <S.ErrorText>{form.errors.expiresMonth}</S.ErrorText>
          )}
        </S.Field>
        <S.Field>
          <label htmlFor="expiresYear">Ano de vencimento</label>
          <input
            id="expiresYear"
            name="expiresYear"
            type="text"
            value={form.values.expiresYear}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={checkInputHasError('expiresYear') ? 'error' : ''}
          />
          {checkInputHasError('expiresYear') && (
            <S.ErrorText>{form.errors.expiresYear}</S.ErrorText>
          )}
        </S.Field>
      </S.FieldRow>
      {apiError && <S.ErrorText>{apiError}</S.ErrorText>}
      <S.Buttons>
        <S.Button type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting ? 'Finalizando...' : 'Finalizar pagamento'}
        </S.Button>
        <S.Button type="button" onClick={() => dispatch(setStep('delivery'))}>
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
      <S.Button type="button" onClick={finishOrder}>
        Concluir
      </S.Button>
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
    <S.Overlay
      onClick={step === 'success' ? undefined : () => dispatch(closeSidebar())}
    >
      <S.Aside onClick={(event) => event.stopPropagation()}>
        <form onSubmit={form.handleSubmit}>{renderStep()}</form>
      </S.Aside>
    </S.Overlay>
  );
};

export default Sidebar;
