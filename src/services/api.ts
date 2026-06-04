import type { Restaurant } from '../types';

const BASE_URL = 'https://api-ebac.vercel.app/api/efood';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch(`${BASE_URL}/restaurantes`);
  return handleResponse<Restaurant[]>(response);
};

export const getRestaurant = async (id: number): Promise<Restaurant> => {
  const response = await fetch(`${BASE_URL}/restaurantes/${id}`);
  return handleResponse<Restaurant>(response);
};
