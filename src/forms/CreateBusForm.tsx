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
import { createBusSchema } from "@/schemas/bus.create.schema";
import { Bus } from "types/Bus";
import { useBus } from "../../hooks/useBus";

export default function CreateBusForm() {
  const form = useForm({
    resolver: zodResolver(createBusSchema),
    defaultValues: {
      matricula: "",
      capacidade: "",
      rota: "",
      motorista: "",
    },
  });

  const { useCreateBus } = useBus();

  async function handleCreateBus(body: Bus) {
    useCreateBus.mutateAsync(body);
  }

  async function onSubmit(values: z.infer<typeof createBusSchema>) {
    return handleCreateBus({
      capacity: Number(values.capacidade),
      currentLoad: 0,
      location: "",
      matricula: values.matricula,
      routeId: Number(values.rota),
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
                <Input
                  className="input"
                  placeholder="Benfica - Kilamba"
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
