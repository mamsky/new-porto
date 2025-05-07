import { useDeleteWork } from "@/components/hook/work/useDeleteWork";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "../../button";

const ButtonDeleteWork = ({ id }: { id: string }) => {
  const { mutateAsync, isPending, isSuccess } = useDeleteWork();
  const buttonCancel = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSuccess && buttonCancel.current) {
      buttonCancel.current.click();
    }
  }, [isSuccess]);

  const handleDelete = async () => {
    await mutateAsync(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-500 cursor-pointer hover:text-red-700">
          <FaTrash size={20} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            do you want to delete this data Work?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={buttonCancel} className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isPending ? true : false}
            onClick={handleDelete}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonDeleteWork;
