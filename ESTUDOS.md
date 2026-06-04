# 📚 Guia de Estudos — efood

Este documento explica **como cada parte do projeto funciona por dentro**, para você revisar os conceitos de React que aparecem no efood. A ideia não é só "o que o código faz", mas **por que** é feito assim.

Sumário:

1. [Visão geral e fluxo de dados](#1-visão-geral-e-fluxo-de-dados)
2. [TypeScript: os tipos do domínio](#2-typescript-os-tipos-do-domínio)
3. [Consumo de API (AJAX)](#3-consumo-de-api-ajax)
4. [Redux Toolkit (estado global)](#4-redux-toolkit-estado-global)
5. [Formik + Yup (formulários e validação)](#5-formik--yup-formulários-e-validação)
6. [O fluxo de checkout passo a passo](#6-o-fluxo-de-checkout-passo-a-passo)
7. [Styled Components e tema](#7-styled-components-e-tema)
8. [Roteamento](#8-roteamento)
9. [Deploy na Vercel](#9-deploy-na-vercel)
10. [Perguntas para fixar](#10-perguntas-para-fixar)
11. [Glossário](#11-glossário)

---

## 1. Visão geral e fluxo de dados

O app tem **duas telas** (Home e Perfil do restaurante) e um **carrinho/checkout** que vive numa *sidebar* sobreposta a qualquer tela.

```
                ┌──────────────────────────────────────────┐
                │                API EBAC                    │
                │  GET /restaurantes   GET /restaurantes/:id │
                │             POST /checkout                 │
                └──────────────────────────────────────────┘
                      ▲                ▲              ▲
            (AJAX)    │                │              │ (AJAX POST)
                      │                │              │
   ┌──────────┐   ┌───────────────────────┐   ┌─────────────────┐
   │   Home    │  │  RestaurantProfile     │   │  Sidebar/checkout│
   │ (lista)   │  │  (cardápio + Modal)    │   │  (Formik + POST) │
   └──────────┘   └───────────────────────┘   └─────────────────┘
                            │  addItem                    ▲
                            ▼                             │ lê items / total
                   ┌──────────────────────────────────────────┐
                   │        Redux store (cartSlice)             │
                   │   items · isOpen · step  +  selectCartTotal│
                   └──────────────────────────────────────────┘
```

**Duas naturezas de estado convivem aqui:**

- **Estado de servidor** (lista de restaurantes, cardápio): vem da API, é buscado com `fetch` dentro de `useEffect` e guardado em `useState` local da página.
- **Estado global do cliente** (carrinho, etapa do checkout, sidebar aberta/fechada): vive no **Redux**, porque é compartilhado entre componentes distantes (a Modal adiciona itens, o Header mostra a contagem, a Sidebar mostra a lista e o total).

> 💡 **Regra prática:** dado que pertence a **um** componente → `useState`. Dado compartilhado por **vários** componentes distantes → estado global (Redux).

---

## 2. TypeScript: os tipos do domínio

Arquivo: `src/types/index.ts`. Tipar o domínio primeiro faz o resto do código "se encaixar" — o editor te avisa quando um campo não existe ou tem o tipo errado.

```ts
export type MenuItem = {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  preco: number;
  porcao: string;
};

// Um item do carrinho é um MenuItem + um id único de carrinho
export type CartItem = MenuItem & {
  cartId: string;
};

export type Restaurant = {
  id: number;
  titulo: string;
  tipo: string;
  // ...
  cardapio: MenuItem[];
};

export type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'success';
```

Pontos de estudo:

- **Interseção (`&`)**: `CartItem` reaproveita tudo de `MenuItem` e **acrescenta** `cartId`. Evita repetir campos.
- **Por que o `cartId`?** O `id` do produto **não é único no carrinho** — você pode adicionar a mesma pizza duas vezes. Precisamos de um identificador único por *linha* do carrinho para a `key` do React e para remover o item certo.
- **Union de strings (`CheckoutStep`)**: limita a etapa a 4 valores possíveis. Se você digitar `setStep('pagamento')` (errado), o TypeScript reclama.

E os tipos do checkout, que descrevem exatamente o que a API espera receber e devolver:

```ts
export type Purchase = {
  products: { id: number; price: number }[];
  delivery: {
    receiver: string;
    address: { description: string; city: string; zipCode: string; number: number; complement?: string };
  };
  payment: {
    card: { name: string; number: string; code: number; expires: { month: number; year: number } };
  };
};

export type PurchaseResponse = { orderId: string };
```

> `complement?` com `?` = campo **opcional**. O resto é obrigatório.

---

## 3. Consumo de API (AJAX)

Arquivo: `src/services/api.ts`. **Centralizar as chamadas HTTP num único módulo** é uma boa prática: os componentes não precisam saber a URL nem o formato da requisição, só chamam `getRestaurants()`.

```ts
const BASE_URL = 'https://api-ebac.vercel.app/api/efood';

// Tratamento de erro reaproveitado por todas as chamadas
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

export const checkout = async (body: Purchase): Promise<PurchaseResponse> => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse<PurchaseResponse>(response);
};
```

Pontos de estudo:

- **`fetch` é assíncrono** → usamos `async/await`. `await fetch(...)` espera a resposta chegar.
- **`response.ok`**: `fetch` **não** lança erro em status 404/500 sozinho. Por isso checamos manualmente e lançamos `throw` — assim o `.catch()` de quem chamou é acionado.
- **POST**: precisa de `method`, `headers` (dizendo que o corpo é JSON) e `body` com `JSON.stringify(...)` (objeto JS → texto JSON).
- **Generics (`<T>`)**: `handleResponse<Restaurant[]>` diz ao TypeScript qual o tipo do retorno, sem repetir lógica.

### Como a página usa isso (padrão `useEffect`)

Na `Home` (`src/pages/Home/index.tsx`):

```tsx
const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  getRestaurants()
    .then((data) => setRestaurants(data))
    .catch(() => setError('Não foi possível carregar os restaurantes.'))
    .finally(() => setIsLoading(false));
}, []); // [] = roda só uma vez, quando o componente monta
```

Esse é o **padrão de 3 estados** para qualquer requisição:

1. `isLoading` → mostra "Carregando..."
2. `error` → mostra a mensagem de erro
3. dados → renderiza o conteúdo

> 💡 O array de dependências `[]` vazio faz o efeito rodar **uma única vez**. No `RestaurantProfile`, o array é `[id]` — toda vez que o `id` da URL muda, ele busca o restaurante de novo.

---

## 4. Redux Toolkit (estado global)

O carrinho começou como Context API e foi **migrado para Redux Toolkit** (padrão da EBAC para o efood). São 3 arquivos em `src/store/`.

### 4.1. A store — `store/index.ts`

```ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: { cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>; // tipo de TODO o estado
export type AppDispatch = typeof store.dispatch;            // tipo do dispatch
```

- `configureStore` junta todos os *reducers* num só estado. Aqui só temos `cart`, então o estado global é `{ cart: {...} }`.
- `RootState` e `AppDispatch` são tipos derivados automaticamente — usados pelos hooks tipados.

### 4.2. O slice — `store/cartSlice.ts`

Um **slice** = um pedaço do estado + as ações que o modificam, tudo junto.

```ts
const initialState: CartState = { items: [], isOpen: false, step: 'cart' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<CartItem>) => {
        state.items.push(action.payload); // ⬅ parece mutação, mas é seguro (Immer)
        state.isOpen = true;
        state.step = 'cart';
      },
      // prepare: transforma um MenuItem em CartItem ANTES de chegar ao reducer
      prepare: (item: MenuItem) => ({
        payload: { ...item, cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}` },
      }),
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.cartId !== action.payload);
    },
    openSidebar: (state) => { state.isOpen = true; },
    closeSidebar: (state) => { state.isOpen = false; state.step = 'cart'; },
    setStep: (state, action: PayloadAction<CheckoutStep>) => { state.step = action.payload; },
    clearCart: (state) => { state.items = []; state.step = 'cart'; },
  },
});

export const { addItem, removeItem, openSidebar, closeSidebar, setStep, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

Pontos de estudo (importantes!):

- **`state.items.push(...)` "muta" o estado?** No Redux puro isso seria proibido. Mas o Redux Toolkit usa o **Immer** por baixo: você escreve código que *parece* mutação e ele gera um novo estado imutável nos bastidores. Mais legível, mesmo resultado.
- **`prepare` callback**: o reducer deve ser **puro** (mesma entrada → mesma saída, sem efeitos). Gerar `cartId` com `Date.now()`/`Math.random()` é "impuro". Então isolamos essa geração no `prepare`, que monta o `payload` antes do reducer rodar. O reducer só recebe o `CartItem` pronto.
- **`PayloadAction<T>`**: tipa o que vem dentro de `action.payload`. Em `removeItem`, o payload é a string `cartId`.
- O `createSlice` **gera as actions automaticamente** (`addItem`, `removeItem`, ...) e o reducer. Você só exporta.

### 4.3. Selectors — derivando o total

Selectors são funções que **leem** o estado. O ponto central do requisito "valor total = soma dos preços":

```ts
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((acumulador, item) => acumulador + item.preco, 0);
```

- **`reduce`** percorre o array somando os `preco`. Começa em `0` e vai acumulando.
- **Por que um selector e não guardar `total` no estado?** Porque o total é **derivado** dos itens — se eu guardasse separado, correria o risco de ficar dessincronizado. Selector calcula sempre a partir da verdade (os itens). É a fonte única.

### 4.4. Hooks tipados — `store/hooks.ts`

```ts
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

Em vez de usar `useDispatch`/`useSelector` "crus", criamos versões que já conhecem os tipos da store. Assim `useAppSelector(selectCartTotal)` sabe que retorna `number`, sem você anotar nada.

### 4.5. Ligando tudo — `main.tsx`

```tsx
<Provider store={store}>
  <App />
</Provider>
```

O `<Provider>` disponibiliza a store para **toda** a árvore de componentes. Sem ele, `useAppSelector` não acha a store.

### 4.6. Como um componente consome

No **Header** (lê o estado e dispara ação):

```tsx
const items = useAppSelector(selectCartItems);   // LER
const dispatch = useAppDispatch();               // DISPARAR
// ...
<button onClick={() => dispatch(openSidebar())}>{items.length} produto(s)</button>
```

Na **Modal** (adiciona ao carrinho):

```tsx
const dispatch = useAppDispatch();
const handleAdd = () => { dispatch(addItem(item)); onClose(); };
```

> 💡 **O ciclo do Redux:** componente faz `dispatch(action())` → o reducer correspondente roda e atualiza o estado → todo componente que usa `useAppSelector` daquele pedaço **re-renderiza** automaticamente com o valor novo.

---

## 5. Formik + Yup (formulários e validação)

Arquivo: `src/components/Sidebar/index.tsx`. Os formulários de entrega e pagamento usam **Formik** (gerencia valores/erros/submit) + **Yup** (descreve as regras de validação).

### 5.1. Configuração do formulário

```tsx
const form = useFormik({
  initialValues: {
    receiver: '', description: '', city: '', zipCode: '', number: '', complement: '',
    cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: '',
  },
  validationSchema: Yup.object({
    receiver: Yup.string().min(5, 'O nome precisa ter pelo menos 5 caracteres').required('Campo obrigatório'),
    zipCode:  Yup.string().min(8, 'O CEP precisa ter pelo menos 8 caracteres').required('Campo obrigatório'),
    complement: Yup.string(), // opcional: sem .required()
    // ...demais campos
  }),
  onSubmit: async (values) => { /* monta o body e faz o POST */ },
});
```

- **`initialValues`**: todo campo começa string vazia. (Campos numéricos como `number` também são string aqui e convertidos com `Number(...)` na hora do envio.)
- **`validationSchema`**: cada campo tem suas regras encadeadas — `.min()`, `.required()`. A mensagem é o que aparece na tela.
- **`onSubmit`**: só roda quando **todas** as validações passam.

### 5.2. Ligando um `<input>` ao Formik

```tsx
<input
  id="receiver"
  name="receiver"                                  // precisa bater com a chave em initialValues
  value={form.values.receiver}                     // valor controlado pelo Formik
  onChange={form.handleChange}                      // atualiza o valor ao digitar
  onBlur={form.handleBlur}                          // marca o campo como "tocado" ao sair
  className={checkInputHasError('receiver') ? 'error' : ''}
/>
{checkInputHasError('receiver') && <S.ErrorText>{form.errors.receiver}</S.ErrorText>}
```

O helper que decide se mostra o erro:

```tsx
const checkInputHasError = (fieldName) => {
  const isTouched = fieldName in form.touched;  // o usuário já interagiu?
  const isInvalid = fieldName in form.errors;   // a validação falhou?
  return isTouched && isInvalid;                // só mostra erro se as duas forem true
};
```

> 💡 **Por que `touched`?** Para não jogar "Campo obrigatório" na cara do usuário antes mesmo dele clicar no campo. O erro só aparece depois que ele tocou e saiu (ou tentou enviar).

### 5.3. Validar só uma etapa antes de avançar

O checkout tem **um único formulário** que cobre entrega *e* pagamento. Ao clicar em "Continuar com o pagamento", validamos só os campos de entrega:

```tsx
const goToPayment = async () => {
  const errors = await form.validateForm();
  const deliveryFields = ['receiver', 'description', 'city', 'zipCode', 'number'];
  form.setTouched({ ...form.touched, receiver: true, description: true, city: true, zipCode: true, number: true });
  const hasError = deliveryFields.some((field) => field in errors);
  if (!hasError) dispatch(setStep('payment')); // só avança se a entrega estiver válida
};
```

---

## 6. O fluxo de checkout passo a passo

O estado `step` (no Redux) controla qual tela a Sidebar mostra. É uma "máquina de estados":

```
cart  ──"Continuar com a entrega"──▶  delivery
delivery ──(entrega válida)──▶  payment
payment ──"Finalizar pagamento" (POST OK)──▶  success
success ──"Concluir" (limpa carrinho)──▶  fecha
```

O `onSubmit` (disparado pelo botão "Finalizar pagamento", que é `type="submit"`):

```tsx
onSubmit: async (values) => {
  setApiError(null);
  try {
    const response = await checkout({
      products: items.map((item) => ({ id: item.id, price: item.preco })),
      delivery: {
        receiver: values.receiver,
        address: {
          description: values.description, city: values.city, zipCode: values.zipCode,
          number: Number(values.number), complement: values.complement,
        },
      },
      payment: {
        card: {
          name: values.cardName, number: values.cardNumber, code: Number(values.cardCode),
          expires: { month: Number(values.expiresMonth), year: Number(values.expiresYear) },
        },
      },
    });
    setOrderId(response.orderId);   // ⬅ guarda o orderId que a API devolveu
    dispatch(setStep('success'));   // ⬅ só troca de tela DEPOIS da resposta
  } catch {
    setApiError('Não foi possível concluir o pedido. Tente novamente.');
  }
},
```

Detalhes que valem ouro numa prova/entrevista:

- **`items.map(...)`** transforma os itens do carrinho no formato que a API quer (`{ id, price }`).
- **`Number(values.number)`**: os inputs guardam string; a API espera número. Convertemos no envio.
- **`await` antes de `setStep('success')`**: a tela de confirmação só aparece **depois** que a API responde. É exatamente o requisito "depois que a API responder, exiba a confirmação".
- **`setOrderId(response.orderId)`** + a tela de sucesso renderiza `Pedido realizado - {orderId}`: a confirmação é **preenchida com o dado da resposta**.
- **`form.isSubmitting`**: enquanto o POST está acontecendo, o botão vira "Finalizando..." e fica desabilitado (evita clique duplo).

Ao clicar em "Concluir":

```tsx
const finishOrder = () => {
  dispatch(clearCart());     // esvazia o carrinho no Redux
  dispatch(closeSidebar());  // fecha a sidebar
  setOrderId('');
  form.resetForm();          // limpa o formulário para o próximo pedido
};
```

---

## 7. Styled Components e tema

Estilos ficam em arquivos `styles.ts` ao lado de cada componente. As cores/fontes ficam centralizadas em `src/styles/theme.ts` e são acessadas via interpolação:

```ts
export const AddButton = styled.button`
  background-color: ${theme.colors.beige};
  color: ${theme.colors.coral};
  font-weight: ${theme.fonts.weights.bold};
`;
```

- **Por que um tema?** Se o coral mudar, você altera **um** lugar e o app inteiro acompanha.
- **Props dinâmicas**: o `FieldRow` aceita `$template` para mudar as colunas do grid. O `$` indica uma *transient prop* (não vai para o HTML).
- **Estado de erro no input**: adicionamos a classe `error`, e o styled component tem `&.error { border-color: #d40000; }`.

---

## 8. Roteamento

Arquivo: `src/routes/index.tsx`, com React Router v6:

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/restaurantes/:id" element={<RestaurantProfile />} />
  </Routes>
</BrowserRouter>
```

- **`:id`** é um parâmetro dinâmico. No `RestaurantProfile` lemos com `useParams()`:

```tsx
const { id } = useParams<{ id: string }>();
// ...
getRestaurant(Number(id)) // usamos o id da URL para buscar o restaurante certo
```

- O `RestaurantCard` navega com `<Link to={`/restaurantes/${id}`}>` — sem recarregar a página (SPA).

---

## 9. Deploy na Vercel

O repositório do GitHub está **conectado à Vercel**. O fluxo é:

1. `git push` para a branch `main`
2. A Vercel detecta o push, roda `npm run build` automaticamente
3. Publica o resultado em https://efood-react.vercel.app

Ou seja: **não existe comando manual de deploy** neste projeto — o deploy é contínuo (CI/CD). Cada commit na `main` vira uma nova versão em produção.

---

## 10. Perguntas para fixar

Tente responder sem olhar o código:

1. Qual a diferença entre o estado guardado em `useState` na `Home` e o estado guardado no Redux? Por que cada um está onde está?
2. Por que `fetch` não cai no `.catch()` sozinho quando a API retorna 500? Como o projeto resolve isso?
3. O que o `prepare` callback do `addItem` faz e por que ele existe?
4. Por que o `total` é um **selector** e não um campo guardado no estado?
5. O que acontece se eu remover o `await` antes de `dispatch(setStep('success'))`?
6. Por que o erro de validação só aparece depois que o usuário "toca" no campo?
7. Por que os campos numéricos passam por `Number(...)` antes do POST?
8. O que dispara um novo deploy na Vercel?

<details>
<summary>Respostas resumidas</summary>

1. `useState` = estado local de uma tela (lista de restaurantes só importa para a Home). Redux = estado compartilhado por componentes distantes (carrinho é lido por Header, Modal e Sidebar).
2. `fetch` só rejeita em erro de rede, não em status HTTP de erro. O projeto checa `response.ok` e dá `throw` manualmente.
3. Gera o `cartId` único e monta o `CartItem` **antes** do reducer, mantendo o reducer puro (sem `Date.now`/`Math.random` dentro dele).
4. Porque é um dado **derivado** dos itens; calcular sempre evita dessincronização.
5. A tela de sucesso apareceria antes da API responder, possivelmente com `orderId` vazio/errado.
6. Por causa do `touched` — evita mostrar erro antes de o usuário interagir.
7. Os `<input>` guardam string; a API espera número (`number`, `code`, `month`, `year`).
8. Um `git push` na branch `main` (deploy automático via integração GitHub↔Vercel).
</details>

---

## 11. Glossário

| Termo | O que é |
|---|---|
| **AJAX** | Buscar/enviar dados ao servidor sem recarregar a página (aqui via `fetch`). |
| **Slice** | Pedaço do estado Redux + suas ações e reducer, criados juntos com `createSlice`. |
| **Reducer** | Função que recebe o estado atual + uma ação e devolve o novo estado. |
| **Action** | Objeto que descreve "o que aconteceu" (ex.: `addItem(item)`). |
| **Dispatch** | Enviar uma action para a store processar. |
| **Selector** | Função que lê (e pode derivar) um valor do estado global. |
| **Immer** | Biblioteca que deixa você "mutar" o estado no reducer com segurança (RTK usa por baixo). |
| **Payload** | Os dados que viajam dentro de uma action (`action.payload`). |
| **Controlled input** | `<input>` cujo valor é controlado pelo React/Formik (`value` + `onChange`). |
| **SPA** | Single Page Application — troca de "páginas" sem recarregar o navegador. |
| **CI/CD** | Integração/entrega contínua — push → build → deploy automático. |
| **Transient prop** | Prop de styled-component prefixada com `$`, usada só no estilo (não vai pro DOM). |

---

> Bons estudos! Releia este guia junto com os arquivos citados — o aprendizado fica muito melhor com o código aberto ao lado.
