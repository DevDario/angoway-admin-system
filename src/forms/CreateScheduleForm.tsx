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
import { createScheduleSchema } from "@/schemas/schedule.create.schema";
import { useCreateSchedule } from "../../hooks/schedule/useSchedulesMutations";
import { toast } from "sonner";
import { useGetRoutes } from "../../hooks/route/useRouteQuerys";
import { Schedule } from "types/Schedule";

export default function CreateBusForm() {
  const { data: routes = [] } = useGetRoutes();

  const form = useForm({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: {
      status: "active",
      arrivalLocation: undefined,
      departureLocation: undefined,
      estimatedDurationMinutes: "0",
      distanceKM: "0",
    },
  });

  const {
    mutate: create,
    successMessage: success,
    errorMessage: error,
  } = useCreateSchedule();

  async function handleCreateSchedule(body: Partial<Schedule>) {
    create(body);
  }

  if (success) {
    toast.success(success);
  }

  if (error) {
    toast.error("Erro ao cadastrar o horário !", {
      description:
        error !== null
          ? error
          : `Houve um erro ao cadastrar o horário. Tente submeter novamente`,
    });
  }

  async function onSubmit(values: z.infer<typeof createScheduleSchema>) {
    return handleCreateSchedule({
      arrivalTime: values.arrivalTime,
      departureTime: values.departureTime,
      arrivalLocation: values.arrivalLocation,
      departureLocation: values.departureLocation,
      distanceKM: Number(values.distanceKM),
      estimatedDurationMinutes: Number(values.estimatedDurationMinutes),
      routeId: Number(values.route),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="departureLocation"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Ponto de Partida (opcional)</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="Ex: Zango 8000"
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
          name="arrivalLocation"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Ponto de Chega (opcional)</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="Ex: Zango 4000"
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
          name="route"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Rota (opcional)</FormLabel>
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
          name="estimatedDurationMinutes"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Tempo Estimado em minutos* (opcional)</FormLabel>
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
          name="distanceKM"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Distância em Quilômetros* (opcional)</FormLabel>
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
          name="departureTime"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Parte às</FormLabel>
              <FormControl>
                <Input
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
                  type="time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrivalTime"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Chega às (estimativa)</FormLabel>
              <FormControl>
                <Input
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
                  type="time"
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
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
