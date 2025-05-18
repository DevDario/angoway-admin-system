import React, { useEffect, useState } from "react";
import Layout from "../_layout";
import DashboardDataCard from "../../components/DashboardDataCard";
import { faPlusCircle, faBusSimple } from "@fortawesome/free-solid-svg-icons";
import BusesRoutesTable from "../../components/BusesRoutesTable";
import BusesTable from "../../components/BusesTable";
import SectionHeader from "../../components/SectionHeader";
import "./BusesPage.css";
import Button from "../../components/Button";
import CreateBusForm from "../../src/forms/CreateBusForm";
import CreateBusDialog from "../../components/CreateBusDialog";
import { useDeleteBus, useUpdateBus } from "../../hooks/bus/useBusMutations";
import {
  useGetBuses,
  useGetActiveBusesCount,
  useGetInactiveBusesCount,
  useGetPendingBusesCount,
} from "../../hooks/bus/useBusQuerys";

export default function BusesPage() {
  const { data: buses } = useGetBuses();
  const { data: activeBuses } = useGetActiveBusesCount();
  const { data: inactiveBuses } = useGetInactiveBusesCount();
  const { data: pendingBuses } = useGetPendingBusesCount();

  const busesCount = buses?.length ?? 0;
  const activeBusesCount = activeBuses?.count ?? 0;
  const inactiveBusesCount = inactiveBuses?.count ?? 0;
  const pendingBusesCount = pendingBuses?.count ?? 0;

  const {
    mutate: deleteBus,
    successMessage: deleteSuccess,
    errorMessage: deleteError,
  } = useDeleteBus();

  async function handleDelete(id: number) {
    deleteBus(id);
  }

  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container">
          <DashboardDataCard
            label="Autocarros Na Frota"
            value={busesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Autocarros Ativos"
            value={activeBusesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Autocarros Inativos"
            value={inactiveBusesCount + ""}
            icon={faBusSimple}
          />
          <DashboardDataCard
            label="Autocarros Pendentes"
            value={pendingBusesCount + ""}
            icon={faBusSimple}
          />
        </div>
        <div className="buses-table-container">
          <div className="buses-table-action-buttons-container">
            <SectionHeader icon={faBusSimple} title="Autocarros" />
            <div className="action-buttons">
              <CreateBusDialog>
                <Button
                  text="Criar"
                  icon={faPlusCircle}
                  iconColor="#FFF"
                  onClick={() => {}}
                  title="cadastrar novo autocarro"
                />
              </CreateBusDialog>
            </div>
          </div>
          <div className="buses-table-box">
            <BusesTable
              onDelete={(id: number) => handleDelete(id)}
              onEdit={() => {}}
            />
          </div>
        </div>
        <div className="actions-area-container">
          <div className="bus-routes-table-container">
            <SectionHeader icon={faBusSimple} title="Rotas Atribuidas" />
            <div className="bus-routes-table-box">
              <BusesRoutesTable />
            </div>
          </div>
          <div className="register-bus-form-container">
            <SectionHeader
              icon={faPlusCircle}
              title="Registrar novo Autocarro"
            />
            <div className="register-bus-form-box">
              <div className="register-bus-form">
                <CreateBusForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
