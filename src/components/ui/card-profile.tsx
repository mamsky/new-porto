"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ProfileSchemasDTOV2,
  ProfileSchemasV2,
} from "@/lib/schemas/profile.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GrUserSettings } from "react-icons/gr";
import UseGetProfile from "../hook/profile/useGetProfile";
import { UsePostProfile } from "../hook/profile/usePostProfile";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Textarea } from "./textarea";

const CardProfile = () => {
  const { data: profileData } = UseGetProfile();
  const { mutateAsync, isPending } = UsePostProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<ProfileSchemasDTOV2>({
    mode: "onChange",
    resolver: zodResolver(ProfileSchemasV2),
    defaultValues: {
      surname: profileData?.surname,
      bio: profileData?.bio,
      images: profileData?.images,
      status: profileData?.status,
      location: profileData?.location,
      profession: profileData?.profession,
    },
  });

  const imagePreview = watch("images");
  const [imgPrv, setImgPrv] = useState<string | undefined>("");
  useEffect(() => {
    if (imagePreview && imagePreview.length > 0) {
      const file = imagePreview[0];

      if (file instanceof File) {
        const bloob = URL.createObjectURL(file);
        setImgPrv(bloob);
        return () => URL.revokeObjectURL(bloob);
      }
    }
  }, [imagePreview]);

  const onSubmit = async (data: ProfileSchemasDTOV2) => {
    await mutateAsync(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        {/* <Button> */}
        <div className="flex gap-2 items-center ">
          <GrUserSettings size={40} />
          <div className="flex flex-col">
            <h1 className="text-xl lg:text-2xl">Profile</h1>
            <span className="text-xs">card profile</span>
          </div>
        </div>
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Card profile Setting</DialogTitle>
        </DialogHeader>
        <Card className="w-[350px] ml-3">
          <CardContent>
            <div className="flex justify-center">
              <label htmlFor="images-preview" className="cursor-pointer">
                <Image
                  src={imgPrv || profileData?.images}
                  alt="Logo"
                  width={80}
                  height={140}
                  className="rounded-xl"
                />
              </label>
              <Input
                {...register("images")}
                id="images-preview"
                type="file"
                hidden
              />
              {errors.images && <p>{errors.images.message as string}</p>}
            </div>
            <div className="grid w-full items-center gap-4 my-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("surname")}
                  defaultValue={profileData?.surname}
                  placeholder="Name"
                />
              </div>
              {errors.surname && <p>{errors.surname.message}</p>}
            </div>
            <div className="grid w-full items-center gap-4 my-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="profesi">Profession</Label>
                <Input
                  {...register("profession")}
                  id="profesi"
                  placeholder="Full-Stack Developer"
                  defaultValue={profileData?.profession}
                />
              </div>
              {errors.profession && <p>{errors.profession.message}</p>}
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Bio</Label>
              <Textarea
                {...register("bio")}
                defaultValue={profileData?.bio}
                placeholder="Type your message here."
                id="message"
              />
              {errors.bio && <p>{errors.bio.message}</p>}
            </div>
            <div className="grid w-full items-center gap-4 my-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  {...register("location")}
                  defaultValue={profileData?.location}
                  id="location"
                  placeholder="Serang, Banten"
                />
              </div>
              {errors.location && <p>{errors.location.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="r1" />
                      <Label htmlFor="r1">available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="r2" />
                      <Label htmlFor="r2">not available</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending ? true : false}
            className="hover:bg-black/50 cursor-pointer"
          >
            {isPending ? "Loading..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardProfile;
