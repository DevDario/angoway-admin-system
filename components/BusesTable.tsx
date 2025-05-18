import React from "react";
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
import { useGetBuses } from "../hooks/bus/useBusQuerys";
import { useState, useEffect } from "react";
import { BusResponse } from "../types/bus.response";

type BusesTableProps = {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function BusesTable({ onDelete, onEdit }: BusesTableProps) {
  const { data: fetchedBuses } = useGetBuses();
  const [buses, setBuses] = useState<BusResponse[] | []>([]);

  useEffect(() => {
    if (fetchedBuses !== undefined) setBuses(fetchedBuses);
  }, [fetchedBuses]);

  return (
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
          <TableHead className="buses-table-head text-right">Acções</TableHead>
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
            <TableCell className="buses-table-cell">{bus.capacity}</TableCell>
            <TableCell className="buses-table-cell">{bus.driverName}</TableCell>
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
              <button
                className="action-button"
                style={{ cursor: "pointer" }}
                onClick={() => onEdit(bus.id)}
              >
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
