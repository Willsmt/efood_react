import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, CheckoutStep, MenuItem } from '../types';

type CartContextData = {
  items: CartItem[];
  isOpen: boolean;
  step: CheckoutStep;
  total: number;
  addItem: (item: MenuItem) => void;
  removeItem: (cartId: string) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setStep: (step: CheckoutStep) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('cart');

  const addItem = useCallback((item: MenuItem) => {
    const cartItem: CartItem = {
      ...item,
      cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
    setItems((current) => [...current, cartItem]);
    setIsOpen(true);
    setStep('cart');
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems((current) => current.filter((item) => item.cartId !== cartId));
  }, []);

  const openSidebar = useCallback(() => setIsOpen(true), []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
    setStep('cart');
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setStep('cart');
  }, []);

  const total = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.preco, 0),
    [items],
  );

  const value = useMemo<CartContextData>(
    () => ({
      items,
      isOpen,
      step,
      total,
      addItem,
      removeItem,
      openSidebar,
      closeSidebar,
      setStep,
      clearCart,
    }),
    [
      items,
      isOpen,
      step,
      total,
      addItem,
      removeItem,
      openSidebar,
      closeSidebar,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextData => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
