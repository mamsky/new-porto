"use client";
import useEditTech from "@/components/hook/tech/useEditTech";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TechSchemas, TechSchemasDTO } from "@/lib/schemas/tech.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { Button } from "../../button";
import { Input } from "../../input";

const ButtonEditTech = ({ techData }: { techData: TechSchemasDTO }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TechSchemasDTO>({
    mode: "onChange",
    resolver: zodResolver(TechSchemas),
  });

  const imgPrv = watch("images");
  const fileImage = String(techData.images);
  const [img, setImg] = useState<string | undefined>(fileImage);

  useEffect(() => {
    if (imgPrv && imgPrv.length > 0) {
      const file = imgPrv[0];
      const bloob = URL.createObjectURL(file);
      setImg(bloob);
      return () => URL.revokeObjectURL(bloob);
    }
  }, [imgPrv]);

  const { isPending, mutateAsync } = useEditTech(techData.id!);

  const onSubmit = async (data: TechSchemasDTO) => {
    await mutateAsync(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        <button className="text-yellow-500 cursor-pointer hover:text-yellow-700">
          <FaEdit size={20} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Technology</DialogTitle>
        </DialogHeader>
        {/* ini isinya  */}
        <div className="flex justify-center ">
          <label htmlFor="image" className="p-2">
            <Image
              src={img || ""}
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
            defaultValue={techData?.name}
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

export default ButtonEditTech;
