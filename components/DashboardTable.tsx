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
import "./DashboardTable.css";
import { useGetRecentDrivers } from "../hooks/driver/useDriverQuerys";
import { DriverResponse } from "../types/driver.response";
import { toast } from "sonner";

export default function DashboardTable() {
  const { data: fetchedDrivers, error } = useGetRecentDrivers();
  const [drivers, setDrivers] = useState<DriverResponse[] | []>([]);

  useEffect(() => {
    if (fetchedDrivers !== undefined) setDrivers(fetchedDrivers);
  }, [fetchedDrivers]);

  if (error) {
    toast.error("Erro ao carregar motoristas recentes", {
      description: error.message.includes("500")
        ? "Erro no Servidor. Recarregue a página"
        : "Tente mais tarde",
    });
  }
  return (
    <Table className="employees-table">
      <TableCaption>
        {drivers.length > 0
          ? "Lista de Motoristas Recém Contratados."
          : "Sem motoristas recentes"}
      </TableCaption>
      <TableHeader className="employees-table-header">
        <TableRow className="employees-table-row">
          <TableHead className="w-[100px] employees-table-head">Nome</TableHead>
          <TableHead className="employees-table-head">Telefone</TableHead>
          <TableHead className="employees-table-head">Experiência</TableHead>
          <TableHead className="employees-table-head">
            Carta de Condução
          </TableHead>
          <TableHead className="employees-table-head">NIA</TableHead>
          <TableHead className="text-right employees-table-head">
            Estado
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="employees-table-body">
        {drivers.map((driver: DriverResponse) => (
          <TableRow>
            <TableCell className="font-medium p-30 employees-table-cell">
              {driver.name}
            </TableCell>
            <TableCell className="employees-table-cell">
              {driver.phone}
            </TableCell>
            <TableCell className="employees-table-cell">
              {driver.experienceTime > 1 ?  driver.experienceTime + " Anos" : driver.experienceTime + " Ano"}
            </TableCell>
            <TableCell className="employees-table-cell font-bold">
              {driver.licenseNumber}
            </TableCell>
            <TableCell className="employees-table-cell font-bold">
              {driver.busNia}
            </TableCell>
            <TableCell className="text-right employees-table-cell font-bold">
              {driver.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
