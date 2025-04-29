import React from "react";
import DashboardDataCard from "../../components/DashboardDataCard";
import Layout from "../_layout";
import "./DashboardPage.css";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container">
          <DashboardDataCard label="Autocarros Ativos" value={34} />
          <DashboardDataCard label="Autocarros Inativos" value={5} />
          <DashboardDataCard label="Motoristas Cadastrados" value={42} />
          <DashboardDataCard label="..." value={10} />
          <DashboardDataCard label="..." value={10} />
        </div>
      </div>
    </Layout>
  );
}
