// Formatação de moeda no padrão brasileiro (R$ 1.234,50). Usar Intl em vez
// de montar a string na mão garante separador de milhar e casas decimais
// corretos. Criamos o formatter uma vez (fora da função) por performance.
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatPrice = (value: number): string =>
  currencyFormatter.format(value);

// Corta um texto longo e adiciona "..." (usado na descrição dos pratos).
export const truncate = (text: string, max = 150): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;
