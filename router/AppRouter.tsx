import { Navigate, Route, Routes } from "react-router";
import { useAuthState } from "../hooks/useAuthState";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import BusesPage from "../pages/bus/BusesPage";
import DriversPage from "../pages/driver/DriversPage";
import AlertsPage from "../pages/alerts/AlertsPage";
import RoutesPage from "../pages/route/RoutesPage";
import SettingsPage from "../pages/settings/SettingsPage";
import MapPage from "../pages/map/MapPage";
import StopsPage from "../pages/stops/StopsPage";

export default function AppRouter() {
  const { authToken } = useAuthState();

  return (
    <Routes>
      {!authToken ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/buses" element={<BusesPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/stops" element={<StopsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}
