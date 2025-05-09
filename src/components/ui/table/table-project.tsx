"use client";
import { useGetProject } from "@/components/hook/project/useGetProject";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { PiProjectorScreenBold } from "react-icons/pi";
import ButtonDeleteProject from "../button/project/button-delete-projects";
import ButtonEditProject from "../button/project/button-edit-project";

const TableProject = () => {
  const { data } = useGetProject();

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        <div className="flex gap-2 items-center">
          <PiProjectorScreenBold size={40} />
          <div className="flex flex-col">
            <h1 className="text-xl lg:text-2xl">Project</h1>
            <span className="text-xs">table project</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="md:min-w-4xl">
        <DialogHeader>
          <DialogTitle>Table My Project</DialogTitle>
        </DialogHeader>
        <Table>
          <TableCaption>A list of your Project.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Link Demo</TableHead>
              <TableHead>Link Github</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data?.map((field, i) => (
                <TableRow key={field.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    {typeof field.images == "string" && (
                      <Image
                        src={field.images}
                        alt="tech-img"
                        width={2000}
                        height={2000}
                        className="max-w-16 max-h-16"
                      />
                    )}
                  </TableCell>

                  <TableCell>{field.title!.slice(0, 20)}...</TableCell>
                  <TableCell>{field.description!.slice(0.2)}...</TableCell>
                  <TableCell>{field.demo}</TableCell>
                  <TableCell>{field.github}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-4">
                      <ButtonDeleteProject id={field.id!} />
                      <ButtonEditProject dataProject={field} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>Data Project is empty</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default TableProject;
