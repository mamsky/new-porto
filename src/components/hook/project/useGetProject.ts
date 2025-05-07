"use client";
import { api } from "@/lib/hook/use-api";
import { ProjectTypes } from "@/lib/types/project.types";
import { useQuery } from "@tanstack/react-query";

export const useGetProject = () => {
  const { data, isFetched, isPending } = useQuery<ProjectTypes[]>({
    queryKey: ["project"],
    queryFn: async () => {
      const response = await api.get("/projects");
      return response.data.data;
    },
  });
  return { data, isFetched, isPending };
};
