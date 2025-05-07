"use client";
import { api } from "@/lib/hook/use-api";
import { ProfileSchemaDTO } from "@/lib/schemas/profile.schemas";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const UseGetProfile = () => {
  const query = useQuery<{ message: string }, AxiosError, ProfileSchemaDTO>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/profiles");
      return response.data.data;
    },
  });
  return { ...query };
};

export default UseGetProfile;
