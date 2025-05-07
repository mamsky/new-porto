"use client";
import { useEditWork } from "@/components/hook/work/useEditWork";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { WorkExperienceSchemasDTOV2 } from "@/lib/schemas/work.schemas";
import { WorkTypeData } from "@/lib/types/work.types";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "../../button";
import { Input } from "../../input";
import { useWorkForm } from "./hook/useWorkForm";

const ButtonEditWork = ({ workData }: { workData: WorkTypeData }) => {
  const { handleSubmit, register, setValue, watch } = useWorkForm();
  const { isPending, isSuccess, mutateAsync } = useEditWork(workData.id!);

  const [description, setDescription] = useState<{ desc: string }>({
    desc: "",
  });
  const [dataDescription, setDataDescription] = useState<{ desc: string }[]>(
    workData.description
  );

  const [technology, setTechnology] = useState<{ techstack: string }>({
    techstack: "",
  });
  const [dataTechnology, setDataTechnology] = useState<{ techstack: string }[]>(
    workData.technology
  );

  const getImg = watch("images");
  const [imgPrv, setImgPrv] = useState<string>();
  const buttonClose = useRef<HTMLButtonElement>(null);
  const buttonCloseTwo = useRef<HTMLButtonElement>(null);

  const handleAddDesc = () => {
    if (description.desc == "") {
      return toast.error("At least description one character");
    }
    setDataDescription((desc) => [...desc, description]);
    setDescription({ desc: "" });
  };

  const handleRemoveDesc = (i: number) => {
    const datasDesc = [...dataDescription];
    datasDesc.splice(i, 1);
    setDataDescription(datasDesc);
  };

  const handleAddTech = () => {
    if (technology.techstack == "") {
      return toast.error("At least technology one character");
    }
    setDataTechnology((tech) => [...tech, technology]);
    setTechnology({ techstack: "" });
  };

  const handleRemoveTech = (i: number) => {
    const datasTech = [...dataTechnology];
    datasTech.splice(i, 1);
    setDataTechnology(datasTech);
  };

  useEffect(() => {
    setValue(
      "description",
      dataDescription.map((field) => field.desc)
    );
  }, [dataDescription, setValue]);

  useEffect(() => {
    setValue(
      "techstack",
      dataTechnology.map((field) => field.techstack)
    );
  }, [dataTechnology, setValue]);

  useEffect(() => {
    if (isSuccess && buttonClose.current && buttonCloseTwo.current) {
      buttonClose.current.click();
      buttonCloseTwo.current.click();
    }
    if (getImg && getImg.length > 0) {
      const file = getImg[0];
      const bloob = URL.createObjectURL(file);
      setImgPrv(bloob);
      return () => URL.revokeObjectURL(bloob);
    }
  }, [getImg, isSuccess]);

  const handleClick = async (data: WorkExperienceSchemasDTOV2) => {
    await mutateAsync(data);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-black/30 cursor-pointer">
        <FaEdit size={20} className="text-yellow-500" />
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-2xl">
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>Edit Table Work Experience</AlertDialogTitle>
            <AlertDialogCancel className="cursor-pointer" ref={buttonCloseTwo}>
              X
            </AlertDialogCancel>
          </div>
          <div className="flex justify-center">
            <label htmlFor="images">
              {typeof workData.images == "string" && (
                <Image
                  src={imgPrv || workData.images}
                  alt="Image-Work"
                  width={2000}
                  height={2000}
                  className="h-32 w-32 rounded-full cursor-pointer"
                />
              )}
            </label>
            <Input {...register("images")} type="file" hidden id="images" />
          </div>

          <div>
            <label htmlFor="title">Position</label>
            <Input
              {...register("title")}
              defaultValue={workData.title}
              type="text"
              placeholder="title"
            />
          </div>

          <div>
            <label htmlFor="company">Company</label>
            <Input
              {...register("company")}
              defaultValue={workData.company}
              type="text"
              placeholder="Company"
            />
          </div>

          <div>
            <label htmlFor="location">Location</label>
            <Input
              {...register("location")}
              defaultValue={workData.location}
              type="text"
              placeholder="Location"
            />
          </div>

          <div>
            <label htmlFor="desc">Description</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={description.desc}
                placeholder="Company"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescription({ ...description, desc: e.target.value })
                }
              />
              <button
                onClick={handleAddDesc}
                className="py-2 px-4 bg-blue-500 rounded-md cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="max-h-24 overflow-auto">
              {dataDescription.map((desc, i) => (
                <div key={i} className="flex gap-2">
                  <p>{i + 1}</p>
                  <p>{desc.desc}</p>
                  <button
                    onClick={() => handleRemoveDesc(i)}
                    className="text-red-500 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full gap-4 justify-center">
            <div className="w-full">
              <label htmlFor="techstack">Techstack</label>
              <div className="flex gap-2">
                <Input
                  value={technology.techstack}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTechnology({ ...technology, techstack: e.target.value })
                  }
                  id="techstack"
                  type="text"
                  placeholder="TechStack"
                />

                <button
                  onClick={handleAddTech}
                  className="py-2 px-4 bg-blue-500 rounded-md cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="startDate">Start Date</label>
              <Input
                defaultValue={workData.startDate}
                {...register("startDate")}
                id="startDate"
                type="date"
                placeholder="Start Date"
              />
            </div>
            <div className="w-full">
              <label htmlFor="endDate">EndDate</label>
              <Input
                defaultValue={workData.endDate}
                {...register("endDate")}
                id="endDate"
                type="date"
                placeholder="EndDate"
              />
            </div>
          </div>
          <div className="flex gap-4 overflow-auto">
            {dataTechnology.map((data, i) => (
              <div
                key={i}
                className="bg-white/30 rounded-xl flex justify-between gap-4 py-2 px-4 my-4"
              >
                <h1>{data.techstack}</h1>
                <button
                  onClick={() => handleRemoveTech(i)}
                  className="cursor-pointer text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialog>
            <AlertDialogTrigger className="cursor-pointer bg-white p-2 rounded-md font-bold text-black">
              Save Change
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Apakah Anda yakin untuk mengubah data ini?
                </AlertDialogTitle>

                <ul>
                  <li>Position: {watch("title")}</li>
                  <li>Company: {watch("company")}</li>
                  <li>Location: {watch("location")}</li>
                  <div className="flex gap-2">
                    Description:
                    {dataDescription.map((datas, i) => (
                      <div key={i} className="flex gap-2">
                        <li>{i + 1}:</li>
                        <li>{datas.desc}</li>
                      </div>
                    ))}
                  </div>
                  <li className="flex gap-5">
                    Techstack:
                    <ul>
                      {dataTechnology.map((datas, i) => (
                        <div key={i} className="flex gap-2">
                          <li>{i + 1}:</li>
                          <li>{datas.techstack}</li>
                        </div>
                      ))}
                    </ul>
                  </li>
                  <li>StartDate: {watch("startDate")}</li>
                  <li>EndDate: {watch("endDate")}</li>
                </ul>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel ref={buttonClose}>Cancel</AlertDialogCancel>
                <Button
                  onClick={handleSubmit(handleClick)}
                  className="cursor-pointer"
                  disabled={isPending ? true : false}
                >
                  {isPending ? "Loading..." : "Save Change"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonEditWork;
