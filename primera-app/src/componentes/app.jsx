import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/home";
import Buscar from "./screens/buscar";
import Header from "../componentes/header";
import { FavoritosProvider } from "../context/FavoritosContext";




const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritosProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Buscar />} />
          </Routes>
        </Router>
      </FavoritosProvider>
    </QueryClientProvider>
  );
}

export default App;

