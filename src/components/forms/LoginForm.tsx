import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogin } from "../../services/authService";
import { useAuthStore } from "../../stores/auth/useAuthStore";

const schema = z.object({
  username: z.string().min(1, "Usuario requerido"),
  password: z.string().min(1, "Contraseña requerida"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { setUser } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await onLogin(data.username, data.password);
      setUser(res.token);

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Usuario o contraseña incorrectos");
      console.error("error al autenticarse:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto mt-8 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Iniciar Sesión</h2>

        <div>
          <label>Usuario</label>
          <input
            {...register("username")}
            className="w-full p-2 border"
            placeholder="admin"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border"
            placeholder="123"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Ingresar
          </button>
        </div>

        {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}
