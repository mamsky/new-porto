import { api } from "@/lib/hook/use-api";
import { TechSchemasDTO } from "@/lib/schemas/tech.schemas";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const UseGetTech = () => {
  const query = useQuery<{ message: string }, AxiosError, TechSchemasDTO[]>({
    queryKey: ["tech"],
    queryFn: async () => {
      const response = await api.get("/tech");

      return response.data.data;
    },
  });
  return { ...query };
};
