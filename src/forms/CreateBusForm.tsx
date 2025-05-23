"use client";

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
import { createBusSchema } from "@/schemas/bus.create.schema";
import { Bus } from "types/Bus";
import { useCreateBus } from "../../hooks/bus/useBusMutations";
import { toast } from "sonner";
import { useGetRoutes } from "../../hooks/route/useRouteQuerys";
import { useGetDrivers, useGetPendingDriversCount } from "../../hooks/driver/useDriverQuerys";

export default function CreateBusForm() {
  const { data: routes = [] } = useGetRoutes();
  const { data: drivers = [] } = useGetDrivers();
  const { data: pendingDrivers } = useGetPendingDriversCount();
  
  const pendingDriversList = Array.isArray(pendingDrivers?.drivers) ? pendingDrivers.drivers : [];

  const form = useForm({
    resolver: zodResolver(createBusSchema),
    defaultValues: {
      matricula: "LD-",
      capacidade: "50",
      rota: "",
      motorista: "",
    },
  });

  const {
    mutate: create,
    successMessage: success,
    errorMessage: error,
  } = useCreateBus();

  async function handleCreateBus(body: Bus & { driverId?: number }) {
    create(body);
  }

  if (success) {
    toast.success(success);
  }

  if (error) {
    toast.error("Erro ao cadastrar o autocarro !", {
      description:
        error !== null
          ? error
          : `Houve um erro ao cadastrar o autocarro. Tente submeter novamente`,
    });
  }

  async function onSubmit(values: z.infer<typeof createBusSchema>) {
    return handleCreateBus({
      capacity: Number(values.capacidade),
      currentLoad: 0,
      matricula: values.matricula,
      routeId: Number(values.rota),
      driverId: Number(values.motorista),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="matricula"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Matrícula</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="LD-XX-XX-XX"
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
        <FormField
          control={form.control}
          name="rota"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Rota</FormLabel>
              <FormControl>
                <select
                  className="input"
                  style={{
                    padding: 10,
                    height: 45,
                    width: 400,
                    backgroundColor: "#121212",
                    borderRadius: "8px",
                  }}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="">Selecione uma rota</option>
                  {routes.map((route: any) => (
                    <option key={route.id} value={route.id}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacidade"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Capacidade</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  {...field}
                  style={{
                    padding: 10,
                    height: 45,
                    width: 400,
                  }}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="motorista"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Motorista</FormLabel>
              <FormControl>
                <select
                  className="input"
                  style={{
                    padding: 10,
                    height: 45,
                    width: 400,
                    backgroundColor: "#121212",
                    borderRadius: "8px",
                  }}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="">Selecione um motorista</option>
                  {pendingDriversList.map((driver: any) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
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
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
