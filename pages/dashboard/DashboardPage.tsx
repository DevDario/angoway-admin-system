import DashboardDataCard from "../../components/DashboardDataCard";
import Layout from "../_layout";
import "./DashboardPage.css";
import CustomBarChart from "../../components/BarChart";
import CustomLineChart from "../../components/LineChart";
import Button from "../../components/Button";
import {
  faBusSimple,
  faClock,
  faMoneyBills,
  faDownload,
  faWarning,
  faUserTie,
  faArrowAltCircleRight,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionHeader from "../../components/SectionHeader";
import DashboardTable from "../../components/DashboardTable";
import CustomRadialChart from "../../components/CustomRadialChart";
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
import { useGetMonthlyTravelCount, useGetWeeklyEarningsCount } from "../../hooks/travel/useTravelQuerys";
import { ChartConfig } from "../../src/components/ui/chart";
import { exportMonthlyTravelCount } from "../../api/usecases/travel.usecase";

export default function DashboardPage() {
  const { recentAlert } = useAlertsChannel();
  const navigator = useNavigate();

  const { data: monthlyTravelCount } = useGetMonthlyTravelCount();
  const { data: weeklyEarningsCount } = useGetWeeklyEarningsCount();

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

  const weeklyProfitData = Array.isArray(weeklyEarningsCount)
    ? weeklyEarningsCount
    : [];

  const busesCount = buses?.count ?? 0;
  const activeBusesCount = activeBuses?.count ?? 0;
  const inactiveBusesCount = inactiveBuses?.count ?? 0;
  const pendingBusesCount = pendingBuses?.count ?? 0;

  async function handleTravelsCountDownload() {
    const blob = await exportMonthlyTravelCount();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "monthly-travels.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  async function handleWeeklyEarningsReportDownload() {
  }

  const travelsChartConfig = {
    travels: {
      label: "viagens",
    },
  } satisfies ChartConfig;

  const profitChartConfig = {
    day: {
      label: "dia",
    },
    bill: {
      label: "faturado(Kz) ",
    },
  } satisfies ChartConfig;

  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container dashboard-data-summarization-container">
          <DashboardDataCard
            label="Cadastrados"
            value={busesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Cadastrados"
            value={driversCount + ""}
            icon={faUserTie}
          />
          <DashboardDataCard
            label="Ativos"
            value={activeBusesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Pendentes"
            value={pendingBusesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Pendentes"
            value={pendingDriversCount + ""}
            icon={faUserTie}
          />
          <DashboardDataCard
            label="Inativos"
            value={inactiveBusesCount + ""}
            icon={faBusSimple}
          />
        </div>
        <h1 className="main-title">
          <FontAwesomeIcon icon={faChevronCircleRight} width={20} height={20} color="#0C6BFF" style={{marginRight:"10px"}}/>
          Dashboard
        </h1>
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
          <div className="header-charts-container side-charts">
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
              onClick={() => handleWeeklyEarningsReportDownload()}
              icon={faDownload}
              iconColor="#FFF"
              title="exportar dados"
            />
          </div>
          <div className="chart-box" style={{ height: "450px" }}>
            <h2 className="chart-title">Faturação Total</h2>
            <CustomLineChart
              description="Total Faturado na Semana"
              footerText="Mostrando o total faturado nos últimos 7 dias."
              config={profitChartConfig}
              data={weeklyProfitData}
              axisDataKey="day"
              lineDataKey="bill"
            />
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
