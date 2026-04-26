import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import { ROUTES } from "./routes";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import ProductSearchResult from "../pages/ProductSearchResult";
import AuthLayout from "../AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Favorites from "../pages/Favorites";
import Categories from "../pages/Categories";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSucess from "../pages/OrderSucess";
import MyAccount from "../pages/MyAccount";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <Products />,
      },
      {
        path: ROUTES.PRODUCTS_SEARCH,
        element: <ProductSearchResult />,
      },
      { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetail /> },
      {
        path: ROUTES.FAVORITES,
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.CART,
        element: <PrivateRoute><Cart /></PrivateRoute>
      },
      {
        path: ROUTES.PRODUCT_BY_CATEGORY,
        element: <Categories />
      },
      {
        path: ROUTES.CHECKOUT,
        element: <PrivateRoute><Checkout/></PrivateRoute>
      },
      {
        path: ROUTES.ORDER_SUCCESS,
        element: <PrivateRoute><OrderSucess /></PrivateRoute>
      },
      {
        path: ROUTES.MY_ACCOUNT,
        element: <PrivateRoute><MyAccount /></PrivateRoute>
      }
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />
      }
    ],
  },
]);

export default router;
