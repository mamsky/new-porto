"use client";
import { api } from "@/lib/hook/use-api";
import { CreateTechSchemasDTO } from "@/lib/schemas/tech.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";

export const UsePostTech = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    { message: string },
    AxiosError,
    CreateTechSchemasDTO
  >({
    mutationKey: ["tech"],
    mutationFn: async (data: CreateTechSchemasDTO) => {
      const formData = new FormData();

      formData.append("images", data.images![0]);
      formData.append("name", data.name);

      const response = await api.post("/tech", formData);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error((error.response?.data as { message: string }).message);
      }
    },
    onSuccess: async (res) => {
      toast.success(res.message);
      await queryClient.invalidateQueries({
        queryKey: ["tech"],
      });
    },
  });
  return { ...query };
};
