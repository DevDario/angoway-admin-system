import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login.schema";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./LoginPage.css";
import { z } from "zod";
import AlertModal from "../../components/AlertModal";
import ActivityIndicator from "../../components/ActivityIndicator"

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      number: "",
      password: "",
    },
  });
  const { useLogin, isCheckingAuth, authError } = useAuth();

  const handleLogin = (data: LoginFormData) => {
    useLogin.mutate(data);
  };

  return (
    <div className="login-container">
      <div className="content">
        <div className="input-container">
          <div className="input-field">
            <label className="input-label">Seu Número</label>
            <Input
              name="number"
              control={control}
              placeholder="Digite o seu número"
              error={errors.number?.message}
              type="tel"
            />
          </div>

          <div className="input-field">
            <label className="input-label">Senha</label>
            <Input
              name="password"
              control={control}
              placeholder="Digite sua senha"
              error={errors.password?.message}
              type="password"
            />
          </div>
        </div>

        <div className="button-container">
          <Button
            text={isCheckingAuth ? "Entrando..." : "Entrar"}
            onClick={handleSubmit(handleLogin)}
            disabled={isCheckingAuth}
          />
        </div>

        {authError && (
          <div className="alert-container">
            <AlertModal text={authError} type="error" />
          </div>
        )}

        {isCheckingAuth && (
          <ActivityIndicator />
        )}
      </div>
    </div>
  );
}
