import { useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addItem } from '../../store/cartSlice';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { formatPrice } from '../../utils/format';
import type { MenuItem } from '../../types';
import * as S from './styles';

type Props = {
  item: MenuItem;
  onClose: () => void;
};

const Modal = ({ item, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const contentRef = useRef<HTMLDivElement>(null);

  // Enquanto o modal está aberto: trava o scroll do fundo, fecha com Esc e
  // prende o foco do teclado dentro do conteúdo.
  useBodyScrollLock(true);
  useEscapeKey(onClose);
  useFocusTrap(contentRef);

  // Adiciona o prato ao carrinho (Redux) e fecha o modal.
  const handleAdd = () => {
    dispatch(addItem(item));
    onClose();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Content
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <S.Close onClick={onClose} aria-label="Fechar">
          ✕
        </S.Close>
        <S.Image src={item.foto} alt={item.nome} />
        <S.Details>
          <S.Title id="modal-title">{item.nome}</S.Title>
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
