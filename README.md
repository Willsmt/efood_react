# 🍔 efood

Aplicativo de delivery de comida desenvolvido no módulo de React da **EBAC**, a partir de um layout do Figma. O usuário navega por restaurantes, vê o cardápio de cada um, adiciona pratos ao carrinho e finaliza o pedido por um checkout em etapas (entrega → pagamento → confirmação) que envia os dados para uma API real.

🔗 **Deploy:** https://efood-react.vercel.app
📦 **Repositório:** https://github.com/Willsmt/efood_react

---

## 🛠️ Tecnologias

| Categoria | Ferramenta |
|---|---|
| Build / bundler | **Vite** |
| Biblioteca de UI | **React 18** |
| Linguagem | **TypeScript** |
| Estilização | **Styled Components** |
| Rotas | **React Router DOM v6** |
| Estado global | **Redux Toolkit** + **react-redux** |
| Formulários e validação | **Formik** + **Yup** |
| Hospedagem | **Vercel** (deploy automático via GitHub) |

---

## 🚀 Como rodar o projeto

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo de desenvolvimento (http://localhost:5173)
npm run dev

# 3. Gerar a build de produção
npm run build

# 4. Pré-visualizar a build localmente
npm run preview

# 5. Checar lint
npm run lint
```

> Requer **Node.js 18+**.

---

## 📁 Estrutura de pastas

```
src/
├── App.tsx                 # Componente raiz (providers de tema, rotas e sidebar)
├── main.tsx                # Ponto de entrada; injeta o <Provider> do Redux
├── components/             # Componentes reutilizáveis
│   ├── Header/             # Cabeçalho com contador do carrinho
│   ├── Footer/             # Rodapé com logo e redes sociais
│   ├── RestaurantCard/     # Card de restaurante na Home
│   ├── Modal/              # Detalhe do produto (adiciona ao carrinho)
│   └── Sidebar/            # Carrinho + checkout (cart → delivery → payment → success)
├── pages/
│   ├── Home/               # Lista de restaurantes (consome a API)
│   └── RestaurantProfile/  # Perfil do restaurante + cardápio (consome a API)
├── routes/index.tsx        # Definição das rotas
├── store/                  # Redux Toolkit
│   ├── index.ts            # Configuração da store + tipos RootState/AppDispatch
│   ├── cartSlice.ts        # Slice do carrinho (estado, reducers e selectors)
│   └── hooks.ts            # Hooks tipados useAppDispatch / useAppSelector
├── services/api.ts         # Funções de acesso à API (fetch / AJAX)
├── types/index.ts          # Tipos do domínio (TypeScript)
├── utils/format.ts         # Utilitários (ex.: formatPrice)
└── styles/
    ├── theme.ts            # Design tokens (cores, fontes, tamanhos)
    └── global.ts           # Estilos globais
```

---

## 🔌 API

Base: `https://api-ebac.vercel.app/api/efood`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/restaurantes` | Lista todos os restaurantes (usada na Home) |
| `GET` | `/restaurantes/:id` | Detalhe de um restaurante + cardápio (usada no perfil) |
| `POST` | `/checkout` | Finaliza o pedido e retorna o `orderId` |

### Corpo enviado no `POST /checkout`

```json
{
  "products": [{ "id": 1, "price": 69.9 }],
  "delivery": {
    "receiver": "Willian Martins",
    "address": {
      "description": "Rua das Flores",
      "city": "São Paulo",
      "zipCode": "01001000",
      "number": 123,
      "complement": "Apto 45"
    }
  },
  "payment": {
    "card": {
      "name": "WILLIAN MARTINS",
      "number": "4111111111111111",
      "code": 123,
      "expires": { "month": 12, "year": 2030 }
    }
  }
}
```

### Resposta

```json
{ "orderId": "#25692" }
```

O `orderId` retornado é exibido na tela de confirmação do pedido.

---

## ✨ Funcionalidades

- ✅ Listagem de restaurantes carregada por **AJAX**
- ✅ Perfil de restaurante com cardápio carregado por **AJAX**
- ✅ Modal com detalhe do produto e botão "Adicionar ao carrinho"
- ✅ Carrinho gerenciado por **Redux** (adicionar/remover itens)
- ✅ **Valor total = soma do preço dos produtos** do carrinho
- ✅ Checkout em etapas com **formulários validados** (Formik + Yup)
- ✅ Envio do pedido via **POST** para a API
- ✅ Tela de confirmação preenchida com o **`orderId`** retornado pela API

---

## 🎨 Design tokens (`src/styles/theme.ts`)

| Token | Valor |
|---|---|
| Coral (primária) | `#e66767` |
| Bege (fundo de cards) | `#ffebd9` |
| Background | `#fff8f2` |
| Texto de input | `#4b4b4b` |
| Overlay | `rgba(0, 0, 0, 0.8)` |
| Fonte | Roboto (400, 700, 900) |

---

> 📚 Para entender **como cada parte funciona por dentro** (Redux, AJAX, Formik, fluxo de checkout), leia o **[ESTUDOS.md](./ESTUDOS.md)**.
