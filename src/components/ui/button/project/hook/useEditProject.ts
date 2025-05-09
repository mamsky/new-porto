import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useEditProject } from "@/components/hook/project/useEditProject";
import { ProjectSchemasDTO } from "@/lib/schemas/project.schemas";
import { ProjectTypes } from "@/lib/types/project.types";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

export const useEditProjectForm = (
  dataProject: ProjectTypes,
  watch: UseFormWatch<ProjectSchemasDTO>,
  setValue: UseFormSetValue<ProjectSchemasDTO>
) => {
  const closeButton = useRef<HTMLButtonElement>(null);

  const [techstack, setTechstack] = useState<{ techstack: string }>({
    techstack: "",
  });
  const [dataTechstack, setDataTechstack] = useState<{ techstack: string }[]>(
    dataProject.techstack
  );

  const { mutateAsync, isPending, isSuccess } = useEditProject(dataProject.id!);
  const getImg = watch("images");
  const [imgPrv, setImgPrv] = useState<string | undefined>();

  const onSubmit = async (data: ProjectSchemasDTO) => {
    await mutateAsync(data);
  };

  const handleAddTech = () => {
    if (techstack.techstack.trim() === "") {
      toast.error("At least one technology required");
      return;
    }
    setDataTechstack((prev) => [...prev, techstack]);
    setTechstack({ techstack: "" });
  };

  const handleRemoveTech = (index: number) => {
    const updated = [...dataTechstack];
    updated.splice(index, 1);
    setDataTechstack(updated);
  };

  // Sync techstack to form value
  useEffect(() => {
    setValue(
      "techstack",
      dataTechstack.map((item) => item.techstack)
    );
  }, [dataTechstack, setValue]);

  // Handle image preview
  useEffect(() => {
    if (getImg && getImg.length > 0) {
      const file = getImg[0];
      const blob = URL.createObjectURL(file);
      setImgPrv(blob);
      return () => URL.revokeObjectURL(blob);
    }
  }, [getImg, isSuccess]);

  // Auto close on success
  useEffect(() => {
    if (isSuccess && closeButton.current) {
      closeButton.current.click();
    }
  }, [isSuccess]);

  return {
    closeButton,
    techstack,
    setTechstack,
    dataTechstack,
    setDataTechstack,
    handleAddTech,
    handleRemoveTech,
    imgPrv,
    onSubmit,
    isPending,
  };
};
