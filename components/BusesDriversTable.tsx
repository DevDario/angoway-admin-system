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

const mockEmployees = [
  {
    id: 1,
    nome: "Jhon Doe",
    NIA: "#123",
    rota: "Benfica-Ramiros",
    horario: "08H-18H",
    turno: "Diurno",
  },
  {
    id: 2,
    nome: "Marie Jane",
    rota: "Benfica-Gamek",
    horario: "08H-18H",
    turno: "Diurno",
    NIA: "#111",
  },
  {
    id: 3,
    nome: "John Dan",
    rota: "Kilamba-Gamek",
    horario: "08H-18H",
    turno: "Diurno",
    NIA: "#222",
  },
  {
    id: 4,
    nome: "Marie Jany",
    rota: "1 de Maio-Benfica",
    horario: "08H-18H",
    turno: "Diurno",
    NIA: "#673",
  },
  {
    id: 5,
    nome: "Chris Evans",
    rota: "Benfica-Gamek",
    horario: "18H-8H",
    turno: "Noturno",
    NIA: "#487",
  },
  {
    id: 6,
    nome: "Peter Parker",
    rota: "Zango-Talatona",
    horario: "08H-18H",
    turno: "Diurno",
    NIA: "#444",
  },
  {
    id: 7,
    nome: "Anne An",
    rota: "Patriota-Gamek",
    horario: "08H-18H",
    turno: "Diurno",
    NIA: "#555",
  },
  {
    id: 8,
    nome: "Alfred Perry",
    rota: "Benfica-Gamek",
    horario: "08H-18H",
    turno: "Diurno",
    NIA: "#134",
  },
];

export default function BusesDriversTable() {
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
        {mockEmployees.map((e) => (
          <TableRow key={e.id}>
            <TableCell className="font-medium p-30 buses-drivers-table-cell">
              {e.id}
            </TableCell>
            <TableCell className="font-medium p-30 buses-drivers-table-cell">
              {e.nome}
            </TableCell>
            <TableCell className="font-medium p-30 buses-drivers-table-cell">
              {e.rota}
            </TableCell>
            <TableCell className="buses-drivers-table-cell">
              {e.turno}
            </TableCell>
            <TableCell className="buses-drivers-table-cell">
              {e.horario}
            </TableCell>
            <TableCell className="buses-drivers-table-cell font-medium">{e.NIA}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
