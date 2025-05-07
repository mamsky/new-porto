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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { GiStack } from "react-icons/gi";
import { UseGetTech } from "../../hook/tech/useGetTech";
import ButtonEditTech from "../button/tech/button-edit-tech";
import ButtonDeleteTech from "../button/tech/button-delete-tech";

const TableTech = () => {
  const { data } = UseGetTech();

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        <div className="flex gap-2 items-center">
          <GiStack size={40} />
          <div className="flex flex-col">
            <h1 className="text-xl lg:text-2xl">Tech</h1>
            <span className="text-xs">table tech</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Table Technology</DialogTitle>
        </DialogHeader>
        <Table className="max-h-48 overflow-y-auto">
          <TableCaption>A list of your technology.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Technology</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((datas, i) => (
              <TableRow key={datas.id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>
                  {typeof datas.images == "string" && (
                    <Image
                      src={datas?.images || Logos.src}
                      alt="tech-img"
                      width={2000}
                      height={2000}
                      className="max-w-16 max-h-16 object-cover"
                    />
                  )}
                </TableCell>
                <TableCell>{datas.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-center gap-4">
                    <ButtonDeleteTech id={datas.id!} />
                    <ButtonEditTech techData={datas} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default TableTech;
