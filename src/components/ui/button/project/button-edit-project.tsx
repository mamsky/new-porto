import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectTypes } from "@/lib/types/project.types";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../../button";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { useEditProjectForm } from "./hook/useEditProject";
import { useProjectForm } from "./hook/useProjectForm";

const ButtonEditProject = ({ dataProject }: { dataProject: ProjectTypes }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useProjectForm();
  const {
    closeButton,
    techstack,
    setTechstack,
    dataTechstack,
    // setDataTechstack,
    handleAddTech,
    handleRemoveTech,
    imgPrv,
    onSubmit,
    isPending,
  } = useEditProjectForm(dataProject, watch, setValue);

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        <FaEdit size={20} />
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto md:min-w-2xl">
        <DialogHeader>
          <DialogTitle className="mb-4">Edit Project</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <label htmlFor="images">
            {typeof dataProject.images == "string" && (
              <Image
                src={imgPrv || dataProject.images}
                alt="Image-Work"
                width={2000}
                height={2000}
                className="h-32 w-32 rounded-full cursor-pointer"
              />
            )}
          </label>
          <Input {...register("images")} type="file" id="images" hidden />
        </div>
        {errors.images && (
          <p className="text-red-500">{errors.images.message}</p>
        )}
        <div>
          <label htmlFor="title">Title</label>
          <Input
            defaultValue={dataProject.title}
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
            defaultValue={dataProject.description}
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
              onChange={(e) =>
                setTechstack({ ...techstack, techstack: e.target.value })
              }
              value={techstack.techstack}
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
              <h1>{field.techstack}</h1>
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
            defaultValue={dataProject.demo}
            {...register("demo")}
            type="text"
            placeholder="https://demoapp.com"
          />
        </div>
        {errors.demo && <p className="text-red-500">{errors.demo.message}</p>}
        <div>
          <label htmlFor="demo">Link Demo</label>
          <Input
            defaultValue={dataProject.github}
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
            {isPending ? "Loading..." : "Save Change"}
          </Button>
          <DialogClose ref={closeButton} hidden>
            x
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonEditProject;
