export const ROUTES = {
    HOME: '/',
    PRODUCTS: '/products',
    FAVORITES: '/favorites',
    CART: '/cart',
    LOGIN: '/login',
    REGISTER: '/register',
    PRODUCT_DETAIL: '/products/:id',
    PRODUCTS_SEARCH: "/products/search",
    PRODUCT_BY_CATEGORY: "/products/category/:category",
    CHECKOUT: '/checkout',
    ORDER_SUCCESS: '/order-success',
    MY_ACCOUNT: '/myaccount',
    FORGOT_PASSWORD: '/forgot-password'
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
