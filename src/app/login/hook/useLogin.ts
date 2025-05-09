"use client";
import { api } from "@/lib/hook/use-api";
import { LoginSchemaDTO } from "@/lib/schemas/login.schemas";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const tansStack = useMutation<
    { message: string; token: string },
    AxiosError,
    LoginSchemaDTO
  >({
    mutationKey: ["Login-Admin"],
    mutationFn: async (data: LoginSchemaDTO) => {
      const response = await api.post("/users/auth", data);
      Cookies.set("token", response.data.token);
      return await response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          (error.response?.data as { message: string })?.message ||
            "Login failed"
        );
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      redirect("/cpanel");
    },
  });
  return { ...tansStack };
};
