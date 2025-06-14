import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { registerUser } from "../services/userService";

const schema = z.object({
  username: z.string().min(1, "Usuario requerido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  role: z.enum(["admin", "mesero"]),
});

type FormData = z.infer<typeof schema>;

export default function UserForm() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      setMessage("✅ Usuario creado correctamente");
      reset();
    } catch (err) {
      setMessage("❌ Error al crear usuario");
      console.error("error al registrar usuario:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 mt-8"
    >
      <h2 className="text-xl font-bold">Registrar nuevo usuario</h2>

      <div>
        <label>Usuario</label>
        <input {...register("username")} className="w-full border p-2" />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border p-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label>Rol</label>
        <select {...register("role")} className="w-full border p-2">
          <option value="admin">Admin</option>
          <option value="mesero">Mesero</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Crear Usuario
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
