import EditBusForm from "../src/forms/EditBusForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import { ReactNode } from "react";
import "./CreateBusDialog.css";

export default function EditBusDialog({
  children,
  busData,
}: {
  children: ReactNode;
  busData: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[443px]"
        style={{ backgroundColor: "#121212", padding: 20 }}
      >
        <DialogHeader>
          <DialogTitle>Editar Autocarro</DialogTitle>
        </DialogHeader>
        <EditBusForm busData={busData} />
      </DialogContent>
    </Dialog>
  );
}
