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
import { useDeleteDriver } from "../../hooks/driver/useDriverMutations";
import {
  useGetDriversCount,
  useGetPendingDriversCount,
  useGetActiveDriversCount,
  useGetInactiveDriversCount,
} from "../../hooks/driver/useDriverQuerys";

export default function DriversPage() {
  const { mutate: deleteDriver } = useDeleteDriver();

  const { data: driversCount } = useGetDriversCount();
  const { data: pendingDriversCount } = useGetPendingDriversCount();
  const { data: activeDriversCount } = useGetActiveDriversCount();

  const { data: inactiveDriversCount } = useGetInactiveDriversCount();

  const drivers = driversCount?.count || 0;
  const pendingDrivers = pendingDriversCount?.count || 0;
  const activeDrivers = activeDriversCount?.count || 0;
  const inactiveDrivers = inactiveDriversCount?.count || 0;

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
            value={drivers +""}
            icon={faCheckCircle}
          />
          <DashboardDataCard
            label="Motoristas Pendentes"
            value={pendingDrivers +""}
            icon={faClock}
          />
          <DashboardDataCard
            label="Motoristas Ativos"
            value={activeDrivers +""}
            icon={faUser}
          />
          <DashboardDataCard
            label="Motoristas Inativos"
            value={inactiveDrivers +""}
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
