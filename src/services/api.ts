import type { Purchase, PurchaseResponse, Restaurant } from '../types';

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

export const checkout = async (
  body: Purchase,
): Promise<PurchaseResponse> => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse<PurchaseResponse>(response);
};
