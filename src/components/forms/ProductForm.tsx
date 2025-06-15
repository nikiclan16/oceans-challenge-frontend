import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { createProduct } from "../../services/productService";

const schema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  price: z.number().positive("Precio debe ser mayor a cero"),
});

type FormData = z.infer<typeof schema>;

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await createProduct(data);
      toast.success(`${res.name} creado correctamente.`);
    } catch (error) {
      console.log("error al crear el producto:", error);
      toast.error("Error al crear el producto.");
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block">Nombre del producto</label>
        <input
          {...register("name")}
          className="border p-2 w-full"
          placeholder="Arroz"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block">Precio</label>
        <input
          type="number"
          step="1000"
          min={0}
          {...register("price", { valueAsNumber: true })}
          className="border p-2 w-full"
          placeholder="1000"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear Producto
        </button>
      </div>
    </form>
  );
}
