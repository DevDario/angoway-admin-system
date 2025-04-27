const TOKEN_KEY: string = process.env.EXPO_PUBLIC_TOKEN_KEY || "access_token";

export function saveToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
  }
}
