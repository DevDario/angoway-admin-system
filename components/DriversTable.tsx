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
import "./DriversTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useDriver } from "../hooks/useDriver";
import { DriverResponse } from "types/driver.response";

type DriversTableProps = {
  onDelete: (id:number) => void;
  onEdit: (id:number) => void;
};

export default function DriversTable({ onDelete, onEdit }: DriversTableProps) {
  const { useGetDrivers} = useDriver()
  const { data } = useGetDrivers;
  const [drivers, setDrivers] = useState<DriverResponse[] | []>([]);

  useEffect(() => {
    if (data !== undefined) setDrivers(data);
  }, [data]);

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
        {drivers.map((driver, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {driver.id}
            </TableCell>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {driver.name}
            </TableCell>
            <TableCell className="font-medium p-30 drivers-table-cell">
              {driver.phone}
            </TableCell>
            <TableCell className="drivers-table-cell">
              {driver.experienceTime + " Anos"}
            </TableCell>
            <TableCell className="drivers-table-cell">
              {driver.efectivationDate + ""}
            </TableCell>
            <TableCell className="drivers-table-cell">{driver.NIA}</TableCell>
            <TableCell className="text-right drivers-table-cell font-bold">
              {driver.status}
            </TableCell>
            <TableCell className="text-right drivers-table-cell">
              <button
                className="action-button"
                style={{ marginRight: 20, cursor: "pointer" }}
                onClick={() => onDelete(driver.id)}
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
                onClick={() => onEdit(driver.id)}
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
