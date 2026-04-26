# 🧠 Projeto de Aplicação E-commerce

O Projeto de Aplicação E-commerce é uma aplicação web completa desenvolvida para oferecer aos usuários uma experiência de compras online fluida. Este projeto tem como objetivo resolver o problema de plataformas de e-commerce complexas e confusas, oferecendo uma interface limpa, intuitiva e rica em funcionalidades. As principais funcionalidades incluem autenticação de usuários, gerenciamento de produtos, carrinho de compras, favoritos e um sistema de busca robusto.

## 🚀 Funcionalidades

- **Autenticação de Usuários**: Sistema seguro de login e cadastro com suporte à autenticação pelo Google
- **Gerenciamento de Produtos**: Catálogo completo de produtos com categorias, busca e opções de filtragem
- **Carrinho de Compras**: Adicionar, remover e atualizar itens no carrinho, com atualização automática de quantidade e cálculo do valor total
- **Favoritos**: Marcar itens como favoritos e armazená-los no Firebase Firestore para fácil acesso
- **Sistema de Busca**: Funcionalidade de busca robusta com autocomplete e opções de filtragem
- **Design Responsivo**: Design totalmente responsivo para uma experiência consistente em todos os dispositivos

## 🛠️ Stack Tecnológica

* Frontend: React, Chakra UI, React Router DOM
* Backend: Firebase Firestore, Firebase Authentication
* Pagamentos: Stripe
* APIs: Axios, DummyJSON
* Gerenciamento de Estado: React Context API
* Bibliotecas: React Query, React Hot Toast

## 📦 Instalação

Para começar com o projeto, siga os passos abaixo:

1. Clone o repositório usando `git clone`
2. Instale as dependências necessárias usando `npm install` ou `yarn install`
3. Configure um projeto no Firebase e habilite o Firestore e a Autenticação
4. Crie um arquivo `.env` e adicione as credenciais do seu projeto Firebase

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
STRIPE_SECRET_KEY=
VITE_STRIPE_PUBLIC_KEY=
```

## 💻 Uso

### Desenvolvimento padrão (sem Stripe)

Para rodar a aplicação normalmente com Vite:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Desenvolvimento com Stripe (pagamentos)

O Stripe requer que as funções serverless sejam executadas pelo Vercel. Para isso, instale o Vercel CLI:

```bash
npm install -g vercel
```

Em seguida, inicie o servidor com:

```bash
vercel dev
```

A aplicação estará disponível em `http://localhost:3000`

> ⚠️ Sem o `vercel dev`, o checkout retornará erro 404 pois as funções da pasta `api/` não serão executadas.

## 💳 Cartões de Teste

Para testar o fluxo de pagamento, utilize os seguintes cartões de teste do Stripe:

| Número do Cartão | Bandeira | Cenário |
|---|---|---|
| 4242 4242 4242 4242 | Visa | Pagamento aprovado |
| 5555 5555 5555 4444 | Mastercard | Pagamento aprovado |
| 4000 0000 0000 0002 | Visa | Pagamento recusado |
| 4000 0000 0000 9995 | Visa | Saldo insuficiente |
| 4000 0025 0000 3155 | Visa | Requer autenticação 3D Secure |

> Utilize qualquer data de validade futura, qualquer CVV de 3 dígitos e qualquer CEP.

## 📂 Estrutura do Projeto

```
.
├── api
│   └── create-payment-intent.ts
├── src
│   ├── App.tsx
│   ├── AuthLayout.tsx
│   ├── RootLayout.tsx
│   ├── main.tsx
│   ├── index.css
│   │
│   ├── assets
│   │
│   ├── components
│   │   ├── AllProductsList.tsx
│   │   ├── CardBenefit.tsx
│   │   ├── CardProduct.tsx
│   │   ├── CategoryBtn.tsx
│   │   ├── CheckoutForm.tsx
│   │   ├── DrawerMenu.tsx
│   │   ├── FilterMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Review.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── headers
│   │   │   ├── DesktopHeader.tsx
│   │   │   └── MobileHeader.tsx
│   │   └── ui_elements
│   │       ├── Banner.tsx
│   │       ├── BuyNowButton.tsx
│   │       ├── CarouselBannerProduct.tsx
│   │       ├── CarouselImageProduct.tsx
│   │       ├── DialogWarning.tsx
│   │       ├── EditNameForm.tsx
│   │       ├── GoogleBtn.tsx
│   │       ├── PaginationBar.tsx
│   │       ├── PurpleButton.tsx
│   │       └── SearchBar.tsx
│   │
│   ├── contexts
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── FavoritesContext.tsx
│   │
│   ├── hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useFavorites.ts
│   │   └── useProducts.ts
│   │
│   ├── pages
│   │   ├── Cart.tsx
│   │   ├── Categories.tsx
│   │   ├── Checkout.tsx
│   │   ├── Favorites.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── MyAccount.tsx
│   │   ├── OrderSucess.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Products.tsx
│   │   ├── ProductSearchResult.tsx
│   │   └── Register.tsx
│   │
│   ├── routes
│   │   ├── PrivateRoute.tsx
│   │   ├── router.tsx
│   │   └── routes.ts
│   │
│   ├── services
│   │   ├── api.ts
│   │   ├── firebase.ts
│   │   └── ProductService.ts
│   │
│   ├── styles
│   │   ├── components_CSS
│   │   ├── pages_css
│   │   └── ui_css
│   │
│   └── types
│       └── index.ts
│
├── .env
├── package.json
└── README.md
```

## 📝 Licença

Este projeto está licenciado sob a Licença MIT.
