import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import React, { ReactNode } from "react";
import "./IdDialog.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../src/components/ui/form";
import { Input } from "../src/components/ui/input";

const idDialogSchema = z.object({
  id: z
    .string(
      z.number().nonnegative("O ID Precisa ser um valor positivo").default(-1)
    )
    .nonempty("Informe um ID"),
});

export default function IdDialog({
  children,
  dialogTitle,
  dialogLabel,
  buttonText,
  action,
}: {
  children: ReactNode;
  dialogTitle: string;
  dialogLabel: string;
  buttonText: string;
  action: (id: number) => void;
}) {
  const form = useForm({
    resolver: zodResolver(idDialogSchema),
  });

  function onSubmit(values: z.infer<typeof idDialogSchema>) {
    return action(Number(values.id));
  }
  
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem style={{ marginBottom: 15 }}>
                  <FormLabel>{dialogLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="input"
                      {...field}
                      style={{
                        padding: 10,
                        height: 45,
                        width: 400,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              style={{
                height: 45,
                width: 400,
                cursor: "pointer",
                backgroundColor: "#0C6BFF",
                color: "#FCFCFB",
              }}
            >
              {buttonText}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
