import React from "react";
import Layout from "../_layout";
import DashboardDataCard from "../../components/DashboardDataCard";
import {
  faUser,
  faClock,
  faCheckCircle,
  faClose,
  faPlusCircle,
  faTrashCan,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import DriversTable from "../../components/DriversTable";
import SectionHeader from "../../components/SectionHeader";
import "./DriversPage.css";
import Button from "../../components/Button";

export default function DriversPage() {
  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container">
          <DashboardDataCard
            label="Motoristas Cadastrados"
            value={20}
            icon={faCheckCircle}
          />
          <DashboardDataCard
            label="Motoristas Pendentes"
            value={5}
            icon={faClock}
          />
          <DashboardDataCard
            label="Motoristas Ativos"
            value={10}
            icon={faUser}
          />
          <DashboardDataCard
            label="Motoristas Inativos"
            value={10}
            icon={faClose}
          />
        </div>
        <div className="employees-table-container">
          <div className="employees-table-action-buttons-container">
            <SectionHeader icon={faUser} title="Motoristas" />
            <div className="action-buttons">
              <Button
                text="Criar"
                onClick={() => {}}
                icon={faPlusCircle}
                iconColor="#FFF"
                title="cadastrar novo motorista"
              />
              <Button
                text="Apagar"
                onClick={() => {}}
                icon={faTrashCan}
                iconColor="#FFF"
                title="apagar motorista"
              />
              <Button
                text="Editar"
                onClick={() => {}}
                icon={faUserEdit}
                iconColor="#FFF"
                title="editar"
              />
            </div>
          </div>
          <div className="employees-table-box">
            <DriversTable />
          </div>
        </div>
      </div>
    </Layout>
  );
}
