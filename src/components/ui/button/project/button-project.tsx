import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PiProjectorScreenChartDuotone } from "react-icons/pi";
import { Input } from "../../input";
import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import Image from "next/image";
import Logos from "@/assets/Logo-paste.png";
import { Button } from "../../button";
import { useForm } from "react-hook-form";
import { Textarea } from "../../textarea";
import {
  ProjectSchemas,
  ProjectSchemasDTO,
} from "@/lib/schemas/project.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostProject } from "@/components/hook/project/usePostProject";

const ButtonMyProject = () => {
  const [techstack, setTechstack] = useState<string>("");
  const [dataTechstack, setDataTechstack] = useState<string[]>([]);
  const closeButton = useRef<HTMLButtonElement>(null);

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectSchemasDTO>({
    mode: "onChange",
    resolver: zodResolver(ProjectSchemas),
  });

  const { isPending, isSuccess, mutateAsync } = usePostProject();

  const handleAddTech = () => {
    if (techstack == "") {
      toast.error("At least technology one character");
    }
    setDataTechstack((field) => [...field, techstack]);
    setTechstack("");
  };

  const handleRemoveTech = (i: number) => {
    const dataTech = [...dataTechstack];
    dataTech.splice(i, 1);
    setDataTechstack(dataTech);
  };

  useEffect(() => {
    setValue("techstack", dataTechstack);
  }, [dataTechstack, setValue]);

  const getImg = watch("images");
  const [imgPrv, setImgPrv] = useState<string | undefined>();

  useEffect(() => {
    if (getImg && getImg.length > 0) {
      const file = getImg[0];
      const bloob = URL.createObjectURL(file);
      setImgPrv(bloob);
      return () => URL.revokeObjectURL(bloob);
    }
  }, [getImg]);

  useEffect(() => {
    if (isSuccess && closeButton.current) {
      reset();
      setImgPrv(Logos.src);
      setDataTechstack([]);
      closeButton.current.click();
    }
  }, [isSuccess, reset]);

  const onSubmit = async (data: ProjectSchemasDTO) => {
    await mutateAsync(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        <div className="flex gap-2 items-center">
          <PiProjectorScreenChartDuotone size={30} />
          <div className="flex flex-col">
            <h1 className="text-xl">Project</h1>
            <h1 className="text-sm">setting project</h1>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle className="mb-4">Add New Project</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <label htmlFor="images">
            <Image
              src={imgPrv || Logos}
              alt="Logo"
              width={2000}
              height={2000}
              className="w-32 h-32 rounded-full border-4 border-white cursor-pointer"
            />
          </label>
          <Input {...register("images")} type="file" id="images" hidden />
        </div>
        {errors.images && (
          <p className="text-red-500">{errors.images.message}</p>
        )}
        <div>
          <label htmlFor="title">Title</label>
          <Input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Title..."
          />
        </div>
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <div>
          <label htmlFor="description">Description</label>
          <Textarea
            {...register("description")}
            id="description"
            placeholder="Description..."
          />
        </div>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <div className="w-full">
          <label htmlFor="techstack">Techstack</label>
          <div className="flex gap-2">
            <Input
              onChange={(e) => setTechstack(e.target.value)}
              value={techstack}
              id="techstack"
              type="text"
              placeholder="Techstack..."
            />
            <button
              onClick={handleAddTech}
              className="cursor-pointer bg-blue-500 px-4 py-2 rounded-md"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex w-full gap-4 overflow-auto">
          {dataTechstack.map((field, i) => (
            <div
              key={i}
              className="bg-white/30 rounded-xl flex justify-between gap-4 py-2 px-4 my-4"
            >
              <h1>{field}</h1>
              <button
                onClick={() => handleRemoveTech(i)}
                className="cursor-pointer text-red-500"
              >
                <FaTrash size={15} />
              </button>
            </div>
          ))}
        </div>
        {errors.techstack && (
          <p className="text-red-500">{errors.techstack.message}</p>
        )}
        <div>
          <label htmlFor="demo">Link Demo</label>
          <Input
            {...register("demo")}
            type="text"
            placeholder="https://demoapp.com"
          />
        </div>
        {errors.demo && <p className="text-red-500">{errors.demo.message}</p>}
        <div>
          <label htmlFor="demo">Link Demo</label>
          <Input
            {...register("github")}
            type="text"
            placeholder="https://github.com"
          />
        </div>
        {errors.github && (
          <p className="text-red-500">{errors.github.message}</p>
        )}
        <DialogFooter>
          <Button
            disabled={isPending ? true : false}
            onClick={handleSubmit(onSubmit)}
            className="cursor-pointer hover:bg-stone-400"
          >
            {isPending ? "Loading..." : "Create"}
          </Button>
          <DialogClose ref={closeButton} hidden>
            x
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonMyProject;
