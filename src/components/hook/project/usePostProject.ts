import { api } from "@/lib/hook/use-api";
import { ProjectSchemasDTO } from "@/lib/schemas/project.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";

export const usePostProject = () => {
  const queryClient = useQueryClient();
  const { isSuccess, isPending, mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    ProjectSchemasDTO
  >({
    mutationKey: ["project"],
    mutationFn: async (data: ProjectSchemasDTO) => {
      const formData = new FormData();

      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("techstack", JSON.stringify(data.techstack));
      formData.append("demo", data.demo);
      formData.append("github", data.github);

      const response = await api.post("/projects", formData);
      return response.data;
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error((err.response?.data as { message: string }).message);
      }
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      toast.success(res.message);
    },
  });
  return { isSuccess, isPending, mutateAsync };
};
