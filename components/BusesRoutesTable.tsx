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

const mockBusesRoutes = [
  {
    id: 1,
    rota: "Benfica-Ramiros",
    NIA: "#123",
  },
  {
    id: 2,
    rota: "Benfica-Gamek",
    NIA: "#111",
  },
  {
    id: 3,
    rota: "Kilamba-Gamek",
    NIA: "#222",
  },
  {
    id: 4,
    rota: "1 de Maio-Benfica",
    NIA: "#673",
  },
  {
    id: 5,
    rota: "Benfica-Gamek",
    NIA: "#487",
  },
  {
    id: 6,
    rota: "Zango-Talatona",
    NIA: "#444",
  },
  {
    id: 7,
    rota: "Patriota-Gamek",
    NIA: "#555",
  },
  {
    id: 8,
    rota: "Benfica-Gamek",
    NIA: "#134",
  },
];

export default function BusesRoutesTable() {
  return (
    <Table className="buses-route-table">
      <TableCaption>Rotas atribuidas à cada autocarro.</TableCaption>
      <TableHeader className="buses-route-table-header">
        <TableRow className="buses-route-table-row">
          <TableHead className="w-[100px] buses-route-table-head">
            ID
          </TableHead>
          <TableHead className="w-[100px] buses-route-table-head">
            Rota
          </TableHead>
          <TableHead className="w-[100px] buses-route-table-head">
            NIA
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="buses-route-table-body">
        {mockBusesRoutes.map((e) => (
          <TableRow key={e.id}>
            <TableCell className="font-medium p-30 buses-route-table-cell">
              {e.id}
            </TableCell>
            <TableCell className="font-medium p-30 buses-route-table-cell">
              {e.rota}
            </TableCell>
            <TableCell className="font-medium p-30 buses-route-table-cell">
              {e.NIA}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
