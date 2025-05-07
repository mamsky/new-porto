import { api } from "@/lib/hook/use-api";
import { WorkTypeData } from "@/lib/types/work.types";
import { useQuery } from "@tanstack/react-query";

export const useGetWork = () => {
  const { data, isPending, isFetched } = useQuery<WorkTypeData[]>({
    queryKey: ["work"],
    queryFn: async () => {
      const response = await api.get("/works");
      return response.data.data;
    },
  });
  return { data, isPending, isFetched };
};
