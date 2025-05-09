import {
  ProjectSchemas,
  ProjectSchemasDTO,
} from "@/lib/schemas/project.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useProjectForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectSchemasDTO>({
    mode: "onChange",
    resolver: zodResolver(ProjectSchemas),
  });

  return {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  };
};
