const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatPrice = (value: number): string =>
  currencyFormatter.format(value);

export const truncate = (text: string, max = 150): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;
