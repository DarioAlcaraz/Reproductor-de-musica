import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./header/header";
import Footer from "./Footer/Footer";
import AppRoutes from "./AppRoutes"; // ✅ tu archivo de rutas separado

import { FavoritosProvider } from "../context/FavoritosContext";
import { AuthProvider } from "../context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritosProvider>
          <Router>
            <Header />
            <AppRoutes />
            <Footer />
          </Router>
        </FavoritosProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;




