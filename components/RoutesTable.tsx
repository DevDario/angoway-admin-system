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
import "./RoutesTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useGetRoutes } from "../hooks/route/useRouteQuerys";
import { useState, useEffect } from "react";
import { RouteResponse } from "../types/route.response";
import EditRouteDialog from "./EditRouteDialog";

type RoutesTableProps = {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function RoutesTable({ onDelete, onEdit }: RoutesTableProps) {
  const { data: fetchedRoutes } = useGetRoutes();
  const [routes, setRoutes] = useState<RouteResponse[] | []>([]);

  useEffect(() => {
    if (fetchedRoutes !== undefined) setRoutes(fetchedRoutes);
  }, [fetchedRoutes]);

  return (
    <div className="table-scroll-container">
      <Table className="routes-table">
        <TableCaption>Rotas Cadastradas.</TableCaption>
        <TableHeader className="routes-table-header">
          <TableRow className="routes-table-row">
            <TableHead className="w-[100px] routes-table-head">ID</TableHead>
            <TableHead className="w-[100px] routes-table-head">nome</TableHead>
            <TableHead className="w-[100px] routes-table-head">
              Origem
            </TableHead>
            <TableHead className="routes-table-head">Destino</TableHead>
            <TableHead className="routes-table-head">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="routes-table-body">
          {routes.map((route: RouteResponse) => (
            <TableRow key={route.id}>
              <TableCell className="font-medium p-30 routes-table-cell">
                {route.id}
              </TableCell>
              <TableCell className="font-medium p-30 routes-table-cell">
                {route.name}
              </TableCell>
              <TableCell className="font-medium p-30 routes-table-cell">
                {route.origin}
              </TableCell>
              <TableCell className="routes-table-cell">
                {route.destination}
              </TableCell>
              <TableCell className="routes-table-cell">
                {route.status}
              </TableCell>
              <TableCell className="text-right routes-table-cell">
                <button
                  className="action-button"
                  style={{ marginRight: 20, cursor: "pointer" }}
                  onClick={() => onDelete(route.id)}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    width={18}
                    height={18}
                    color="#FCFCFB"
                  />
                </button>
                <EditRouteDialog routeData={route}>
                  <button
                    className="action-button"
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={faUserEdit}
                      width={18}
                      height={18}
                      color="#0C6BFF"
                    />
                  </button>
                </EditRouteDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
