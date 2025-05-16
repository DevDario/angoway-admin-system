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
import { createDriverSchema } from "@/schemas/driver.create.schema";
import { useDriver } from "../../hooks/useDriver";
import { toast } from "sonner";

export default function CreateDriverForm() {
  const form = useForm({
    resolver: zodResolver(createDriverSchema),
    defaultValues: {
      name: "",
      number: "",
      password: "",
      email: "@gmail.com",
      role: "DRIVER",
      licenseNumber: "LD-",
      experienceTime:"1"
    },
  });

  const { useCreateDriver, success, error } = useDriver();
  const { isError } = useCreateDriver;

  function onSubmit(values: z.infer<typeof createDriverSchema>) {
    useCreateDriver.mutateAsync({
      name: values.name,
      email: values.email,
      phone: values.number,
      password: values.password,
      licenseNumber: values.licenseNumber,
      experienceTime: Number(values.experienceTime),
    })
  }

  if (success) {
    toast.success(success);
  }

  if (error || isError) {
    toast.error("Erro ao cadastrar o motorista !", {
      description:
        error !== null
          ? error
          : `Houve um erro ao cadastrar o motorista. Tente submeter novamente`,
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
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="John Doe"
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
          name="email"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="johndoe@gmail.com"
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
          name="number"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="9xx xxx xxx"
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
          name="licenseNumber"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Número da Carta de Condução</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder="LD-123456"
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
          name="experienceTime"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Experiência (Anos)</FormLabel>
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
          name="password"
          render={({ field }) => (
            <FormItem style={{ marginBottom: 15 }}>
              <FormLabel>Palavra Passe</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  placeholder=""
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
