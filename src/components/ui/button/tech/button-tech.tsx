"use client";
import Logos from "@/assets/Logo-paste.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreateTechSchemas,
  CreateTechSchemasDTO,
} from "@/lib/schemas/tech.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsStackOverflow } from "react-icons/bs";
import { UsePostTech } from "../../../hook/tech/usePostTech";
import { Button } from "../../button";
import { Input } from "../../input";

const ButtonTech = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CreateTechSchemasDTO>({
    mode: "onChange",
    resolver: zodResolver(CreateTechSchemas),
  });

  const imgPrv = watch("images");
  const [img, setImg] = useState<string | undefined>();

  const { mutateAsync, isPending, isSuccess } = UsePostTech();

  useEffect(() => {
    if (isSuccess) {
      setImg(Logos.src);
    }

    if (imgPrv && imgPrv.length > 0) {
      const file = imgPrv[0];
      const bloob = URL.createObjectURL(file);
      setImg(bloob);
      return () => URL.revokeObjectURL(bloob);
    }
  }, [imgPrv, isSuccess]);

  const onSubmit = async (data: CreateTechSchemasDTO) => {
    await mutateAsync(data);
    reset({
      images: undefined,
      name: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        <div className="flex gap-2 items-center">
          <BsStackOverflow size={30} />
          <div className="flex flex-col">
            <h1 className="text-xl lg:text-2xl">Tech</h1>
            <span className="text-xs">Add new tech</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Technology</DialogTitle>
        </DialogHeader>
        {/* ini isinya  */}
        <div className="flex justify-center ">
          <label htmlFor="image" className="p-2">
            <Image
              src={img || Logos}
              alt="tech"
              width={2000}
              height={2000}
              className="w-20 h-20 border-white border-1 rounded-full cursor-pointer"
            />
          </label>
          <Input {...register("images")} id="image" type="file" hidden />
          {errors.images && (
            <p className="text-red-500">{errors.images?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="tech">Technology Name</label>
          <Input
            {...register("name")}
            id="tech"
            type="text"
            placeholder="Technology"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending ? true : false}
            className="py-2 px-6 text-2xl hover:bg-neutral-400 cursor-pointer font-bold"
          >
            {isPending ? "Loading..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonTech;
