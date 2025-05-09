import { api } from "@/lib/hook/use-api";
import { TechSchemasDTO } from "@/lib/schemas/tech.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";

const useEditTech = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation<
    { message: string },
    AxiosError,
    TechSchemasDTO
  >({
    mutationKey: ["tech", id],
    mutationFn: async (data: TechSchemasDTO) => {
      const formData = new FormData();

      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }
      formData.append("name", data.name);

      const response = await api.put(`/tech/${id}`, formData);

      return response.data;
    },
    onSuccess: async (res) => {
      toast.success(res.message);
      await queryClient.invalidateQueries({
        queryKey: ["tech"],
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    },
  });
  return { mutateAsync, isPending, isSuccess };
};

export default useEditTech;
