"use client";
import { useGetWork } from "@/components/hook/work/useGetWork";
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
import { MdWorkOutline } from "react-icons/md";
import ButtonDeleteWork from "../button/work/button-delete-work";
import ButtonEditWork from "../button/work/button-edit-work";

const TableWork = () => {
  const { data } = useGetWork();

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-black/30 cursor-pointer">
        <div className="flex gap-2 items-center">
          <MdWorkOutline size={40} />
          <div className="flex flex-col">
            <h1 className="text-2xl">Work</h1>
            <span className="text-sm">table work experience</span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>Table Work Experionce</DialogTitle>
        </DialogHeader>
        <Table>
          <TableCaption>A list of your Work Experionce.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) && data?.length > 0 ? (
              data?.map((datas, i) => (
                <TableRow key={datas.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    {typeof datas.images == "string" && (
                      <Image
                        src={datas?.images}
                        alt="tech-img"
                        width={2000}
                        height={2000}
                        className="max-w-16 max-h-16"
                      />
                    )}
                  </TableCell>
                  <TableCell>{datas.title}</TableCell>
                  <TableCell>{datas.company}</TableCell>
                  <TableCell>{datas.location}</TableCell>
                  <TableCell>
                    {datas.startDate} - {datas.endDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-4">
                      <ButtonDeleteWork id={datas.id!} />
                      <ButtonEditWork workData={datas} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>Data Work is empty</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default TableWork;
