// Tipos do domínio do app. Definir o "formato" dos dados primeiro faz o
// editor avisar quando um campo não existe ou tem o tipo errado.

// Um prato do cardápio (como vem da API).
export type MenuItem = {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  preco: number;
  porcao: string;
};

// Item já dentro do carrinho: tudo de MenuItem (interseção `&`) + um id
// próprio. Precisamos do cartId porque o mesmo prato pode ser adicionado
// várias vezes — o `id` do produto não seria único no carrinho.
export type CartItem = MenuItem & {
  cartId: string;
};

export type Restaurant = {
  id: number;
  titulo: string;
  destacado: boolean;
  tipo: string;
  avaliacao: number;
  descricao: string;
  capa: string;
  cardapio: MenuItem[];
};

// Union de strings: a etapa do checkout só pode ser um destes 4 valores.
export type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'success';

// Corpo exato esperado pela API no POST /checkout.
export type Purchase = {
  products: {
    id: number;
    price: number;
  }[];
  delivery: {
    receiver: string;
    address: {
      description: string;
      city: string;
      zipCode: string;
      number: number;
      complement?: string;
    };
  };
  payment: {
    card: {
      name: string;
      number: string;
      code: number;
      expires: {
        month: number;
        year: number;
      };
    };
  };
};

export type PurchaseResponse = {
  orderId: string;
};
