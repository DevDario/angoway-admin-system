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
import { createRouteSchema, RouteCreateInput } from "@/schemas/route.create.schema";
import { useRoute } from "../../hooks/useRoute";
import { toast } from "sonner";

export default function CreateRouteForm() {
  const form = useForm<z.infer<typeof createRouteSchema>>({
    resolver: zodResolver(createRouteSchema),
    defaultValues: {
      name: "",
      origin: "",
      destination: "",
      status: "active",
    },
  });

  const { useCreateRoute, success, error } = useRoute();
  const { isError } = useCreateRoute;

  async function handleCreateRoute(body: RouteCreateInput) {
      useCreateRoute.mutateAsync(body);
  }

  if (success) {
    toast.success(success);
  }

  if (error || isError) {
    toast.error("Erro ao cadastrar a rota !", {
      description:
        error !== null
          ? error.includes("500") ? `Erro no servidor. Tente novamente mais tarde` : error
          : `Houve um erro ao cadastrar a rota. Tente submeter novamente`,
    });
  }

  async function onSubmit(values: z.infer<typeof createRouteSchema>) {
    return handleCreateRoute({
        name: values.name,
        origin: values.origin,
        destination: values.destination,
        status: values.status,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Nome da Rota</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="ex: Luanda - Viana"
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
          name="origin"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Ponto de Partida</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="Ex: Luanda"
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
          name="destination"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Destino</FormLabel>
              <FormControl>
                <Input
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Status (opcional)</FormLabel>
              <FormControl>
                <Input
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
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
