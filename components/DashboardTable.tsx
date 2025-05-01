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
import "./DashboardTable.css";

const mockEmployees = [
  {
    nome: "Dario",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    estado: "Em Serviço",
  },
  {
    nome: "Dario",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    estado: "Em Serviço",
  },
  {
    nome: "Dario",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    estado: "Em Serviço",
  },
  {
    nome: "Dario",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    estado: "Em Serviço",
  },
  {
    nome: "Dario",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    estado: "Em Serviço",
  },
  {
    nome: "Dario",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    estado: "Em Serviço",
  },
  {
    nome: "Dario",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    estado: "Em Serviço",
  },
  {
    nome: "Dario",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    estado: "Em Serviço",
  },
];

export default function DashboardTable() {
  return (
    <Table className="employees-table">
      <TableCaption>Lista de Motoristas Recém Contratados.</TableCaption>
      <TableHeader className="employees-table-header">
        <TableRow className="employees-table-row">
          <TableHead className="w-[100px] employees-table-head">Nome</TableHead>
          <TableHead className="employees-table-head">Data de Nascimento</TableHead>
          <TableHead className="employees-table-head">
            Data de Efectivação
          </TableHead>
          <TableHead className="text-right employees-table-head">
            Estado
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="employees-table-body">
        {mockEmployees.map((e) => (
          <TableRow>
            <TableCell className="font-medium p-30 employees-table-cell">
              {e.nome}
            </TableCell>
            <TableCell className="employees-table-cell">{e.dataNasc}</TableCell>
            <TableCell className="employees-table-cell">
              {e.dataEfectivacao}
            </TableCell>
            <TableCell className="text-right employees-table-cell font-bold">
              {e.estado}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
