import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import React from "react";

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
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}
