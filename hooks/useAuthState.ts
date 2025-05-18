import { useEffect, useState } from "react";
import { getToken } from "../utils/secure-store";

export function useAuthState() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    function checkToken() {
      const token: string | null | undefined = getToken();
      setAuthToken(token || null);
      setIsCheckingAuth(false);
    }
    checkToken();
  }, []);

  return {
    authToken,
    isCheckingAuth,
  };
}
