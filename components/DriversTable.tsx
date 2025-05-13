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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserEdit } from "@fortawesome/free-solid-svg-icons";

const mockEmployees = [
  {
    id: 1,
    nome: "Jhon Doe",
    telefone: "+244 912 345 678",
    dataNasc: "01/12/2006",
    dataEfectivacao: "1/01/2025",
    exp: "5 Anos",
    NIA: "#123",
    estado: "Em Serviço",
  },
  {
    id: 2,
    nome: "Marie Jane",
    telefone: "+244 912 345 678",
    dataNasc: "01/12/2006",
    dataEfectivacao: "02/01/2025",
    exp: "4 Anos",
    NIA: "#111",
    estado: "Fora de Serviço",
  },
  {
    id: 3,
    nome: "John Dan",
    telefone: "+244 912 345 678",
    dataNasc: "01/12/2006",
    dataEfectivacao: "03/01/2025",
    exp: "3 Anos",
    NIA: "#222",
    estado: "Em Serviço",
  },
  {
    id: 4,
    nome: "Marie Jany",
    telefone: "+244 912 345 678",
    dataNasc: "01/12/2006",
    dataEfectivacao: "04/02/2025",
    exp: "6 Anos",
    NIA: "#673",
    estado: "Em Serviço",
  },
  {
    id: 5,
    nome: "Chris Evans",
    telefone: "+244 912 345 678",
    dataNasc: "01/12/2006",
    dataEfectivacao: "12/04/2025",
    exp: "1 Ano",
    NIA: "#487",
    estado: "Fora de Serviço",
  },
  {
    id: 6,
    nome: "Peter Parker",
    telefone: "+244 912 345 678",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    exp: "3 Anos",
    NIA: "#444",
    estado: "Em Serviço",
  },
  {
    id: 7,
    nome: "Anne An",
    telefone: "+244 912 345 678",
    dataNasc: "01/12/2006",
    dataEfectivacao: "23/02/2025",
    exp: "2 Anos",
    NIA: "#555",
    estado: "Em Serviço",
  },
  {
    id: 8,
    nome: "Alfred Perry",
    telefone: "+244 912 345 678",
    dataNasc: "01/12/2006",
    dataEfectivacao: "25/08/2025",
    exp: "3 Anos",
    NIA: "#134",
    estado: "Em Serviço",
  },
];

type DriversTableProps = {
  data?: typeof mockEmployees;
  onDelete: () => void;
  onEdit: () => void;
};

export default function DriversTable({ onDelete, onEdit }: DriversTableProps) {
  return (
    <Table className="drivers-table">
      <TableCaption>Motoristas na Empresa.</TableCaption>
      <TableHeader className="drivers-table-header">
        <TableRow className="drivers-table-row">
          <TableHead className="w-[100px] drivers-table-head">ID</TableHead>
          <TableHead className="w-[100px] drivers-table-head">Nome</TableHead>
          <TableHead className="w-[100px] drivers-table-head">
            Telefone
          </TableHead>
          <TableHead className="drivers-table-head">
            Data de Nascimento
          </TableHead>
          <TableHead className="drivers-table-head">Experiência</TableHead>
          <TableHead className="drivers-table-head">
            Data de Efectivação
          </TableHead>
          <TableHead className="drivers-table-head">NIA</TableHead>
          <TableHead className="text-right drivers-table-head">
            Estado
          </TableHead>
          <TableHead className="text-right drivers-table-head">
            Acções
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="drivers-table-body">
        {mockEmployees.map((e) => (
          <TableRow key={e.id}>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {e.id}
            </TableCell>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {e.nome}
            </TableCell>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {e.telefone}
            </TableCell>
            <TableCell className="drivers-table-cell">{e.dataNasc}</TableCell>
            <TableCell className="drivers-table-cell">{e.exp}</TableCell>
            <TableCell className="drivers-table-cell">
              {e.dataEfectivacao}
            </TableCell>
            <TableCell className="drivers-table-cell">{e.NIA}</TableCell>
            <TableCell className="text-right drivers-table-cell font-bold">
              {e.estado}
            </TableCell>
            <TableCell className="text-right drivers-table-cell">
              <button
                className="action-button"
                style={{ marginRight: 20, cursor: "pointer" }}
                onClick={() => onDelete()}
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
                onClick={() => onEdit()}
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
