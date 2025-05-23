"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateDriver } from "../../hooks/driver/useDriverMutations";
import { toast } from "sonner";
import { Driver } from "types/Driver";
import {
  DriverEditInput,
  editDriverSchema,
} from "@/schemas/driver.edit.schema";

export default function EditDriverForm({ driverData }: { driverData: any }) {
  const form = useForm({
    resolver: zodResolver(editDriverSchema),
    defaultValues: {
      name: driverData?.name || "",
      number: driverData?.phone || "",
      experienceTime: driverData?.experienceTime?.toString() || "",
      email: driverData?.email || "",
      licenseNumber: driverData?.licenseNumber || "",
    },
  });

  const {
    mutate: update,
    successMessage: success,
    errorMessage: error,
  } = useUpdateDriver();

  async function handleUpdateDriver(body: Partial<Driver>) {
    update({ id: driverData.id, body });
  }

  if (success) {
    toast.success(success);
  }

  if (error) {
    toast.error("Erro ao editar o motorista !", {
      description:
        error !== null
          ? error
          : `Houve um erro ao editar o motorista. Tente submeter novamente`,
    });
  }

  async function onSubmit(values: DriverEditInput) {
    return handleUpdateDriver({
      name: values.name,
      phone: values.number,
      experienceTime: Number(values.experienceTime),
      email: values.email,
      licenseNumber: values.licenseNumber,
    });
  }

  const isDriverActive = driverData?.status === "ON_ROUTE";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isDriverActive && (
          <div
            style={{
              color: "#d32f2f",
              marginBottom: 10,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Não é possível editar enquanto em rota.
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  {...field}
                  style={{ padding: 10, height: 45, width: 400 }}
                  disabled={isDriverActive}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  {...field}
                  style={{ padding: 10, height: 45, width: 400 }}
                  disabled={isDriverActive}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  {...field}
                  style={{ padding: 10, height: 45, width: 400 }}
                  disabled={isDriverActive}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experienceTime"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Experiência (anos)</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  {...field}
                  type="number"
                  style={{ padding: 10, height: 45, width: 400 }}
                  disabled={isDriverActive}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Carta de Condução </FormLabel>
              <FormControl>
                <Input
                  className="input"
                  {...field}
                  style={{ padding: 10, height: 45, width: 400 }}
                  disabled={isDriverActive}
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
            cursor: isDriverActive ? "not-allowed" : "pointer",
            backgroundColor: isDriverActive ? "#888" : "#0C6BFF",
            color: "#FCFCFB",
          }}
          disabled={isDriverActive}
        >
          Salvar Alterações
        </Button>
      </form>
    </Form>
  );
}
