import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CheckoutStep, MenuItem } from '../types';
import type { RootState } from './index';

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  step: CheckoutStep;
};

const initialState: CartState = {
  items: [],
  isOpen: false,
  step: 'cart',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<CartItem>) => {
        state.items.push(action.payload);
        state.isOpen = true;
        state.step = 'cart';
      },
      prepare: (item: MenuItem) => ({
        payload: {
          ...item,
          cartId: `${item.id}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`,
        } satisfies CartItem,
      }),
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.cartId !== action.payload,
      );
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
      state.step = 'cart';
    },
    setStep: (state, action: PayloadAction<CheckoutStep>) => {
      state.step = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.step = 'cart';
    },
  },
});

export const {
  addItem,
  removeItem,
  openSidebar,
  closeSidebar,
  setStep,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;
export const selectCartStep = (state: RootState) => state.cart.step;

// Valor total da compra = soma do preço de todos os produtos do carrinho.
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((accumulator, item) => accumulator + item.preco, 0);

export default cartSlice.reducer;
