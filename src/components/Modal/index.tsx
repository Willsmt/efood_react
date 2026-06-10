import { useAppDispatch } from '../../store/hooks';
import { addItem } from '../../store/cartSlice';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { formatPrice } from '../../utils/format';
import type { MenuItem } from '../../types';
import * as S from './styles';

type Props = {
  item: MenuItem;
  onClose: () => void;
};

const Modal = ({ item, onClose }: Props) => {
  const dispatch = useAppDispatch();

  // Enquanto o modal está aberto: trava o scroll do fundo e permite fechar
  // com a tecla Esc.
  useBodyScrollLock(true);
  useEscapeKey(onClose);

  // Adiciona o prato ao carrinho (Redux) e fecha o modal.
  const handleAdd = () => {
    dispatch(addItem(item));
    onClose();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Content onClick={(event) => event.stopPropagation()}>
        <S.Close onClick={onClose} aria-label="Fechar">
          ✕
        </S.Close>
        <S.Image src={item.foto} alt={item.nome} />
        <S.Details>
          <S.Title>{item.nome}</S.Title>
          <S.Description>
            {item.descricao}
            {'\n\n'}
            Serve: de {item.porcao}
          </S.Description>
          <S.AddButton onClick={handleAdd}>
            Adicionar ao carrinho - {formatPrice(item.preco)}
          </S.AddButton>
        </S.Details>
      </S.Content>
    </S.Overlay>
  );
};

export default Modal;
