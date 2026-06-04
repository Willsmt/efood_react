import type { MenuItem, Restaurant } from '../types';

const pizzaFoto =
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=304&h=167&fit=crop';

const margueritaTexto =
  'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante, coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.';

const cardapioItaliano: MenuItem[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  nome: 'Pizza Marguerita',
  descricao: margueritaTexto,
  foto: pizzaFoto,
  preco: 60.9,
  porcao: 'Serve: de 2 a 3 pessoas',
}));

const descricaoItaliana =
  'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    titulo: 'Hioki Sushi',
    destacado: true,
    tipo: 'Japonesa',
    avaliacao: 4.9,
    descricao:
      'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!',
    capa: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=472&h=217&fit=crop',
    cardapio: cardapioItaliano,
  },
  ...Array.from({ length: 5 }, (_, index) => ({
    id: index + 2,
    titulo: 'La Dolce Vita Trattoria',
    destacado: false,
    tipo: 'Italiana',
    avaliacao: 4.6,
    descricao: descricaoItaliana,
    capa: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=472&h=217&fit=crop',
    cardapio: cardapioItaliano,
  })),
];
