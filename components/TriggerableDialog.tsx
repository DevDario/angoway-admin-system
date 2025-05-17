import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import React, { ReactNode } from "react";
import "./TriggerableDialog.css";

export default function TriggerableDialog({
  children,
  form,
  title,
}: {
  children?: ReactNode;
  form?: ReactNode;
  title: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[443px]"
        style={{ backgroundColor: "#121212", padding: 20 }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
}
