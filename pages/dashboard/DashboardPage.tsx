import React from "react";
import DashboardDataCard from "../../components/DashboardDataCard";
import Layout from "../_layout";
import "./DashboardPage.css";
import Chart from "../../components/Chart";
import Button from "../../components/Button";
import {
  faChevronDown,
  faBusSimple,
  faFileExport,
  faClose,
  faUser,
  faQuestionCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionHeader from "../../components/SectionHeader";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container">
          <DashboardDataCard
            label="Autocarros Ativos"
            value={34}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Autocarros Inativos"
            value={5}
            icon={faClose}
          />
          <DashboardDataCard
            label="Motoristas Cadastrados"
            value={42}
            icon={faUser}
          />
          <DashboardDataCard label="..." value={10} icon={faQuestionCircle} />
          <DashboardDataCard label="..." value={10} icon={faQuestionCircle} />
        </div>
        <div className="chart-container">
          <div className="chart-action-buttons-container">
            <Button
              text="Mensal"
              onClick={() => {}}
              icon={faChevronDown}
              iconColor="#FFF"
            />
            <Button
              text="Exportar"
              onClick={() => {}}
              icon={faFileExport}
              iconColor="#FFF"
            />
          </div>
          <div className="chart-box">
            <h2 className="chart-title">Viagens realizadas</h2>
            <Chart />
          </div>
        </div>
        <div className="employees-table-container">
          <SectionHeader icon={faClock} title="Motoristas Recentes" />
          <div className="employees-table-box"></div>
        </div>
      </div>
    </Layout>
  );
}
