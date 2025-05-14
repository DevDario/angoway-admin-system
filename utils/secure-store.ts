import { AlertNotification } from "../types/alert.notification";

const TOKEN_KEY: string =
  import.meta.env.VITE_EXPO_PUBLIC_TOKEN_KEY || "access_token";

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

export function saveAlert(alert: AlertNotification) {
  try {
    const alerts: AlertNotification[] = JSON.parse(
      localStorage.getItem("alerts") || "[]"
    );
    const index = alerts.findIndex((a) => a.driverId === alert.driverId);
    if (index !== -1) {
      alerts[index] = alert;
    } else {
      alerts.push(alert);
    }
    localStorage.setItem("alerts", JSON.stringify(alerts));
  } catch (error) {
    console.error("Error saving alert:", error);
  }
}

export function getAlerts() {
  try {
    return JSON.parse(localStorage.getItem("alerts") || "[]");
  } catch (error) {
    console.error("Error getting alerts:", error);
    return [];
  }
}

export function removeAlerts() {
  try {
    localStorage.removeItem("alerts");
  } catch (error) {
    console.error("Error removing alerts:", error);
  }
}

export function clearAll() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }
}
