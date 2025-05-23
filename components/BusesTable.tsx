import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/components/ui/table";
import "./BusesTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useGetPendingDriversCount } from "../hooks/driver/useDriverQuerys";
import { useState, useEffect } from "react";
import { BusResponse } from "../types/bus.response";
import { CirclePlusIcon } from "lucide-react";
import ElementsListingDialog from "./ElementsListingDialog";
import { useGetBuses } from "../hooks/bus/useBusQuerys";
import { DriverResponse } from "../types/driver.response";
import { useAssignDriver } from "../hooks/bus/useBusMutations";
import { toast } from "sonner";
import EditBusDialog from "./EditBusDialog";

type BusesTableProps = {
  onDelete: (id: number) => void;
};

export default function BusesTable({ onDelete }: BusesTableProps) {
  const { data: fetchedBuses } = useGetBuses();
  const { data: fetchedDrivers } = useGetPendingDriversCount();
  const { mutateAsync: assign } = useAssignDriver();
  const [buses, setBuses] = useState<BusResponse[] | []>([]);

  const [driversList, setDriversList] = useState<
    { prop: string; value?: string }[]
  >([]);
  const [editBus, setEditBus] = useState<BusResponse | null>(null);

  useEffect(() => {
    if (fetchedBuses !== undefined) setBuses(fetchedBuses);

    if (fetchedDrivers && Array.isArray(fetchedDrivers.drivers)) {
      const namesList = (fetchedDrivers.drivers as Partial<DriverResponse>[])
        .filter((driver) => typeof driver?.name === "string")
        .map((driver) => ({
          prop: driver.name as string,
          value: driver.email,
        }));
      setDriversList(namesList);
    } else {
      setDriversList([]);
    }
  }, [fetchedDrivers, fetchedBuses]);

  async function handleAssignDriver(busId: number, driverEmail: string) {
    await assign({
      busId: busId,
      email: driverEmail,
    }).then((res) => {
      if (res.code === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <>
      <div className="table-scroll-container">
        {editBus && (
          <EditBusDialog busData={editBus}>
            <div />
          </EditBusDialog>
        )}
        <Table className="buses-table">
          <TableCaption>Autocarros na Empresa.</TableCaption>
          <TableHeader className="buses-table-header">
            <TableRow className="buses-table-row">
              <TableHead className="w-[100px] buses-table-head">ID</TableHead>
              <TableHead className="w-[100px] buses-table-head">NIA</TableHead>
              <TableHead className="w-[100px] buses-table-head">
                Matricula
              </TableHead>
              <TableHead className="buses-table-head">Rota</TableHead>
              <TableHead className="buses-table-head">Capacidade</TableHead>
              <TableHead className="buses-table-head">Motorista</TableHead>
              <TableHead className="buses-table-head text-right">
                Acções
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="buses-table-body">
            {buses.map((bus: BusResponse) => (
              <TableRow key={bus.id}>
                <TableCell className="font-medium p-30 buses-table-cell">
                  {bus.id}
                </TableCell>
                <TableCell className="font-medium p-30 buses-table-cell">
                  {bus.nia}
                </TableCell>
                <TableCell className="font-medium p-30 buses-table-cell">
                  {bus.matricula}
                </TableCell>
                <TableCell className="buses-table-cell">{bus.route}</TableCell>
                <TableCell className="buses-table-cell">
                  {bus.capacity}
                </TableCell>
                <TableCell className="buses-table-cell">
                  {bus.driverName === "N/A" ? (
                    <ElementsListingDialog
                      dialogLabel="Motoristas Disponíveis"
                      dialogTitle="Atribuir Motorista"
                      emptyStateText="Nenhum motorista disponível."
                      buttonText="Salvar"
                      action={(selected) =>
                        handleAssignDriver(bus.id, selected?.value || "")
                      }
                      data={driversList}
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
                        Atribuir
                      </button>
                    </ElementsListingDialog>
                  ) : (
                    bus.driverName
                  )}
                </TableCell>
                <TableCell className="text-right buses-table-cell">
                  <button
                    className="action-button"
                    style={{ marginRight: 20, cursor: "pointer" }}
                    onClick={() => onDelete(bus.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      width={18}
                      height={18}
                      color="#FCFCFB"
                    />
                  </button>
                  <EditBusDialog busData={bus}>
                    <button
                      className="action-button"
                      style={{ cursor: "pointer" }}
                      onClick={() => setEditBus(bus)}
                    >
                      <FontAwesomeIcon
                        icon={faUserEdit}
                        width={18}
                        height={18}
                        color="#0C6BFF"
                      />
                    </button>
                  </EditBusDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
