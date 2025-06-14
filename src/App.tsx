import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import PrivateRoute from "./components/PrivateRoute";

import Products from "./pages/Products";
import NewOrder from "./pages/NewOrder";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/User";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route
            path="/new-order"
            element={
              <PrivateRoute>
                <NewOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<p>Página no encontrada</p>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Users />
                </AdminRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
