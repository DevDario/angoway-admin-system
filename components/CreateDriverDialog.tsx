import CreateDriverForm from "@/forms/CreateDriverForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import { ReactNode } from "react";
import "./CreateDriverDialog.css";

export default function CreateDriverDialog({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[443px]" style={{backgroundColor:"#121212", padding: 20}}>
        <DialogHeader>
          <DialogTitle>Criar Motorista</DialogTitle>
        </DialogHeader>
        <CreateDriverForm />
      </DialogContent>
    </Dialog>
  );
}
