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
import { SearchX } from "lucide-react";

export default function ElementsListingDialog({
  children,
  dialogTitle,
  dialogLabel,
  buttonText,
  emptyStateText,
  action,
  data,
}: {
  children: ReactNode;
  dialogTitle: string;
  dialogLabel: string;
  buttonText: string;
  emptyStateText: string;
  action: (value: { prop: string }) => void;
  data: { prop: string }[];
}) {
  function onSubmit(value: { prop: string }) {
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
        <div className="list-container">
          <ul className="list-items">
            {data.length > 0 ? (
              data.map((item, index) => (
                <li
                  className={`list-item${
                    selectedItem?.prop === item.prop ? " selected" : ""
                  }`}
                  onClick={() => setSelectedItem(item)}
                  key={index}
                >
                  <div className="item-card">
                    <h1>{item.prop}</h1>
                  </div>
                </li>
              ))
            ) : (
              <p
                className="label"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <SearchX color="#0C6BFF" size={12} />
                {emptyStateText}
              </p>
            )}
          </ul>
        </div>
        <Button
          type="submit"
          style={{
            height: 45,
            width: 400,
            cursor: selectedItem ? "pointer" : "not-allowed",
            backgroundColor: "#0C6BFF",
            color: "#FCFCFB",
          }}
          onClick={() => selectedItem && onSubmit(selectedItem)}
          disabled={!selectedItem}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
