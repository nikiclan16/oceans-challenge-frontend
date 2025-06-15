import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { ButtonSubNav } from "../buttons/ButtonSubNav";
import { ToastContainer } from "react-toastify";

export default function Products() {
  const [activeKey, setActiveKey] = useState(1);
  return (
    <>
      <ToastContainer />
      <div className="w-full flex justify-center items-center mb-6 gap-6">
        <ButtonSubNav
          name="Crear producto"
          action={() => setActiveKey(1)}
          isActive={activeKey === 1}
        />
        <ButtonSubNav
          name="Listado de productos"
          action={() => setActiveKey(2)}
          isActive={activeKey === 2}
        />
      </div>
      {activeKey === 1 ? <ProductForm /> : <ProductList />}
    </>
  );
}
