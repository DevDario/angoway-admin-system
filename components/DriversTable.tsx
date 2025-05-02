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
import "./DriversTable.css";

const mockEmployees = [
  {
    nome: "Jhon Doe",
    dataNasc: "01/12/2006",
    dataEfectivacao: "1/01/2025",
    NIA:"#123",
    estado: "Em Serviço",
  },
  {
    nome: "Marie Jane",
    dataNasc: "01/12/2006",
    dataEfectivacao: "02/01/2025",
    NIA:"#111",
    estado: "Fora de Serviço",
  },
  {
    nome: "John Dan",
    dataNasc: "01/12/2006",
    dataEfectivacao: "03/01/2025",
    NIA:"#222",
    estado: "Em Serviço",
  },
  {
    nome: "Marie Jany",
    dataNasc: "01/12/2006",
    dataEfectivacao: "04/02/2025",
    NIA:"#673",
    estado: "Em Serviço",
  },
  {
    nome: "Chris Evans",
    dataNasc: "01/12/2006",
    dataEfectivacao: "12/04/2025",
    NIA:"#487",
    estado: "Fora de Serviço",
  },
  {
    nome: "Peter Parker",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    NIA:"#444",
    estado: "Em Serviço",
  },
  {
    nome: "Anne An",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    NIA:"#555",
    estado: "Em Serviço",
  },
  {
    nome: "Alfred Perry",
    dataNasc: "01/12/2006",
    dataEfectivacao: "25/08/2025",
    NIA:"#134",
    estado: "Em Serviço",
  },
];

export default function DriversTable() {
  return (
    <Table className="drivers-table">
      <TableCaption>Motoristas na Empresa.</TableCaption>
      <TableHeader className="drivers-table-header">
        <TableRow className="drivers-table-row">
          <TableHead className="w-[100px] drivers-table-head">Nome</TableHead>
          <TableHead className="drivers-table-head">
            Data de Nascimento
          </TableHead>
          <TableHead className="drivers-table-head">
            Data de Efectivação
          </TableHead>
          <TableHead className="drivers-table-head">NIA</TableHead>
          <TableHead className="text-right drivers-table-head">
            Estado
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="drivers-table-body">
        {mockEmployees.map((e) => (
          <TableRow>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {e.nome}
            </TableCell>
            <TableCell className="drivers-table-cell">{e.dataNasc}</TableCell>
            <TableCell className="drivers-table-cell">
              {e.dataEfectivacao}
            </TableCell>
            <TableCell className="drivers-table-cell">
              {e.NIA}
            </TableCell>
            <TableCell className="text-right drivers-table-cell font-bold">
              {e.estado}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
