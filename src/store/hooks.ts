import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

// Versões tipadas de useDispatch/useSelector: já conhecem os tipos da store,
// então useAppSelector(selectCartTotal) sabe que retorna number sem anotar.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
