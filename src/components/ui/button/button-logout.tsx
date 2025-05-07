import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { FaPowerOff } from "react-icons/fa";

const ButtonLogout = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    redirect("/login");
  };
  return (
    <div className="flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-red-500 mt-1 mr-8 py-2 px-6 text-white flex gap-2 items-center rounded-md cursor-pointer">
            <FaPowerOff />
            Logout
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              {"do you really want to exit the dashboard?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleLogout}
              className="bg-red-500 cursor-pointer"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButtonLogout;
