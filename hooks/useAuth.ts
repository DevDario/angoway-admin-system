import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUseCase } from "../api/usecases/login.usecase";
import { useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "../utils/secure-store";

export function useAuth() {
  const queryClient = useQueryClient();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    function checkToken() {
      const token: string | null | undefined = getToken();
      setAuthToken(token || null);
      setIsCheckingAuth(false);
    }
    checkToken();
  }, []);

  const useLogin = useMutation({
    mutationFn: loginUseCase,
    onMutate: () => {
      setIsCheckingAuth(true);
      setAuthError(null);
    },
    onSuccess: async (res:any) => {
      saveToken(res.data.access_token);
      setAuthToken(res.data.access_token);
      queryClient.invalidateQueries();
    },
    onError: (req:any) => {
      setAuthError(req.response.data.message);
    },
    onSettled: () => {
      setIsCheckingAuth(false);
    },
  });

  const logout = async () => {
    removeToken();
    queryClient.clear();
  };

  return {
    useLogin,
    logout,
    authToken,
    isCheckingAuth,
    authError,
  };
}
