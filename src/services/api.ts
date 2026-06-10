// Camada de acesso à API: centraliza todas as chamadas HTTP num só lugar.
// Os componentes não precisam saber a URL nem o formato — só chamam estas
// funções (ex.: getRestaurants()).
import type { Purchase, PurchaseResponse, Restaurant } from '../types';

const BASE_URL = 'https://api-ebac.vercel.app/api/efood';

// Tratamento de resposta reaproveitado por todas as chamadas.
// Importante: o fetch NÃO lança erro em status 404/500 sozinho — por isso
// checamos `response.ok` manualmente e damos throw, acionando o .catch() de
// quem chamou. O generic <T> tipa o JSON retornado sem repetir lógica.
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

// POST: precisa de method, headers (avisando que o corpo é JSON) e o body
// convertido de objeto JS para texto com JSON.stringify.
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
