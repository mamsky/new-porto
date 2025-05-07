import { api } from "@/lib/hook/use-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteWork = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["work"],
    mutationFn: async (id: string) => {
      const response = await api.delete(`/works/${id}`);
      return response.data;
    },
    onSuccess: async (data) => {
      console.log("Invalidating 'work' query...");
      // await queryClient.invalidateQueries({ queryKey: ["work"] });
      await queryClient.refetchQueries({ queryKey: ["work"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutateAsync, isPending, isSuccess, queryClient };
};
