import React from "react";
import DashboardDataCard from "../../components/DashboardDataCard";
import Layout from "../_layout";
import "./DashboardPage.css";
import CustomBarChart from "../../components/BarChart";
import CustomLineChart from "../../components/LineChart";
import Button from "../../components/Button";
import {
  faBusSimple,
  faClose,
  faUser,
  faQuestionCircle,
  faClock,
  faMoneyBills,
  faDownload,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionHeader from "../../components/SectionHeader";
import DashboardTable from "../../components/DashboardTable";
import { useNavigate } from "react-router";
import { useAlertsChannel } from "../../hooks/useAlertsChannel";
import { toast } from "sonner";

export default function DashboardPage() {
  const { recentAlert } = useAlertsChannel();
  const navigator = useNavigate();

  function handleDelete() {}

  function handleEdit() {}

  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container">
            <DashboardDataCard
              label="Autocarros"
              value={34}
              icon={faBusSimple}
            />
            <DashboardDataCard label="Motoristas" value={5} icon={faUser} />
            <DashboardDataCard
              label="Autocarros Ativos"
              value={42}
              icon={faBusSimple}
            />
            <DashboardDataCard
              label="Autocarros Pendentes"
              value={10}
              icon={faBusSimple}
            />
            <DashboardDataCard
              label="Motoristas Pendentes"
              value={10}
              icon={faClock}
            />
            <DashboardDataCard
              label="Autocarros Inativos"
              value={10}
              icon={faClock}
            />
        </div>
        <div className="chart-container">
          <div className="chart-action-buttons-container">
            <Button
              text="Baixar"
              onClick={() => {}}
              icon={faDownload}
              iconColor="#FFF"
              title="exportar dados"
            />
          </div>
          <div className="chart-box">
            <h2 className="chart-title">Viagens realizadas</h2>
            <CustomBarChart
              description="Janeiro - Dezembro 2025"
              footerText="Mostrando o total de viagens realizadas em cada mês."
            />
          </div>
        </div>
        <div className="employees-table-container">
          <SectionHeader icon={faClock} title="Motoristas Recentes" />
          <div className="employees-table-box">
            <DashboardTable
              onDelete={() => handleDelete}
              onEdit={() => handleEdit}
            />
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-action-buttons-container">
            <SectionHeader icon={faMoneyBills} title="Faturação (Diário)" />
            <Button
              text="Baixar"
              onClick={() => {}}
              icon={faDownload}
              iconColor="#FFF"
              title="exportar dados"
            />
          </div>
          <div className="chart-box" style={{ height: "450px" }}>
            <h2 className="chart-title">Faturação Total</h2>
            <CustomLineChart />
          </div>
        </div>
        {recentAlert &&
          toast(`${recentAlert?.message}`, {
            action: {
              label: "Ver",
              onClick: () => navigator("/alerts"),
            },
            icon: <FontAwesomeIcon icon={faWarning} />,
          })}
      </div>
    </Layout>
  );
}
