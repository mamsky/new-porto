import { api } from "@/lib/hook/use-api";
import { WorkExperienceSchemasDTOV2 } from "@/lib/schemas/work.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";

export const useEditWork = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess, isPending } = useMutation<
    { message: string },
    AxiosError,
    WorkExperienceSchemasDTOV2
  >({
    mutationKey: ["work"],
    mutationFn: async (data: WorkExperienceSchemasDTOV2) => {
      const formData = new FormData();

      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }
      formData.append("title", data.title);
      formData.append("company", data.company);
      formData.append("location", data.location);

      formData.append("description", JSON.stringify(data.description));
      formData.append("techstack", JSON.stringify(data.techstack));
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);

      const response = await api.put(`/works/${id}`, formData);
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
        queryKey: ["work"],
      });
    },
  });
  return { mutateAsync, isSuccess, isPending };
};
