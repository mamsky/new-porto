"use client";
import LogoTest from "@/assets/Logo-paste.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkExperienceSchemasDTOV2 } from "@/lib/schemas/work.schemas";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { Input } from "../../input";
import { useWorkForm } from "./hook/useWorkForm";
import { usePostWork } from "@/components/hook/work/usePostWork";
import { DialogClose } from "@radix-ui/react-dialog";

const ButtonWork = () => {
  const { errors, handleSubmit, register, setValue, watch, reset } =
    useWorkForm();
  const { isPending, mutateAsync, isSuccess } = usePostWork();

  const [description, setDescription] = useState<string>("");
  const [dataDesc, setDataDesc] = useState<string[]>([]);

  const [tech, setTech] = useState<string>("");
  const [dataTech, setDataTech] = useState<string[]>([]);

  const getImg = watch("images");
  const [imgPrv, setImgPrv] = useState<string | undefined>();
  const buttonClose = useRef<HTMLButtonElement>(null);

  const handleAddDesc = () => {
    if (description == "") {
      return toast.error("At least description one character");
    }
    setDataDesc((desc) => [...desc, description]);
    setDescription("");
  };

  const handleAddTech = () => {
    if (tech == "") {
      return toast.error("At least technology one character");
    }
    setDataTech((prevTech) => [...prevTech, tech]);
    setTech("");
  };

  const handleRemoveDesc = (i: number) => {
    const datasDesc = [...dataDesc];
    datasDesc.splice(i, 1);
    setDataDesc(datasDesc);
  };
  const handleRemoveTech = (i: number) => {
    const datasTech = [...dataTech];
    datasTech.splice(i, 1);
    setDataTech(datasTech);
  };

  useEffect(() => {
    setValue("description", dataDesc);
  }, [dataDesc, setValue]);

  useEffect(() => {
    setValue("techstack", dataTech);
  }, [dataTech, setValue]);

  useEffect(() => {
    if (isSuccess) {
      setImgPrv(LogoTest.src);
      setDataDesc([]);
      setDataTech([]);
    }
    if (getImg && getImg.length > 0) {
      const file = getImg[0];
      const bloob = URL.createObjectURL(file);
      setImgPrv(bloob);
      return () => URL.revokeObjectURL(bloob);
    }
  }, [getImg, isSuccess]);

  const onSubmit = async (data: WorkExperienceSchemasDTOV2) => {
    await mutateAsync(data);
    reset({
      company: "",
      description: [],
      endDate: "",
      images: undefined,
      location: "",
      startDate: "",
      techstack: [],
      title: "",
    });
    if (buttonClose.current) buttonClose.current.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        <div className="flex gap-2 items-center">
          <BsPersonWorkspace size={30} />
          <div className="flex flex-col">
            <h1 className="text-xl lg:text-2xl">Work</h1>
            <span className="text-xs">setting work</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto md:min-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Work Experience</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center ">
          <label htmlFor="images">
            <Image
              src={imgPrv || LogoTest}
              alt="logo-work"
              width={2000}
              height={2000}
              className="w-32 h-32 border-1 border-white rounded-full cursor-pointer"
            />
          </label>
          <Input {...register("images")} id="images" type="file" hidden />
          {errors.images && (
            <p className="text-red-500">{errors.images?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="title">Position</label>
          <Input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company">Company</label>
          <Input
            {...register("company")}
            id="company"
            type="text"
            placeholder="Company"
          />
          {errors.company && (
            <p className="text-red-500">{errors.company?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <Input
            {...register("location")}
            id="location"
            type="text"
            placeholder="Location"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="desc">Description</label>
          <div className="flex  gap-2">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              type="text"
              placeholder="Description"
            />
            <button
              onClick={handleAddDesc}
              className="py-2 px-4 bg-blue-500 rounded-md cursor-pointer"
            >
              +
            </button>
            {errors.description && (
              <p className="text-red-500">{errors.description?.message}</p>
            )}
          </div>
          <div className="max-h-24 overflow-auto">
            <h1>
              {dataDesc.map((field, i) => (
                <div key={i} className="flex gap-2">
                  <p>{i + 1}</p>
                  <p>{field}</p>
                  <button
                    onClick={() => handleRemoveDesc(i)}
                    className="cursor-pointer text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </h1>
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="techstack">Techstack</label>
          <div className="flex gap-2">
            <Input
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              id="techstack"
              type="text"
              placeholder="TechStack"
            />
            {errors.techstack && (
              <p className="text-red-500">{errors.techstack?.message}</p>
            )}
            <button
              onClick={handleAddTech}
              className="py-2 px-4 bg-blue-500 rounded-md cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-auto">
          {dataTech.map((data, i) => (
            <div
              key={i}
              className="bg-white/30 rounded-xl flex justify-between gap-4 py-2 px-4 my-4"
            >
              <h1>{data}</h1>
              <button
                onClick={() => handleRemoveTech(i)}
                className="cursor-pointer text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 justify-center">
          <div className="w-full">
            <label htmlFor="startDate">Start Date</label>
            <Input
              {...register("startDate")}
              id="startDate"
              type="date"
              placeholder="Start Date"
            />
            {errors.startDate && (
              <p className="text-red-500">{errors.startDate?.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="endDate">EndDate</label>
            <Input
              {...register("endDate")}
              id="endDate"
              type="date"
              placeholder="EndDate"
            />
            {errors.endDate && (
              <p className="text-red-500">{errors.endDate?.message}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="cursor-pointer hover:bg-stone-400"
            disabled={isPending ? true : false}
          >
            {isPending ? "Loading..." : "Save changes"}
          </Button>
        </DialogFooter>
        <DialogClose asChild hidden ref={buttonClose}>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonWork;
