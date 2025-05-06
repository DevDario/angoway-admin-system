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

const mockBuses = [
  {
    id: 1,
    NIA: "#543",
    matricula: "LD-32-34-DF",
    rota: "Patriota-Benfica",
    capacidade: 40,
    motorista: "João Silva",
  },
  {
    id: 2,
    NIA: "#544",
    matricula: "LD-45-67-GH",
    rota: "Talatona-Cazenga",
    capacidade: 35,
    motorista: "Maria Oliveira",
  },
  {
    id: 3,
    NIA: "#545",
    matricula: "LD-78-90-IJ",
    rota: "Viana-Kilamba",
    capacidade: 50,
    motorista: "Carlos Santos",
  },
  {
    id: 4,
    NIA: "#546",
    matricula: "LD-12-34-KL",
    rota: "Benfica-Cidade Alta",
    capacidade: 45,
    motorista: "Ana Costa",
  },
  {
    id: 5,
    NIA: "#547",
    matricula: "LD-56-78-MN",
    rota: "Cacuaco-Mutamba",
    capacidade: 30,
    motorista: "Pedro Ferreira",
  },
  {
    id: 6,
    NIA: "#548",
    matricula: "LD-90-12-OP",
    rota: "Zango-Maianga",
    capacidade: 40,
    motorista: "Sofia Almeida",
  },
  {
    id: 7,
    NIA: "#549",
    matricula: "LD-34-56-QR",
    rota: "Kilamba-Cidade Alta",
    capacidade: 50,
    motorista: "Ricardo Lima",
  },
  {
    id: 8,
    NIA: "#550",
    matricula: "LD-78-90-ST",
    rota: "Talatona-Benfica",
    capacidade: 35,
    motorista: "Fernanda Rocha",
  },
];

export default function BusesTable() {
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
        </TableRow>
      </TableHeader>
      <TableBody className="buses-table-body">
        {mockBuses.map((e) => (
          <TableRow key={e.id}>
            <TableCell className="font-medium p-30 buses-table-cell">
              {e.id}
            </TableCell>
            <TableCell className="font-medium p-30 buses-table-cell">
              {e.NIA}
            </TableCell>
            <TableCell className="font-medium p-30 buses-table-cell">
              {e.matricula}
            </TableCell>
            <TableCell className="buses-table-cell">{e.rota}</TableCell>
            <TableCell className="buses-table-cell">{e.capacidade}</TableCell>
            <TableCell className="buses-table-cell">{e.motorista}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
