"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { BusEditInput, editBusSchema } from "@/schemas/bus.edit.schema";
import { Bus } from "types/Bus";
import { useUpdateBus } from "../../hooks/bus/useBusMutations";
import { toast } from "sonner";
import { useGetRoutes } from "../../hooks/route/useRouteQuerys";

export default function EditBusForm({ busData }: { busData: any }) {
  const { data: routes = [] } = useGetRoutes();
  const form = useForm({
    resolver: zodResolver(editBusSchema),
    defaultValues: {
      matricula: busData?.matricula || "",
      capacidade: busData?.capacity?.toString() || "",
      rota: busData?.routeId?.toString() || "",
      motorista: busData?.driverName || "",
    },
  });

  const {
    mutate: update,
    successMessage: success,
    errorMessage: error,
  } = useUpdateBus();

  async function handleUpdateBus(body: Bus) {
    update({
      id: busData.id,
      body: {
        ...body,
        currentLoad: 0,
      },
    });
  }

  if (success) {
    toast.success(success);
  }

  if (error) {
    toast.error("Erro ao editar o autocarro !", {
      description:
        error !== null
          ? error
          : `Houve um erro ao editar o autocarro. Tente submeter novamente`,
    });
  }

  async function onSubmit(values: BusEditInput) {
    return handleUpdateBus({
      capacity: Number(values.capacidade),
      currentLoad: busData.currentLoad || 0,
      matricula: values.matricula,
      routeId: Number(values.rota),
    });
  }

  const isBusActive = busData?.status === "IN_TRANSIT";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isBusActive && (
          <div
            style={{ color: "#d32f2f", marginBottom: 10, textAlign: "center", fontWeight: "bold" }}
          >
            Não é possível editar enquanto em trânsito.
          </div>
        )}
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
                  disabled={isBusActive}
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
                  disabled={isBusActive}
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
                  disabled={isBusActive}
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
                <Input
                  className="input"
                  {...field}
                  style={{
                    padding: 10,
                    height: 45,
                    width: 400,
                  }}
                  type="text"
                  disabled
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
            cursor: isBusActive ? "not-allowed" : "pointer",
            backgroundColor: isBusActive ? "#888" : "#0C6BFF",
            color: "#FCFCFB",
          }}
          disabled={isBusActive}
        >
          Salvar Alterações
        </Button>
      </form>
    </Form>
  );
}
