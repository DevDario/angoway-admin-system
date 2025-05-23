import EditRouteForm from "../src/forms/EditRouteForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import React, { ReactNode } from "react";
import "./CreateBusDialog.css";

export default function EditRouteDialog({
  children,
  routeData,
}: {
  children: ReactNode;
  routeData: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[443px]"
        style={{ backgroundColor: "#121212", padding: 20 }}
      >
        <DialogHeader>
          <DialogTitle>Editar Rota</DialogTitle>
        </DialogHeader>
        <EditRouteForm routeData={routeData} />
      </DialogContent>
    </Dialog>
  );
}
