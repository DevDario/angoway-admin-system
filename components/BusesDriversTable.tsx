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
import "./BusesDriversTable.css";
import { useDriver } from "../hooks/useDriver";

export default function BusesDriversTable() {
  const { useGetDriversWithAssignedBus } = useDriver();
  const { data } = useGetDriversWithAssignedBus;
  const drivers = data ?? [];

  return (
    <Table className="buses-drivers-table">
      <TableCaption>Autocarros Dirigidos por cada motorista.</TableCaption>
      <TableHeader className="buses-drivers-table-header">
        <TableRow className="buses-drivers-table-row">
          <TableHead className="w-[100px] buses-drivers-table-head">
            ID
          </TableHead>
          <TableHead className="w-[100px] buses-drivers-table-head">
            Nome
          </TableHead>
          <TableHead className="w-[100px] buses-drivers-table-head">
            Rota
          </TableHead>
          <TableHead className="buses-drivers-table-head">Turno</TableHead>
          <TableHead className="buses-drivers-table-head">Horário</TableHead>
          <TableHead className="buses-drivers-table-head">NIA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="buses-drivers-table-body">
        {drivers.map((driver) => (
          <TableRow key={driver.id}>
            <TableCell className="font-medium p-30 buses-drivers-table-cell">
              {driver.id}
            </TableCell>
            <TableCell className="font-medium p-30 buses-drivers-table-cell">
              {driver.name}
            </TableCell>
            <TableCell className="font-medium p-30 buses-drivers-table-cell">
              {driver.route}
            </TableCell>
            <TableCell className="buses-drivers-table-cell">
              {driver.shift}
            </TableCell>
            <TableCell className="buses-drivers-table-cell">
              {driver.schedule}
            </TableCell>
            <TableCell className="buses-drivers-table-cell font-medium">
              {driver.NIA}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
