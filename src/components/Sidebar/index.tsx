import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFocusTrap } from '../../hooks/useFocusTrap';
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
  const asideRef = useRef<HTMLElement>(null);

  // Um ÚNICO formulário cobre entrega e pagamento. O Formik cuida de
  // valores/erros/submit; o Yup (validationSchema) descreve as regras.
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
        .matches(/^\d{8}$/, 'O CEP deve ter 8 dígitos')
        .required('Campo obrigatório'),
      number: Yup.string()
        .matches(/^\d+$/, 'Informe um número válido')
        .required('Campo obrigatório'),
      complement: Yup.string(),
      cardName: Yup.string().required('Campo obrigatório'),
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, 'O número do cartão deve ter 16 dígitos')
        .required('Campo obrigatório'),
      cardCode: Yup.string()
        .matches(/^\d{3,4}$/, 'O CVV deve ter 3 ou 4 dígitos')
        .required('Campo obrigatório'),
      expiresMonth: Yup.string()
        .matches(/^(0[1-9]|1[0-2])$/, 'Mês inválido (01 a 12)')
        .required('Campo obrigatório'),
      expiresYear: Yup.string()
        .matches(/^\d{2,4}$/, 'Ano inválido')
        .required('Campo obrigatório'),
    }),
    // Só roda quando TODAS as validações passam. Monta o body no formato da
    // API e faz o POST.
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
        // Guarda o orderId devolvido pela API e só então mostra a tela de
        // sucesso — a confirmação aparece DEPOIS da resposta.
        setOrderId(response.orderId);
        dispatch(setStep('success'));
      } catch {
        setApiError('Não foi possível concluir o pedido. Tente novamente.');
      }
    },
  });

  // Trava o scroll do fundo e fecha com Esc enquanto a sidebar está aberta
  // (menos na tela de sucesso, onde a saída é só pelo botão "Concluir").
  // Esses hooks ficam ANTES do early-return abaixo por causa das regras dos
  // hooks (não podem ser chamados condicionalmente).
  useBodyScrollLock(isOpen);
  useEscapeKey(() => dispatch(closeSidebar()), isOpen && step !== 'success');
  useFocusTrap(asideRef, isOpen);

  if (!isOpen) {
    return null;
  }

  // Só mostra o erro de um campo se ele já foi "tocado" E está inválido —
  // assim não jogamos "Campo obrigatório" antes do usuário interagir.
  const checkInputHasError = (fieldName: keyof typeof form.values) => {
    const isTouched = fieldName in form.touched;
    const isInvalid = fieldName in form.errors;
    return isTouched && isInvalid;
  };

  // Avança para o pagamento só se os campos de ENTREGA estiverem válidos
  // (validamos um subconjunto do formulário, não o todo).
  const goToPayment = async () => {
    const errors = await form.validateForm();
    const deliveryFields: (keyof typeof form.values)[] = [
      'receiver',
      'description',
      'city',
      'zipCode',
      'number',
    ];
    await form.setTouched({
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
          aria-invalid={checkInputHasError('receiver') || undefined}
          aria-describedby={
            checkInputHasError('receiver') ? 'receiver-error' : undefined
          }
        />
        {checkInputHasError('receiver') && (
          <S.ErrorText id="receiver-error">{form.errors.receiver}</S.ErrorText>
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
          aria-invalid={checkInputHasError('description') || undefined}
          aria-describedby={
            checkInputHasError('description') ? 'description-error' : undefined
          }
        />
        {checkInputHasError('description') && (
          <S.ErrorText id="description-error">{form.errors.description}</S.ErrorText>
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
          aria-invalid={checkInputHasError('city') || undefined}
          aria-describedby={
            checkInputHasError('city') ? 'city-error' : undefined
          }
        />
        {checkInputHasError('city') && (
          <S.ErrorText id="city-error">{form.errors.city}</S.ErrorText>
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
            aria-invalid={checkInputHasError('zipCode') || undefined}
            aria-describedby={
              checkInputHasError('zipCode') ? 'zipCode-error' : undefined
            }
          />
          {checkInputHasError('zipCode') && (
            <S.ErrorText id="zipCode-error">{form.errors.zipCode}</S.ErrorText>
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
            aria-invalid={checkInputHasError('number') || undefined}
            aria-describedby={
              checkInputHasError('number') ? 'number-error' : undefined
            }
          />
          {checkInputHasError('number') && (
            <S.ErrorText id="number-error">{form.errors.number}</S.ErrorText>
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
        <S.Button type="button" onClick={() => void goToPayment()}>
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
          aria-invalid={checkInputHasError('cardName') || undefined}
          aria-describedby={
            checkInputHasError('cardName') ? 'cardName-error' : undefined
          }
        />
        {checkInputHasError('cardName') && (
          <S.ErrorText id="cardName-error">{form.errors.cardName}</S.ErrorText>
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
            aria-invalid={checkInputHasError('cardNumber') || undefined}
            aria-describedby={
              checkInputHasError('cardNumber') ? 'cardNumber-error' : undefined
            }
          />
          {checkInputHasError('cardNumber') && (
            <S.ErrorText id="cardNumber-error">{form.errors.cardNumber}</S.ErrorText>
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
            aria-invalid={checkInputHasError('cardCode') || undefined}
            aria-describedby={
              checkInputHasError('cardCode') ? 'cardCode-error' : undefined
            }
          />
          {checkInputHasError('cardCode') && (
            <S.ErrorText id="cardCode-error">{form.errors.cardCode}</S.ErrorText>
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
            aria-invalid={checkInputHasError('expiresMonth') || undefined}
            aria-describedby={
              checkInputHasError('expiresMonth') ? 'expiresMonth-error' : undefined
            }
          />
          {checkInputHasError('expiresMonth') && (
            <S.ErrorText id="expiresMonth-error">{form.errors.expiresMonth}</S.ErrorText>
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
            aria-invalid={checkInputHasError('expiresYear') || undefined}
            aria-describedby={
              checkInputHasError('expiresYear') ? 'expiresYear-error' : undefined
            }
          />
          {checkInputHasError('expiresYear') && (
            <S.ErrorText id="expiresYear-error">{form.errors.expiresYear}</S.ErrorText>
          )}
        </S.Field>
      </S.FieldRow>
      {apiError && <S.ErrorText role="alert">{apiError}</S.ErrorText>}
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
      <S.Aside
        ref={asideRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        onClick={(event) => event.stopPropagation()}
      >
        {step !== 'success' && (
          <S.Close
            type="button"
            onClick={() => dispatch(closeSidebar())}
            aria-label="Fechar"
          >
            ✕
          </S.Close>
        )}
        <form onSubmit={form.handleSubmit}>{renderStep()}</form>
      </S.Aside>
    </S.Overlay>
  );
};

export default Sidebar;
