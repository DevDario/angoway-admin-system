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
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionHeader from "../../components/SectionHeader";
import DashboardTable from "../../components/DashboardTable";
import { useNavigate } from "react-router";
import { useAlertsChannel } from "../../hooks/useAlertsChannel";
import { toast } from "sonner";
import {
  useGetActiveBusesCount,
  useGetPendingBusesCount,
  useGetInactiveBusesCount,
  useGetBusesCount,
} from "../../hooks/bus/useBusQuerys";
import {
  useGetPendingDriversCount,
  useGetDriversCount,
} from "../../hooks/driver/useDriverQuerys";
import { useGetMonthlyTravelCount } from "../../hooks/travel/useTravelQuerys";
import { ChartConfig } from "../../src/components/ui/chart";
import { exportMonthlyTravelCount } from "../../api/usecases/travel.usecase";

export default function DashboardPage() {
  const { recentAlert } = useAlertsChannel();
  const navigator = useNavigate();

  const { data: monthlyTravelCount } = useGetMonthlyTravelCount();

  const { data: buses } = useGetBusesCount();
  const { data: activeBuses } = useGetActiveBusesCount();
  const { data: inactiveBuses } = useGetInactiveBusesCount();
  const { data: pendingBuses } = useGetPendingBusesCount();

  const { data: drivers } = useGetDriversCount();
  const { data: pendingDrivers } = useGetPendingDriversCount();

  const driversCount = drivers?.count ?? 0;
  const pendingDriversCount = pendingDrivers?.count ?? 0;

  const travelsData = Array.isArray(monthlyTravelCount)
    ? monthlyTravelCount
    : [];

  const busesCount = buses?.count ?? 0;
  const activeBusesCount = activeBuses?.count ?? 0;
  const inactiveBusesCount = inactiveBuses?.count ?? 0;
  const pendingBusesCount = pendingBuses?.count ?? 0;

  function handleDelete() {}

  function handleEdit() { }

  async function handleTravelsCountDownload(){
    const blob = await exportMonthlyTravelCount();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "monthly-travels.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };
  
  const travelsChartConfig = {
    travels: {
      label: "viagens",
    },
  } satisfies ChartConfig;

  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container">
          <DashboardDataCard
            label="Autocarros"
            value={busesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Motoristas"
            value={driversCount + ""}
            icon={faUserTie}
          />
          <DashboardDataCard
            label="Autocarros Ativos"
            value={activeBusesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Autocarros Pendentes"
            value={pendingBusesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Motoristas Pendentes"
            value={pendingDriversCount + ""}
            icon={faClock}
          />
          <DashboardDataCard
            label="Autocarros Inativos"
            value={inactiveBusesCount + ""}
            icon={faClock}
          />
        </div>
        <div className="chart-container">
          <div className="chart-action-buttons-container">
            <Button
              text="Baixar"
              onClick={() => handleTravelsCountDownload()}
              icon={faDownload}
              iconColor="#FFF"
              title="exportar dados"
            />
          </div>
          <div className="chart-box">
            <h2 className="chart-title">Viagens realizadas</h2>
            <CustomBarChart
              description={`Janeiro - Dezembro ${new Date().getFullYear()}`}
              footerText="Mostrando o total de viagens realizadas em cada mês."
              data={travelsData}
              config={travelsChartConfig}
              axisDataKey="month"
              barDataKey="travels"
            />
          </div>
        </div>
        <div className="employees-table-container">
          <SectionHeader icon={faClock} title="Motoristas Recentes" />
          <div className="employees-table-box">
            <DashboardTable />
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
