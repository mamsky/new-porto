"use client";
import { api } from "@/lib/hook/use-api";
import { ProfileSchemasDTOV2 } from "@/lib/schemas/profile.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "sonner";
import UseGetProfile from "./useGetProfile";

export const UsePostProfile = () => {
  const { data: pData } = UseGetProfile();
  const queryClient = useQueryClient();
  const query = useMutation<
    { message: string },
    AxiosError,
    ProfileSchemasDTOV2
  >({
    mutationKey: ["profile"],
    mutationFn: async (data: ProfileSchemasDTOV2) => {
      const formData = new FormData();

      if (data.images && data.images.length > 0) {
        formData.append("images", data?.images[0]);
      }
      formData.append("surname", data.surname);
      formData.append("profession", data.profession);
      formData.append("bio", data.bio);
      formData.append("location", data.location);
      formData.append("status", data.status);

      let response: AxiosResponse;
      if (pData?.id) {
        response = await api.put(`/profiles/${pData?.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await api.post(`/profiles`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      return response.data;
    },
    onError: (errors) => {
      if (isAxiosError(errors)) {
        toast.error((errors.response?.data as { message: string }).message);
      }
    },
    onSuccess: async (res) => {
      toast.success(res.message);
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  return { ...query };
};
