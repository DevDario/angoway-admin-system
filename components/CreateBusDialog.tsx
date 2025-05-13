import CreateBusForm from "../src/forms/CreateBusForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import React, { ReactNode } from "react";
import "./CreateBusDialog.css";

export default function CreateBusDialog({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[443px]" style={{backgroundColor:"#121212", padding: 20}}>
        <DialogHeader>
          <DialogTitle>Cadastrar Autocarro</DialogTitle>
        </DialogHeader>
        <CreateBusForm />
      </DialogContent>
    </Dialog>
  );
}
