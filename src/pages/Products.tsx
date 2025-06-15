import { useState } from "react";
import ProductList from "../components/ui/common/ProductList";
import { ToastContainer } from "react-toastify";
import { ButtonSubNav } from "../components/ui/buttons/ButtonSubNav";
import ProductForm from "../components/forms/ProductForm";
import { useAuthStore } from "../stores/auth/useAuthStore";
import { Navigate } from "react-router-dom";

export default function Products() {
  const [activeTab, setActiveTab] = useState(1);
  const { user } = useAuthStore();

  if (user && user.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  return (
    <>
      <ToastContainer />
      <div className="w-full flex justify-center items-center mb-6 gap-6">
        <ButtonSubNav
          name="Crear producto"
          action={() => setActiveTab(1)}
          isActive={activeTab === 1}
        />
        <ButtonSubNav
          name="Listado de productos"
          action={() => setActiveTab(2)}
          isActive={activeTab === 2}
        />
      </div>
      {activeTab === 1 ? <ProductForm /> : <ProductList />}
    </>
  );
}
