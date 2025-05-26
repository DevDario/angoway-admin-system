import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login.schema";
import { useLogin } from "../../hooks/auth/useAuthMutations";
import AlertModal from "../../components/AlertModal";
import "./LoginPage.css";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { number: "", password: "" },
  });

  const { mutate: login, isPending, errorMessage } = useLogin();

  function handleLogin(data: any) {
    login(data);
  }

  return (
    <div className="login-container">
      <div className="login-form-section">
        <h1 className="login-title">Iniciar Sessão</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="login-form">
          <div className="form-group">
            <label htmlFor="number">Seu Número</label>
            <Controller
              control={control}
              name="number"
              render={({ field }) => (
                <input
                  type="text"
                  id="number"
                  placeholder="Digite o seu número"
                  {...field}
                  className={`form-input ${errors.number ? "input-error" : ""}`}
                />
              )}
            />
            {errors.number && (
              <span className="error-message">{errors.number.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
                  {...field}
                  className={`form-input ${
                    errors.password ? "input-error" : ""
                  }`}
                />
              )}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isPending}
          >
            {isPending ? "Entrando..." : "Entrar"}
          </button>
        </form>
        {errorMessage && <AlertModal text={errorMessage} type="error" />}
      </div>

      <div className="side-section">
        <div className="side-section-container">
          <div className="side-section-image-container">
            <img
              src="https://bufferwall.com/download/B20190923T000000374_1200x600.jpg"
              alt=""
              className="side-section-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
