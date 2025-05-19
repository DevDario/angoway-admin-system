import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/components/ui/table";
import "./DriversTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useGetDrivers } from "../hooks/driver/useDriverQuerys";
import { DriverResponse } from "../types/driver.response";
import ElementsListingDialog from "./ElementsListingDialog";
import { CirclePlusIcon } from "lucide-react";
import { toast } from "sonner";
import { useGetPendingBusesCount } from "../hooks/bus/useBusQuerys";
import { BusResponse } from "types/bus.response";
import { useAssignBusToDriver } from "../hooks/driver/useDriverMutations";

type DriversTableProps = {
  onDelete: (id: number) => void;
};

export default function DriversTable({ onDelete }: DriversTableProps) {
  const { data: fetchedDrivers } = useGetDrivers();
  const { data: fetchedBuses } = useGetPendingBusesCount();
  const { mutateAsync: assign } = useAssignBusToDriver();

  const [drivers, setDrivers] = useState<DriverResponse[] | []>([]);
  const [busesNia, setBusesNia] = useState<{ prop: string }[]>([]);

  useEffect(() => {
    if (fetchedDrivers !== undefined) setDrivers(fetchedDrivers);

    if (fetchedBuses?.buses !== undefined) {
      const niaList = Array.isArray(fetchedBuses.buses)
        ? fetchedBuses.buses
            .filter((bus: BusResponse) => typeof bus.nia === "string")
            .map((bus: BusResponse) => ({ prop: bus.nia }))
        : [];
      setBusesNia(niaList);
    }
  }, [fetchedDrivers, fetchedBuses]);

  async function handleAssignBusToDriver(driverId: number, busNia: string) {
    await assign({
      id: driverId,
      busNia: busNia,
    }).then((res) => {
      if (res.code === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <Table className="drivers-table">
      <TableCaption>Motoristas na Empresa.</TableCaption>
      <TableHeader className="drivers-table-header">
        <TableRow className="drivers-table-row">
          <TableHead className="w-[100px] drivers-table-head">ID</TableHead>
          <TableHead className="w-[100px] drivers-table-head">Nome</TableHead>
          <TableHead className="w-[100px] drivers-table-head">
            Telefone
          </TableHead>
          <TableHead className="drivers-table-head">Experiência</TableHead>
          <TableHead className="drivers-table-head">
            Data de Efectivação
          </TableHead>
          <TableHead className="drivers-table-head">NIA</TableHead>
          <TableHead className="text-right drivers-table-head">
            Estado
          </TableHead>
          <TableHead className="text-right drivers-table-head">
            Acções
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="drivers-table-body">
        {drivers.map((driver, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {driver.id}
            </TableCell>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {driver.name}
            </TableCell>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {driver.phone}
            </TableCell>
            <TableCell className="drivers-table-cell">
              {driver.experienceTime + " Anos"}
            </TableCell>
            <TableCell className="drivers-table-cell">
              {driver.efectivationDate + ""}
            </TableCell>
            <TableCell className="drivers-table-cell">
              {driver.busNia === "N/A" ? (
                <ElementsListingDialog
                  dialogLabel="Autocarros Disponíveis"
                  dialogTitle="Atribuir Autocarro"
                  emptyStateText="Não existem autocarros disponíveis"
                  buttonText="Salvar"
                  action={(selected) =>
                    handleAssignBusToDriver(driver.id, selected?.prop || "")
                  }
                  data={busesNia}
                >
                  <button
                    className="action-button"
                    style={{
                      display: "flex",
                      gap: "5px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <CirclePlusIcon color="#0C6BFF" size={18} />
                    Atribuir Autocarro
                  </button>
                </ElementsListingDialog>
              ) : (
                driver.busNia
              )}
            </TableCell>
            <TableCell className="text-right drivers-table-cell font-bold">
              {driver.status}
            </TableCell>
            <TableCell className="text-right drivers-table-cell">
              <button
                className="action-button"
                style={{ marginRight: 20, cursor: "pointer" }}
                onClick={() => onDelete(driver.id)}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  width={18}
                  height={18}
                  color="#FCFCFB"
                />
              </button>
              <button className="action-button" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon
                  icon={faUserEdit}
                  width={18}
                  height={18}
                  color="#0C6BFF"
                />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
