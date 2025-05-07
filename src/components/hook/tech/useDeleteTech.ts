import { api } from "@/lib/hook/use-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const UseDeleteTech = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationKey: ["tech"],
    mutationFn: async (id: string) => {
      const response = await api.delete(`/tech/${id}`);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["tech"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutateAsync };
};
