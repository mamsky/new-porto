import { UseDeleteTech } from "@/components/hook/tech/useDeleteTech";
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
import { FaTrash } from "react-icons/fa";
import { Button } from "../../button";

const ButtonDeleteTech = ({ id }: { id: string }) => {
  const { mutateAsync } = UseDeleteTech();
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
            do you want to delete this data?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <Button onClick={handleDelete} className="cursor-pointer">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonDeleteTech;
