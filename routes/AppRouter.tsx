import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import BusesPage from "../pages/bus/BusesPage";
import React from "react";
import DriversPage from "../pages/driver/DriversPage";
import AlertsPage from "../pages/alerts/AlertsPage";
import RoutesPage from "../pages/route/RoutesPage";
import SettingsPage from "../pages/settings/SettingsPage";
import MapPage from "../pages/map/MapPage";

export default function AppRouter() {
  const { authToken } = useAuth();

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
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}
