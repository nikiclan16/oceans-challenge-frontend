import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import NewOrder from "./pages/NewOrder";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4 flex space-x-4">
        <Link to="/products">Productos</Link>
        <Link to="/new-order">Nueva Orden</Link>
        <Link to="/dashboard">Órdenes</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<p>Página no encontrada</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
