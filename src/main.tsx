import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.tsx";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./contexts/CartContext.tsx";

const queryClient = new QueryClient();

const system = createSystem(defaultConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
        <Toaster position="top-right" />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
