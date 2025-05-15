"use client";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { api } from "./use-api";
import { AxiosError, isAxiosError } from "axios";

export const useGuard = () => {
  const token = Cookies.get("token");

  const query = useQuery<AxiosError>({
    queryKey: ["auth-guard"],
    queryFn: async () => {
      try {
        const response = await api.get("/users/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          Cookies.remove("token");
          toast.error("Session expired, please log in again");
          window.location.reload();
          redirect("/login");
        }
      }
    },
  });

  return { ...query, token };
};
