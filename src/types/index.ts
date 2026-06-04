export type MenuItem = {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  preco: number;
  porcao: string;
};

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

export type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'success';

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
