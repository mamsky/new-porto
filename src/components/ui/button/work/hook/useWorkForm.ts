import {
  WorkExperienceSchemasDTOV2,
  WorkExperienceShemasV2,
} from "@/lib/schemas/work.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useWorkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<WorkExperienceSchemasDTOV2>({
    mode: "onChange",
    resolver: zodResolver(WorkExperienceShemasV2),
    defaultValues: {
      description: [""],
      techstack: [""],
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    reset,
    watch,
  };
};
