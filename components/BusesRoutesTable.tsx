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
import "./BusesRoutesTable.css";
import { useGetBusesWithAssignedRoutes } from "../hooks/bus/useBusQuerys";

export default function BusesRoutesTable() {
  const { data: fetchedBuses } = useGetBusesWithAssignedRoutes();
  const buses = fetchedBuses ?? [];

  return (
    <Table className="buses-route-table">
      <TableCaption>Rotas atribuidas à cada autocarro.</TableCaption>
      <TableHeader className="buses-route-table-header">
        <TableRow className="buses-route-table-row">
          <TableHead className="w-[100px] buses-route-table-head">ID</TableHead>
          <TableHead className="w-[100px] buses-route-table-head">
            Rota
          </TableHead>
          <TableHead className="w-[100px] buses-route-table-head">
            NIA
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="buses-route-table-body">
        {buses.map((bus) => (
          <TableRow key={bus.id}>
            <TableCell className="font-medium p-30 buses-route-table-cell">
              {bus.id}
            </TableCell>
            <TableCell className="font-medium p-30 buses-route-table-cell">
              {bus.route.name}
            </TableCell>
            <TableCell className="font-medium p-30 buses-route-table-cell">
              {bus.nia}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
