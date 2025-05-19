import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import React, { ReactNode, useState } from "react";
import "./ElementsListingDialog.css";

import { Button } from "../src/components/ui/button";

export default function ElementsListingDialog({
  children,
  dialogTitle,
  dialogLabel,
  buttonText,
  action,
  data,
}: {
  children: ReactNode;
  dialogTitle: string;
  dialogLabel: string;
  buttonText: string;
  action: (value: string) => void;
  data: { prop: string }[];
}) {
  function onSubmit(value: any) {
    return action(value);
  }
  const [selectedItem, setSelectedItem] = useState<{ prop: string } | null>(
    null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[443px]"
        style={{ backgroundColor: "#121212", padding: 20 }}
      >
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
              <p className="label">{dialogLabel}</p>
              {selectedItem?.prop}
        <div className="list-container">
          <ul className="list-items">
            {data.length > 0 ? (
              data.map((item,index) => (
                <li className="list-item" onClick={() => setSelectedItem(item)} key={index}>
                  <div className="item-card">
                    <h1>{item.prop}</h1>
                  </div>
                </li>
              ))
            ) : (
              <p className="label">Sem autocarros Disponíveis</p>
            )}
          </ul>
        </div>
        <Button
          type="submit"
          style={{
            height: 45,
            width: 400,
            cursor: "pointer",
            backgroundColor: "#0C6BFF",
            color: "#FCFCFB",
          }}
          onClick={() => onSubmit(selectedItem)}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
