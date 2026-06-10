import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// configureStore junta todos os reducers num único estado global.
// Aqui só temos o carrinho, então o estado é { cart: {...} }.
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Tipos derivados automaticamente da store, usados pelos hooks tipados.
export type RootState = ReturnType<typeof store.getState>; // formato de TODO o estado
export type AppDispatch = typeof store.dispatch; // tipo da função dispatch
