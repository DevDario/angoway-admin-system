import EditDriverForm from "../src/forms/EditDriverForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import { ReactNode } from "react";
import "./CreateDriverDialog.css";

export default function EditDriverDialog({
  children,
  driverData,
}: {
  children: ReactNode;
  driverData: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[443px]"
        style={{ backgroundColor: "#121212", padding: 20 }}
      >
        <DialogHeader>
          <DialogTitle>Editar Motorista</DialogTitle>
        </DialogHeader>
        <EditDriverForm driverData={driverData} />
      </DialogContent>
    </Dialog>
  );
}
