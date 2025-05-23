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
import { useUpdateRoute } from "../../hooks/route/useRouteMutations";
import { toast } from "sonner";
import { RouteResponse } from "types/route.response";

const routeSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  origin: z.string().min(2, "Origem obrigatória"),
  destination: z.string().min(2, "Destino obrigatório"),
  status: z.string(),
});

export default function EditRouteForm({ routeData }: { routeData: any }) {
  const form = useForm({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      name: routeData?.name || "",
      origin: routeData?.origin || "",
      destination: routeData?.destination || "",
      status: routeData?.status || "",
    },
  });

  const {
    mutate: update,
    successMessage: success,
    errorMessage: error,
  } = useUpdateRoute();

  async function handleUpdateRoute(body: RouteResponse) {
    update({ id: routeData.id, body });
  }

  if (success) {
    toast.success(success);
  }

  if (error) {
    toast.error("Erro ao editar a rota !", {
      description:
        error !== null
          ? error
          : `Houve um erro ao editar a rota. Tente submeter novamente`,
    });
  }

  async function onSubmit(values: z.infer<typeof routeSchema>) {
    return handleUpdateRoute({
      id: routeData.id,
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
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  {...field}
                  style={{ padding: 10, height: 45, width: 400 }}
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
              <FormLabel>Origem</FormLabel>
              <FormControl>
                <Input
                  className="input"
                  {...field}
                  style={{ padding: 10, height: 45, width: 400 }}
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
                  style={{ padding: 10, height: 45, width: 400 }}
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
              <FormLabel>Status</FormLabel>
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
                  <option value="active">Ativa</option>
                  <option value="inactive">Inativa</option>
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
          Salvar Alterações
        </Button>
      </form>
    </Form>
  );
}
