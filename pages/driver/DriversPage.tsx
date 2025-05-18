import React from "react";
import Layout from "../_layout";
import DashboardDataCard from "../../components/DashboardDataCard";
import {
  faUser,
  faClock,
  faCheckCircle,
  faClose,
  faPlusCircle,
  faBusSimple,
} from "@fortawesome/free-solid-svg-icons";
import DriversTable from "../../components/DriversTable";
import BusesDriversTable from "../../components/BusesDriversTable";
import SectionHeader from "../../components/SectionHeader";
import "./DriversPage.css";
import Button from "../../components/Button";
import CreateDriverForm from "../../src/forms/CreateDriverForm";
import CreateDriverDialog from "../../components/CreateDriverDialog";
import {
  useDeleteDriver,
} from "../../hooks/driver/useDriverMutations";

export default function DriversPage() {
  const { mutate: deleteDriver } = useDeleteDriver();

  async function handleDelete(id: number) {
    deleteDriver(id);
  }

  function handleEdit(id: number) {}

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
              <CreateDriverDialog>
                <Button
                  text="Criar"
                  icon={faPlusCircle}
                  iconColor="#FFF"
                  onClick={() => {}}
                  title="cadastrar novo motorista"
                />
              </CreateDriverDialog>
            </div>
          </div>
          <div className="employees-table-box">
            <DriversTable
              onDelete={(id: number) => handleDelete(id)}
              onEdit={(id: number) => handleEdit(id)}
            />
          </div>
        </div>
        <div className="actions-area-container">
          <div className="bus-drivers-table-container">
            <SectionHeader icon={faBusSimple} title="Autocarros Dirigidos" />
            <div className="bus-drivers-table-box">
              <BusesDriversTable />
            </div>
          </div>
          <div className="register-driver-form-container">
            <SectionHeader
              icon={faPlusCircle}
              title="Registrar novo Motorista"
            />
            <div className="register-driver-form-box">
              <div className="register-driver-form">
                <CreateDriverForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
